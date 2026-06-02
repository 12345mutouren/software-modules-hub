import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  isEmail,
  isStrongEnoughPassword,
  parseCookies,
  publicUser,
  serializeCookie,
} from "./security.js";
import { createStore } from "./store.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DEFAULT_PUBLIC_DIR = path.resolve(__dirname, "../public");
const DEFAULT_DATA_FILE = path.resolve(__dirname, "../data/app.json");
const SESSION_COOKIE = "mini_sid";

const RATE_LIMIT_WINDOW_MS = 60_000;
const MAX_LOGIN_ATTEMPTS = 10;

const loginAttempts = new Map();

function sendJson(res, statusCode, payload, headers = {}) {
  res.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf-8",
    ...headers,
  });
  res.end(JSON.stringify(payload, null, 2));
}

function sendError(res, statusCode, code, message) {
  sendJson(res, statusCode, { error: { code, message } });
}

async function readJson(req) {
  const chunks = [];

  for await (const chunk of req) {
    chunks.push(chunk);
  }

  const body = Buffer.concat(chunks).toString("utf8");
  return body ? JSON.parse(body) : {};
}

function requestIp(req) {
  return req.headers["x-forwarded-for"]?.split(",")[0]?.trim() || req.socket.remoteAddress || "unknown";
}

