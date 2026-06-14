import assert from "node:assert/strict";
import { after, before, test } from "node:test";

import { createWebAdminServer } from "../src/server.mjs";

let server;
let baseUrl;

before(async () => {
  server = createWebAdminServer();
  await new Promise((resolve) => server.listen(0, resolve));
  baseUrl = `http://127.0.0.1:${server.address().port}`;
});

after(async () => {
  await new Promise((resolve) => server.close(resolve));
});

async function request(path, { method = "GET", token, body } = {}) {
  const response = await fetch(`${baseUrl}${path}`, {
    method,
    headers: {
      "content-type": "application/json",
      ...(token ? { authorization: `Bearer ${token}` } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  const contentType = response.headers.get("content-type") ?? "";
  const payload = contentType.includes("application/json") ? await response.json() : await response.text();
  return { status: response.status, body: payload, contentType };
}

test("serves the browser admin shell and static assets", async () => {
  const page = await request("/");
  const script = await request("/app.js");
  const styles = await request("/styles.css");

  assert.equal(page.status, 200);
  assert.match(page.body, /Software Modules Admin/);
  assert.equal(script.status, 200);
  assert.match(script.body, /refreshAuditLogs/);
  assert.equal(styles.status, 200);
  assert.match(styles.body, /\.workspace/);
});

test("web app API runs the admin workflow through HTTP", async () => {
  const adminLogin = await request("/api/auth/login", {
    method: "POST",
    body: { email: "admin@example.com", password: "StrongPass123" },
  });
  const writerLogin = await request("/api/auth/login", {
    method: "POST",
    body: { email: "writer@example.com", password: "StrongPass123" },
  });
  const adminToken = adminLogin.body.session.token;
  const writerToken = writerLogin.body.session.token;

  const created = await request("/api/content", {
    method: "POST",
    token: writerToken,
    body: { title: "Review me", body: "Draft body" },
  });
  const listed = await request("/api/content", { token: adminToken });
  const reviewed = await request(`/api/content/${created.body.content.id}/review`, {
    method: "POST",
    token: adminToken,
    body: { decision: "approved" },
  });
  const exportJob = await request("/api/exports", {
    method: "POST",
    token: adminToken,
    body: { type: "content" },
  });
  const auditLogs = await request("/api/audit-logs", { token: adminToken });

  assert.equal(adminLogin.status, 200);
  assert.deepEqual(adminLogin.body.user.roles, ["admin"]);
  assert.equal(created.status, 201);
  assert.equal(listed.body.content.length, 1);
  assert.equal(reviewed.body.content.reviewStatus, "approved");
  assert.equal(exportJob.body.exportJob.status, "queued");
  assert.ok(auditLogs.body.auditLogs.some((entry) => entry.action === "content.approved"));
});

test("writer cannot access admin-only surfaces", async () => {
  const writerLogin = await request("/api/auth/login", {
    method: "POST",
    body: { email: "writer@example.com", password: "StrongPass123" },
  });
  const writerToken = writerLogin.body.session.token;

  const exportDenied = await request("/api/exports", {
    method: "POST",
    token: writerToken,
    body: { type: "users" },
  });
  const auditDenied = await request("/api/audit-logs", { token: writerToken });

  assert.equal(exportDenied.status, 403);
  assert.equal(auditDenied.status, 403);
});
