import { AppError, assertCondition, createMemoryRepository, toPublicUser } from "../../core/src/index.mjs";
import { createRateLimiter, createSessionToken, hashPassword, verifyPassword } from "../../security/src/index.mjs";

const defaultRolePermissions = {
  user: ["content:create", "content:read:own"],
  moderator: ["content:create", "content:read:own", "content:review"],
  admin: ["content:create", "content:read:all", "content:review", "export:create", "audit:read"],
  super_admin: ["*"],
};

export function createAuthService({
  now = () => new Date(),
  auditLog,
  rolePermissions = defaultRolePermissions,
  loginLimiter = createRateLimiter({ limit: 5, windowMs: 60_000, now }),
  userRepository,
  sessionRepository,
} = {}) {
  const users = userRepository ?? createMemoryRepository({ idPrefix: "usr", now });
  const sessions = sessionRepository ?? createMemoryRepository({ idPrefix: "ses", now });

  function register({ email, password, roles = ["user"], status = "active" }) {
    const normalizedEmail = normalizeEmail(email);
    assertCondition(!users.find((user) => user.email === normalizedEmail), "Email already registered.", {
      code: "EMAIL_TAKEN",
      status: 409,
    });

    const passwordRecord = hashPassword(password);
    const user = users.create({
      email: normalizedEmail,
      roles,
      status,
      passwordHash: passwordRecord.hash,
      passwordSalt: passwordRecord.salt,
    });
    auditLog?.record({ actorId: user.id, action: "user.registered", resourceType: "user", resourceId: user.id });
    return toPublicUser(user);
  }

  function login({ email, password, ip = "unknown" }) {
    const normalizedEmail = normalizeEmail(email);
    loginLimiter.hit(`login:${normalizedEmail}:${ip}`);
    const user = users.find((item) => item.email === normalizedEmail);
    const validPassword = user && verifyPassword(password, { hash: user.passwordHash, salt: user.passwordSalt });

    if (!user || !validPassword || user.status !== "active") {
      auditLog?.record({ actorId: user?.id ?? "anonymous", action: "session.failed", resourceType: "session", resourceId: ip });
      throw new AppError("Invalid credentials.", { code: "INVALID_CREDENTIALS", status: 401 });
    }

    const session = {
      token: createSessionToken(),
      userId: user.id,
      expiresAt: new Date(now().getTime() + 1000 * 60 * 60 * 8).toISOString(),
    };
    const createdSession = sessions.create(session);
    auditLog?.record({ actorId: user.id, action: "session.created", resourceType: "session", resourceId: createdSession.id });
    return { session: createdSession, user: toPublicUser(user) };
  }

  function requireSession(token) {
    const session = sessions.find((item) => item.token === token);
    assertCondition(session, "Authentication required.", { code: "AUTH_REQUIRED", status: 401 });
    assertCondition(new Date(session.expiresAt).getTime() > now().getTime(), "Session expired.", {
      code: "SESSION_EXPIRED",
      status: 401,
    });
    const user = users.get(session.userId);
    assertCondition(user?.status === "active", "User is not active.", { code: "USER_INACTIVE", status: 403 });
    return toPublicUser(user);
  }

  function requirePermission(userOrToken, permission) {
    const user = typeof userOrToken === "string" ? requireSession(userOrToken) : userOrToken;
    const permissions = new Set(user.roles.flatMap((role) => rolePermissions[role] ?? []));
    assertCondition(permissions.has("*") || permissions.has(permission), "Permission denied.", {
      code: "FORBIDDEN",
      status: 403,
      details: { permission },
    });
    return user;
  }

  function getUserByEmail(email) {
    const user = users.find((item) => item.email === normalizeEmail(email));
    return user ? toPublicUser(user) : null;
  }

  return { register, login, requireSession, requirePermission, getUserByEmail };
}

function normalizeEmail(email) {
  assertCondition(typeof email === "string" && email.includes("@"), "Valid email is required.", {
    code: "EMAIL_INVALID",
    status: 400,
  });
  return email.trim().toLowerCase();
}
