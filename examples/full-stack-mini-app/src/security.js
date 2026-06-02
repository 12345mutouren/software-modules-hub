import crypto from "node:crypto";

const PASSWORD_KEY_LENGTH = 64;

export function randomId(prefix = "id") {
  return `${prefix}_${crypto.randomBytes(16).toString("hex")}`;
}

export function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto.scryptSync(password, salt, PASSWORD_KEY_LENGTH).toString("hex");
  return `scrypt$${salt}$${hash}`;
}

export function verifyPassword(password, storedHash) {
  const [scheme, salt, hash] = String(storedHash).split("$");

  if (scheme !== "scrypt" || !salt || !hash) {
    return false;
  }

  const candidate = crypto.scryptSync(password, salt, PASSWORD_KEY_LENGTH);
  const expected = Buffer.from(hash, "hex");

  return expected.length === candidate.length && crypto.timingSafeEqual(expected, candidate);
}

export function parseCookies(header = "") {
  return Object.fromEntries(
    header
      .split(";")
      .map((part) => part.trim())
      .filter(Boolean)
      .map((part) => {
        const [name, ...rest] = part.split("=");
        return [decodeURIComponent(name), decodeURIComponent(rest.join("="))];
      }),
  );
}

export function serializeCookie(name, value, options = {}) {
  const parts = [`${encodeURIComponent(name)}=${encodeURIComponent(value)}`];

  if (options.maxAge !== undefined) {
    parts.push(`Max-Age=${options.maxAge}`);
  }

  parts.push(`Path=${options.path ?? "/"}`);

  if (options.httpOnly !== false) {
    parts.push("HttpOnly");
  }

  parts.push(`SameSite=${options.sameSite ?? "Lax"}`);

  if (options.secure) {
    parts.push("Secure");
  }

  return parts.join("; ");
}

export function publicUser(user) {
  if (!user) {
    return null;
  }

  return {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
    plan: user.plan,
    createdAt: user.createdAt,
  };
}

export function isEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value));
}

export function isStrongEnoughPassword(value) {
  return typeof value === "string" && value.length >= 8;
}

