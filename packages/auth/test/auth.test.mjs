import assert from "node:assert/strict";
import { test } from "node:test";

import { createAuditLog, createSystemClock } from "../../core/src/index.mjs";
import { createRateLimiter } from "../../security/src/index.mjs";
import { createAuthService } from "../src/index.mjs";

test("auth service registers users without exposing password material", () => {
  const auditLog = createAuditLog();
  const auth = createAuthService({ auditLog });

  const user = auth.register({ email: "Admin@Example.com", password: "StrongPass123", roles: ["admin"] });

  assert.equal(user.email, "admin@example.com");
  assert.equal(user.passwordHash, undefined);
  assert.equal(auditLog.list({ action: "user.registered" }).length, 1);
});

test("auth service creates sessions and checks permissions", () => {
  const auth = createAuthService();
  auth.register({ email: "admin@example.com", password: "StrongPass123", roles: ["admin"] });

  const { session } = auth.login({ email: "admin@example.com", password: "StrongPass123" });
  const user = auth.requirePermission(session.token, "audit:read");

  assert.deepEqual(user.roles, ["admin"]);
});

test("auth service blocks missing permissions", () => {
  const auth = createAuthService();
  auth.register({ email: "user@example.com", password: "StrongPass123" });
  const { session } = auth.login({ email: "user@example.com", password: "StrongPass123" });

  assert.throws(() => auth.requirePermission(session.token, "export:create"), /Permission denied/);
});

test("auth service rate limits repeated failed logins", () => {
  const clock = createSystemClock();
  const auth = createAuthService({
    now: () => clock.now(),
    loginLimiter: createRateLimiter({ limit: 2, windowMs: 1000, now: () => clock.now() }),
  });

  auth.register({ email: "user@example.com", password: "StrongPass123" });
  assert.throws(() => auth.login({ email: "user@example.com", password: "WrongPass123", ip: "127.0.0.1" }), /Invalid credentials/);
  assert.throws(() => auth.login({ email: "user@example.com", password: "WrongPass123", ip: "127.0.0.1" }), /Invalid credentials/);
  assert.throws(() => auth.login({ email: "user@example.com", password: "WrongPass123", ip: "127.0.0.1" }), /Too many attempts/);
});