function checkLoginRateLimit(key) {
  const now = Date.now();
  const current = loginAttempts.get(key) ?? { count: 0, resetAt: now + RATE_LIMIT_WINDOW_MS };

  if (current.resetAt < now) {
    loginAttempts.set(key, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }

  if (current.count >= MAX_LOGIN_ATTEMPTS) {
    return false;
  }

  current.count += 1;
  loginAttempts.set(key, current);
  return true;
}

function getAuth(req, store) {
  const cookies = parseCookies(req.headers.cookie);
  const session = cookies[SESSION_COOKIE] ? store.findSession(cookies[SESSION_COOKIE]) : null;
  const user = session ? store.findUserById(session.userId) : null;

  return { user, session };
}

function requireAuth(req, res, store) {
  const auth = getAuth(req, store);

  if (!auth.user || !auth.session) {
    sendError(res, 401, "UNAUTHENTICATED", "Please log in first.");
    return null;
  }

  return auth;
}

function requireCsrf(req, res, session) {
  const csrfToken = req.headers["x-csrf-token"];

  if (!csrfToken || csrfToken !== session.csrfToken) {
    sendError(res, 403, "BAD_CSRF_TOKEN", "Missing or invalid CSRF token.");
    return false;
  }

  return true;
}

function serveStatic(req, res, publicDir) {
  const url = new URL(req.url, "http://localhost");
  const requestedPath = url.pathname === "/" ? "/index.html" : url.pathname;
  const normalizedPath = path.normalize(requestedPath).replace(/^(\.\.[/\\])+/, "");
  const filePath = path.join(publicDir, normalizedPath);

  if (!filePath.startsWith(publicDir) || !fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
    return false;
  }

  const ext = path.extname(filePath);
  const contentTypes = {
    ".html": "text/html; charset=utf-8",
    ".css": "text/css; charset=utf-8",
    ".js": "text/javascript; charset=utf-8",
  };

  res.writeHead(200, { "Content-Type": contentTypes[ext] ?? "application/octet-stream" });
  res.end(fs.readFileSync(filePath));
  return true;
}

async function handleApi(req, res, store) {
  const url = new URL(req.url, "http://localhost");

  if (req.method === "GET" && url.pathname === "/api/health") {
    return sendJson(res, 200, { status: "ok" });
  }

  if (req.method === "GET" && url.pathname === "/api/me") {
    const auth = getAuth(req, store);
    return sendJson(res, 200, {
      user: publicUser(auth.user),
      csrfToken: auth.session?.csrfToken ?? null,
    });
  }

  if (req.method === "GET" && url.pathname === "/api/plans") {
    return sendJson(res, 200, { plans: Object.values(store.plans) });
  }

  if (req.method === "POST" && url.pathname === "/api/register") {
    const body = await readJson(req);

    if (!isEmail(body.email)) {
      return sendError(res, 400, "INVALID_EMAIL", "Email is invalid.");
    }

    if (!isStrongEnoughPassword(body.password)) {
      return sendError(res, 400, "WEAK_PASSWORD", "Password must be at least 8 characters.");
    }

    try {
      const user = store.createUser({
        email: body.email,
        name: body.name,
        password: body.password,
      });
      const session = store.createSession(user.id);

      return sendJson(
        res,
        201,
        { user: publicUser(user), csrfToken: session.csrfToken },
        { "Set-Cookie": serializeCookie(SESSION_COOKIE, session.id, { maxAge: 60 * 60 * 24 * 7 }) },
      );
    } catch (error) {
      if (error.message === "EMAIL_ALREADY_REGISTERED") {
        return sendError(res, 409, "EMAIL_ALREADY_REGISTERED", "This email is already registered.");
      }

      throw error;
    }
  }

  if (req.method === "POST" && url.pathname === "/api/login") {
    const body = await readJson(req);
    const key = `${requestIp(req)}:${String(body.email).toLowerCase()}`;

    if (!checkLoginRateLimit(key)) {
      return sendError(res, 429, "RATE_LIMITED", "Too many login attempts. Try again later.");
    }

    const user = isEmail(body.email) ? store.verifyUser(body.email, body.password) : null;

    if (!user) {
      return sendError(res, 401, "INVALID_CREDENTIALS", "Email or password is incorrect.");
    }

    const session = store.createSession(user.id);

    return sendJson(
      res,
      200,
      { user: publicUser(user), csrfToken: session.csrfToken },
      { "Set-Cookie": serializeCookie(SESSION_COOKIE, session.id, { maxAge: 60 * 60 * 24 * 7 }) },
    );
  }

  if (req.method === "POST" && url.pathname === "/api/logout") {
    const auth = requireAuth(req, res, store);
    if (!auth) return;
    if (!requireCsrf(req, res, auth.session)) return;

    store.deleteSession(auth.session.id);
    return sendJson(res, 200, { ok: true }, { "Set-Cookie": serializeCookie(SESSION_COOKIE, "", { maxAge: 0 }) });
  }

  if (req.method === "GET" && url.pathname === "/api/orders") {
    const auth = requireAuth(req, res, store);
    if (!auth) return;

    return sendJson(res, 200, { orders: store.listOrdersForUser(auth.user.id) });
  }

  if (req.method === "POST" && url.pathname === "/api/orders") {
    const auth = requireAuth(req, res, store);
    if (!auth) return;
    if (!requireCsrf(req, res, auth.session)) return;

    const body = await readJson(req);

    try {
      return sendJson(res, 201, { order: store.createOrder({ userId: auth.user.id, planId: body.planId }) });
    } catch (error) {
      if (error.message === "UNKNOWN_PLAN") {
        return sendError(res, 400, "UNKNOWN_PLAN", "Plan does not exist.");
      }

      throw error;
    }
  }

  if (req.method === "POST" && url.pathname === "/api/feedback") {
    const auth = requireAuth(req, res, store);
    if (!auth) return;
    if (!requireCsrf(req, res, auth.session)) return;

    const body = await readJson(req);
    const message = String(body.message ?? "").trim();

    if (message.length < 3) {
      return sendError(res, 400, "EMPTY_FEEDBACK", "Feedback must contain at least 3 characters.");
    }

    return sendJson(res, 201, { feedback: store.createFeedback({ userId: auth.user.id, message }) });
  }

  if (req.method === "GET" && url.pathname === "/api/admin/users") {
    const auth = requireAuth(req, res, store);
    if (!auth) return;

    if (auth.user.role !== "admin") {
      return sendError(res, 403, "FORBIDDEN", "Admin role required.");
    }

    return sendJson(res, 200, { users: store.listUsers().map(publicUser) });
  }

  return sendError(res, 404, "NOT_FOUND", "API route not found.");
}

export function createApp(options = {}) {
  const store = options.store ?? createStore(options.dataFile ?? process.env.DATA_FILE ?? DEFAULT_DATA_FILE);
  const publicDir = path.resolve(options.publicDir ?? DEFAULT_PUBLIC_DIR);

  return http.createServer(async (req, res) => {
    try {
      if (req.url.startsWith("/api/")) {
        await handleApi(req, res, store);
        return;
      }

      if (req.method === "GET" && serveStatic(req, res, publicDir)) {
        return;
      }

      sendError(res, 404, "NOT_FOUND", "Route not found.");
    } catch (error) {
      sendError(res, 500, "INTERNAL_ERROR", error.message);
    }
  });
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const port = Number(process.env.PORT ?? 3000);
  const server = createApp();

  server.listen(port, () => {
    console.log(`Mini app listening on http://localhost:${port}`);
  });
}

