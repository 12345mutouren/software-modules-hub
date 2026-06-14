import fs from "node:fs";
import http from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { createApiApp } from "../../../packages/api/src/index.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const defaultPublicDir = path.resolve(__dirname, "../public");

export const demoUsers = [
  { email: "admin@example.com", password: "StrongPass123", roles: ["admin"] },
  { email: "writer@example.com", password: "StrongPass123", roles: ["user"] },
];

export function createWebAdminServer({ api = createApiApp({ seedUsers: demoUsers }), publicDir = defaultPublicDir } = {}) {
  const absolutePublicDir = path.resolve(publicDir);

  return http.createServer(async (req, res) => {
    try {
      if (req.url.startsWith("/api/")) {
        await handleApiRequest({ req, res, api });
        return;
      }

      if (req.method === "GET" && serveStatic({ req, res, publicDir: absolutePublicDir })) {
        return;
      }

      sendJson(res, 404, { error: { code: "NOT_FOUND", message: "Route not found." } });
    } catch (error) {
      sendJson(res, 500, { error: { code: "INTERNAL_ERROR", message: error.message } });
    }
  });
}

async function handleApiRequest({ req, res, api }) {
  const body = await readJson(req);
  const apiPath = req.url.replace(/^\/api/, "") || "/";
  const response = await api.handle({
    method: req.method,
    path: apiPath,
    headers: req.headers,
    body,
    ip: req.socket.remoteAddress ?? "unknown",
  });
  sendJson(res, response.status, response.body, response.headers);
}

async function readJson(req) {
  if (!["POST", "PUT", "PATCH"].includes(req.method)) return null;
  const chunks = [];

  for await (const chunk of req) {
    chunks.push(chunk);
  }

  const raw = Buffer.concat(chunks).toString("utf8");
  return raw ? JSON.parse(raw) : {};
}

function serveStatic({ req, res, publicDir }) {
  const url = new URL(req.url, "http://localhost");
  const requestPath = url.pathname === "/" ? "/index.html" : url.pathname;
  const normalized = path.normalize(requestPath).replace(/^(\.\.[/\\])+/, "");
  const filePath = path.join(publicDir, normalized);

  if (!filePath.startsWith(publicDir) || !fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
    return false;
  }

  const contentType = {
    ".html": "text/html; charset=utf-8",
    ".css": "text/css; charset=utf-8",
    ".js": "text/javascript; charset=utf-8",
  }[path.extname(filePath)] ?? "application/octet-stream";

  res.writeHead(200, { "content-type": contentType });
  res.end(fs.readFileSync(filePath));
  return true;
}

function sendJson(res, status, body, headers = {}) {
  res.writeHead(status, { "content-type": "application/json; charset=utf-8", ...headers });
  res.end(JSON.stringify(body, null, 2));
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const port = Number(process.env.PORT ?? 4310);
  const server = createWebAdminServer();

  server.listen(port, () => {
    console.log(`Web admin app listening on http://localhost:${port}`);
  });
}
