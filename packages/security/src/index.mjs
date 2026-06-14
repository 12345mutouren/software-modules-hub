import crypto from "node:crypto";

import { AppError, assertCondition } from "../../core/src/index.mjs";

const passwordPolicy = {
  minLength: 10,
  digit: /\d/,
  letter: /[A-Za-z]/,
};

export function validatePassword(password) {
  assertCondition(typeof password === "string", "Password is required.", { code: "PASSWORD_REQUIRED", status: 400 });
  assertCondition(password.length >= passwordPolicy.minLength, "Password is too short.", {
    code: "PASSWORD_TOO_SHORT",
    status: 400,
  });
  assertCondition(passwordPolicy.digit.test(password), "Password must include a number.", {
    code: "PASSWORD_WEAK",
    status: 400,
  });
  assertCondition(passwordPolicy.letter.test(password), "Password must include a letter.", {
    code: "PASSWORD_WEAK",
    status: 400,
  });
}

export function hashPassword(password, { salt = crypto.randomBytes(16).toString("hex") } = {}) {
  validatePassword(password);
  const hash = crypto.scryptSync(password, salt, 64).toString("hex");
  return { hash, salt, algorithm: "scrypt" };
}

export function verifyPassword(password, passwordRecord) {
  if (!passwordRecord?.hash || !passwordRecord?.salt) return false;
  const candidate = crypto.scryptSync(password, passwordRecord.salt, 64);
  const stored = Buffer.from(passwordRecord.hash, "hex");
  return stored.length === candidate.length && crypto.timingSafeEqual(stored, candidate);
}

export function createRateLimiter({ limit, windowMs, now = () => new Date() }) {
  const buckets = new Map();

  return {
    hit(key) {
      const current = now().getTime();
      const bucket = buckets.get(key) ?? { count: 0, resetAt: current + windowMs };

      if (current >= bucket.resetAt) {
        bucket.count = 0;
        bucket.resetAt = current + windowMs;
      }

      bucket.count += 1;
      buckets.set(key, bucket);

      if (bucket.count > limit) {
        throw new AppError("Too many attempts.", {
          code: "RATE_LIMITED",
          status: 429,
          details: { key, resetAt: new Date(bucket.resetAt).toISOString() },
        });
      }

      return { remaining: Math.max(0, limit - bucket.count), resetAt: new Date(bucket.resetAt).toISOString() };
    },
  };
}

export function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export function createSessionToken() {
  return crypto.randomBytes(24).toString("base64url");
}
