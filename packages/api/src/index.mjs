import { AppError, assertCondition } from "../../core/src/index.mjs";
import { createAuthService } from "../../auth/src/index.mjs";
import { createDataStore, seedDefaultRoles } from "../../data/src/index.mjs";
import { createAuditService, createContentService, createExportService } from "./services.mjs";

export function createApiApp({ now = () => new Date(), seedUsers = [], database } = {}) {
  const data = createDataStore({ now, database });
  seedDefaultRoles(data);

  const auditLog = createAuditService({ auditRepository: data.auditLogs });
  const auth = createAuthService({
    now,
    auditLog,
    userRepository: data.users,
    sessionRepository: data.sessions,
  });
  const contentService = createContentService({ contentRepository: data.content, auditLog });
  const exportService = createExportService({ exportRepository: data.exportJobs, auditLog });

  seedUsers.forEach((user) => {
    if (auth.getUserByEmail(user.email)) return;
    auth.register({
      email: user.email,
      password: user.password,
      roles: user.roles ?? ["user"],
      status: user.status ?? "active",
    });
  });

  async function handle(request) {
    try {
      const normalized = normalizeRequest(request);
      const responseBody = await dispatch(normalized);
      return jsonResponse(responseBody.status ?? 200, responseBody.body ?? responseBody);
    } catch (error) {
      return errorResponse(error);
    }
  }

  async function dispatch(request) {
    const { method, pathname } = request;

    if (method === "GET" && pathname === "/health") {
      return { status: 200, body: { ok: true, service: "software-modules-api" } };
    }

    if (method === "POST" && pathname === "/auth/register") {
      const body = requireBody(request, ["email", "password"]);
      const user = auth.register({
        email: body.email,
        password: body.password,
        roles: ["user"],
        status: "active",
      });
      return { status: 201, body: { user } };
    }

    if (method === "POST" && pathname === "/auth/login") {
      const body = requireBody(request, ["email", "password"]);
      const result = auth.login({ email: body.email, password: body.password, ip: request.ip });
      return { status: 200, body: result };
    }

    if (method === "GET" && pathname === "/me") {
      const token = getBearerToken(request.headers);
      const user = auth.requireSession(token);
      return { status: 200, body: { user } };
    }

    if (method === "POST" && pathname === "/content") {
      const user = requirePermission(request, "content:create");
      const body = requireBody(request, ["title", "body"]);
      const content = contentService.createDraft({ actor: user, title: body.title, body: body.body });
      return { status: 201, body: { content } };
    }

    if (method === "GET" && pathname === "/content") {
      const { user, readAll } = requireContentRead(request);
      const content = contentService.listVisible({ actor: user, readAll });
      return { status: 200, body: { content } };
    }

    const reviewMatch = pathname.match(/^\/content\/([^/]+)\/review$/);
    if (method === "POST" && reviewMatch) {
      const user = requirePermission(request, "content:review");
      const body = requireBody(request, ["decision"]);
      const content = contentService.review({ actor: user, contentId: reviewMatch[1], decision: body.decision });
      return { status: 200, body: { content } };
    }

    if (method === "POST" && pathname === "/exports") {
      const user = requirePermission(request, "export:create");
      const body = requireBody(request, ["type"]);
      const exportJob = exportService.create({ actor: user, type: body.type });
      return { status: 201, body: { exportJob } };
    }

    if (method === "GET" && pathname === "/exports") {
      requirePermission(request, "export:create");
      return { status: 200, body: { exportJobs: exportService.list() } };
    }

    if (method === "GET" && pathname === "/audit-logs") {
      requirePermission(request, "audit:read");
      return { status: 200, body: { auditLogs: auditLog.list() } };
    }

    throw new AppError("Route not found.", { code: "NOT_FOUND", status: 404, details: { method, path: pathname } });
  }

  function requirePermission(request, permission) {
    const token = getBearerToken(request.headers);
    return auth.requirePermission(token, permission);
  }

  function requireContentRead(request) {
    try {
      return { user: requirePermission(request, "content:read:all"), readAll: true };
    } catch (error) {
      if (error instanceof AppError && error.code === "FORBIDDEN") {
        return { user: requirePermission(request, "content:read:own"), readAll: false };
      }
      throw error;
    }
  }

  return { handle, data };
}

function normalizeRequest(request = {}) {
  const method = String(request.method ?? "GET").toUpperCase();
  const url = new URL(request.path ?? "/", "http://software-modules.local");
  return {
    method,
    pathname: url.pathname,
    headers: normalizeHeaders(request.headers),
    body: request.body ?? null,
    ip: request.ip ?? "unknown",
  };
}

function normalizeHeaders(headers = {}) {
  return Object.fromEntries(Object.entries(headers).map(([key, value]) => [key.toLowerCase(), String(value)]));
}

function requireBody(request, requiredFields = []) {
  assertCondition(request.body && typeof request.body === "object" && !Array.isArray(request.body), "JSON body is required.", {
    code: "VALIDATION_ERROR",
    status: 400,
  });

  for (const field of requiredFields) {
    assertCondition(request.body[field] !== undefined && request.body[field] !== "", `${field} is required.`, {
      code: "VALIDATION_ERROR",
      status: 400,
      details: { field },
    });
  }

  return request.body;
}

function getBearerToken(headers) {
  const value = headers.authorization ?? "";
  const match = value.match(/^Bearer\s+(.+)$/i);
  assertCondition(match, "Authentication required.", { code: "AUTH_REQUIRED", status: 401 });
  return match[1];
}

function jsonResponse(status, body) {
  return {
    status,
    headers: { "content-type": "application/json" },
    body,
  };
}

function errorResponse(error) {
  if (error instanceof AppError) {
    return jsonResponse(error.status, {
      error: {
        code: error.code,
        message: error.message,
        details: error.details,
      },
    });
  }

  return jsonResponse(500, {
    error: {
      code: "INTERNAL_ERROR",
      message: "Internal server error.",
    },
  });
}
