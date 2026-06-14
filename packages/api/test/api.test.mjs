import assert from "node:assert/strict";
import { test } from "node:test";

import { createApiApp } from "../src/index.mjs";

test("api exposes a health endpoint", async () => {
  const api = createApiApp();
  const response = await api.handle({ method: "GET", path: "/health" });

  assert.equal(response.status, 200);
  assert.deepEqual(response.body, { ok: true, service: "software-modules-api" });
});

test("api runs register, login, content, review, export and audit flow", async () => {
  const api = createApiApp();
  await api.handle({ method: "POST", path: "/auth/register", body: { email: "admin@example.com", password: "StrongPass123", roles: ["admin"] } });
  await api.handle({ method: "POST", path: "/auth/register", body: { email: "writer@example.com", password: "StrongPass123" } });

  const adminLogin = await api.handle({ method: "POST", path: "/auth/login", body: { email: "admin@example.com", password: "StrongPass123" } });
  const writerLogin = await api.handle({ method: "POST", path: "/auth/login", body: { email: "writer@example.com", password: "StrongPass123" } });
  const writerHeaders = bearer(writerLogin.body.session.token);
  const adminHeaders = bearer(adminLogin.body.session.token);

  const created = await api.handle({
    method: "POST",
    path: "/content",
    headers: writerHeaders,
    body: { title: "<script>bad()</script>Launch Note", body: "Body" },
  });
  const reviewed = await api.handle({
    method: "POST",
    path: `/content/${created.body.content.id}/review`,
    headers: adminHeaders,
    body: { decision: "approved" },
  });
  const exportResponse = await api.handle({ method: "POST", path: "/exports", headers: adminHeaders, body: { type: "content" } });
  const auditResponse = await api.handle({ method: "GET", path: "/audit-logs", headers: adminHeaders });

  assert.equal(created.status, 201);
  assert.match(created.body.content.title, /&lt;script&gt;/);
  assert.equal(reviewed.body.content.reviewStatus, "approved");
  assert.equal(exportResponse.body.exportJob.status, "queued");
  assert.deepEqual(
    auditResponse.body.auditLogs.map((entry) => entry.action),
    ["user.registered", "user.registered", "session.created", "session.created", "content.created", "content.approved", "export.created"],
  );
});

test("api blocks missing auth and missing permissions", async () => {
  const api = createApiApp();
  await api.handle({ method: "POST", path: "/auth/register", body: { email: "writer@example.com", password: "StrongPass123" } });
  const writerLogin = await api.handle({ method: "POST", path: "/auth/login", body: { email: "writer@example.com", password: "StrongPass123" } });
  const writerHeaders = bearer(writerLogin.body.session.token);

  const missingAuth = await api.handle({ method: "POST", path: "/content", body: { title: "Post", body: "Body" } });
  const deniedExport = await api.handle({ method: "POST", path: "/exports", headers: writerHeaders, body: { type: "users" } });
  const deniedAudit = await api.handle({ method: "GET", path: "/audit-logs", headers: writerHeaders });

  assert.equal(missingAuth.status, 401);
  assert.equal(missingAuth.body.error.code, "AUTH_REQUIRED");
  assert.equal(deniedExport.status, 403);
  assert.equal(deniedAudit.status, 403);
});

test("api returns structured validation and not-found errors", async () => {
  const api = createApiApp();
  const invalidBody = await api.handle({ method: "POST", path: "/auth/register", body: { email: "user@example.com" } });
  const notFound = await api.handle({ method: "GET", path: "/missing" });

  assert.equal(invalidBody.status, 400);
  assert.equal(invalidBody.body.error.code, "VALIDATION_ERROR");
  assert.equal(notFound.status, 404);
  assert.equal(notFound.body.error.code, "NOT_FOUND");
});

function bearer(token) {
  return { authorization: `Bearer ${token}` };
}
