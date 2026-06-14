import assert from "node:assert/strict";
import { test } from "node:test";

import { AppError, createSystemClock } from "../../core/src/index.mjs";
import { createRateLimiter, escapeHtml, hashPassword, verifyPassword } from "../src/index.mjs";

test("password hashing stores a non-plain value and verifies the original password", () => {
  const passwordRecord = hashPassword("StrongPass123", { salt: "fixed-salt" });

  assert.notEqual(passwordRecord.hash, "StrongPass123");
  assert.equal(verifyPassword("StrongPass123", passwordRecord), true);
  assert.equal(verifyPassword("WrongPass123", passwordRecord), false);
});

test("password policy rejects short passwords", () => {
  assert.throws(() => hashPassword("short1"), /Password is too short/);
});

test("rate limiter blocks repeated attempts until the window resets", () => {
  const clock = createSystemClock();
  const limiter = createRateLimiter({ limit: 2, windowMs: 1000, now: () => clock.now() });

  limiter.hit("login:alice");
  limiter.hit("login:alice");
  assert.throws(
    () => limiter.hit("login:alice"),
    (error) => error instanceof AppError && error.code === "RATE_LIMITED" && error.status === 429,
  );

  clock.advance(1000);
  assert.equal(limiter.hit("login:alice").remaining, 1);
});

test("escapeHtml neutralizes scriptable text", () => {
  assert.equal(escapeHtml('<img src=x onerror="alert(1)">'), "&lt;img src=x onerror=&quot;alert(1)&quot;&gt;");
});
