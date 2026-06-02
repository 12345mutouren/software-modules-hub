import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { after, before, test } from "node:test";
import { fileURLToPath } from "node:url";
import { createApp } from "../src/app.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "mini-app-test-"));
const dataFile = path.join(tempDir, "app.json");
const publicDir = path.resolve(__dirname, "../public");

let server;
let baseUrl;

before(async () => {
  server = createApp({ dataFile, publicDir });
  await new Promise((resolve) => server.listen(0, resolve));
  baseUrl = `http://127.0.0.1:${server.address().port}`;
});

after(async () => {
  await new Promise((resolve) => server.close(resolve));
  fs.rmSync(tempDir, { recursive: true, force: true });
});

async function api(pathname, options = {}) {
  const response = await fetch(`${baseUrl}${pathname}`, {
    method: options.method ?? "GET",
    headers: {
      "Content-Type": "application/json",
      ...(options.cookie ? { Cookie: options.cookie } : {}),
      ...(options.csrfToken ? { "x-csrf-token": options.csrfToken } : {}),
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  return {
    status: response.status,
    body: await response.json(),
    cookie: response.headers.get("set-cookie")?.split(";")[0] ?? null,
  };
}

test("health endpoint responds", async () => {
  const response = await api("/api/health");

  assert.equal(response.status, 200);
  assert.equal(response.body.status, "ok");
});

test("registration validates email and password", async () => {
  const response = await api("/api/register", {
    method: "POST",
    body: { email: "bad-email", password: "short" },
  });

  assert.equal(response.status, 400);
  assert.equal(response.body.error.code, "INVALID_EMAIL");
});

test("user can register, create an order, and read own orders", async () => {
  const registration = await api("/api/register", {
    method: "POST",
    body: { name: "Admin User", email: "admin@example.com", password: "password123" },
  });

  assert.equal(registration.status, 201);
  assert.equal(registration.body.user.role, "admin");
  assert.ok(registration.cookie);
  assert.ok(registration.body.csrfToken);

  const missingCsrf = await api("/api/orders", {
    method: "POST",
    cookie: registration.cookie,
    body: { planId: "pro" },
  });

  assert.equal(missingCsrf.status, 403);
  assert.equal(missingCsrf.body.error.code, "BAD_CSRF_TOKEN");

  const order = await api("/api/orders", {
    method: "POST",
    cookie: registration.cookie,
    csrfToken: registration.body.csrfToken,
    body: { planId: "pro" },
  });

  assert.equal(order.status, 201);
  assert.equal(order.body.order.planId, "pro");
  assert.equal(order.body.order.status, "paid");

  const orders = await api("/api/orders", { cookie: registration.cookie });

  assert.equal(orders.status, 200);
  assert.equal(orders.body.orders.length, 1);
});

test("admin can list users and normal user cannot", async () => {
  const adminLogin = await api("/api/login", {
    method: "POST",
    body: { email: "admin@example.com", password: "password123" },
  });

  const userRegistration = await api("/api/register", {
    method: "POST",
    body: { name: "Normal User", email: "user@example.com", password: "password123" },
  });

  assert.equal(userRegistration.body.user.role, "user");

  const adminUsers = await api("/api/admin/users", { cookie: adminLogin.cookie });
  assert.equal(adminUsers.status, 200);
  assert.equal(adminUsers.body.users.length, 2);

  const forbidden = await api("/api/admin/users", { cookie: userRegistration.cookie });
  assert.equal(forbidden.status, 403);
  assert.equal(forbidden.body.error.code, "FORBIDDEN");
});

test("authenticated user can submit feedback", async () => {
  const login = await api("/api/login", {
    method: "POST",
    body: { email: "user@example.com", password: "password123" },
  });

  const feedback = await api("/api/feedback", {
    method: "POST",
    cookie: login.cookie,
    csrfToken: login.body.csrfToken,
    body: { message: "This example is useful." },
  });

  assert.equal(feedback.status, 201);
  assert.equal(feedback.body.feedback.status, "open");
});

