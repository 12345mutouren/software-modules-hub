import { assertCondition, createMemoryRepository } from "../../core/src/index.mjs";

export const dataModels = {
  User: ["email", "roles", "status", "passwordHash", "passwordSalt"],
  Session: ["userId", "token", "expiresAt"],
  Role: ["name", "permissions"],
  AuditLog: ["actorId", "action", "resourceType", "resourceId", "metadata"],
  Content: ["authorId", "title", "body", "reviewStatus", "reviewedBy"],
  ExportJob: ["type", "status", "requestedBy"],
};

export function createDataStore({ now = () => new Date() } = {}) {
  return {
    users: createUserRepository({ now }),
    sessions: createSessionRepository({ now }),
    roles: createRoleRepository({ now }),
    auditLogs: createAuditLogRepository({ now }),
    content: createContentRepository({ now }),
    exportJobs: createExportJobRepository({ now }),
  };
}

export function seedDefaultRoles(store) {
  const roles = [
    { name: "user", permissions: ["content:create", "content:read:own"] },
    { name: "moderator", permissions: ["content:create", "content:read:own", "content:review"] },
    { name: "admin", permissions: ["content:create", "content:read:all", "content:review", "export:create", "audit:read"] },
    { name: "super_admin", permissions: ["*"] },
  ];

  return roles.map((role) => store.roles.create(role));
}

export function createUserRepository({ now = () => new Date() } = {}) {
  return createTypedRepository({ idPrefix: "usr", now, validate: validateUser });
}

export function createSessionRepository({ now = () => new Date() } = {}) {
  return createTypedRepository({ idPrefix: "ses", now, validate: validateSession });
}

export function createRoleRepository({ now = () => new Date() } = {}) {
  return createTypedRepository({ idPrefix: "rol", now, validate: validateRole });
}

export function createAuditLogRepository({ now = () => new Date() } = {}) {
  return createTypedRepository({ idPrefix: "aud", now, validate: validateAuditLog });
}

export function createContentRepository({ now = () => new Date() } = {}) {
  return createTypedRepository({ idPrefix: "cnt", now, validate: validateContent });
}

export function createExportJobRepository({ now = () => new Date() } = {}) {
  return createTypedRepository({ idPrefix: "exp", now, validate: validateExportJob });
}

function createTypedRepository({ idPrefix, now, validate }) {
  const repository = createMemoryRepository({ idPrefix, now });

  return {
    create(input) {
      return repository.create(validate(input));
    },
    get(id) {
      return repository.get(id);
    },
    find(predicate) {
      return repository.find(predicate);
    },
    list(predicate) {
      return repository.list(predicate);
    },
    update(id, patchOrUpdater) {
      return repository.update(id, (existing) => {
        const patch = typeof patchOrUpdater === "function" ? patchOrUpdater(existing) : patchOrUpdater;
        return validate({ ...existing, ...patch });
      });
    },
  };
}

function validateUser(input) {
  const email = requireEmail(input.email);
  const roles = requireStringList(input.roles ?? ["user"], "roles");
  const status = requireOneOf(input.status ?? "active", ["active", "disabled"], "status");

  return {
    email,
    roles,
    status,
    passwordHash: optionalString(input.passwordHash),
    passwordSalt: optionalString(input.passwordSalt),
  };
}

function validateSession(input) {
  return {
    userId: requireString(input.userId, "userId"),
    token: requireString(input.token, "token"),
    expiresAt: requireIsoDate(input.expiresAt, "expiresAt"),
  };
}

function validateRole(input) {
  return {
    name: requireString(input.name, "name"),
    permissions: requireStringList(input.permissions, "permissions"),
  };
}

function validateAuditLog(input) {
  return {
    actorId: requireString(input.actorId, "actorId"),
    action: requireString(input.action, "action"),
    resourceType: requireString(input.resourceType, "resourceType"),
    resourceId: requireString(input.resourceId, "resourceId"),
    metadata: input.metadata && typeof input.metadata === "object" ? structuredClone(input.metadata) : {},
  };
}

function validateContent(input) {
  return {
    authorId: requireString(input.authorId, "authorId"),
    title: requireString(input.title, "title"),
    body: requireString(input.body, "body"),
    reviewStatus: requireOneOf(input.reviewStatus ?? "pending", ["pending", "approved", "rejected"], "reviewStatus"),
    reviewedBy: optionalString(input.reviewedBy),
  };
}

function validateExportJob(input) {
  return {
    type: requireString(input.type, "type"),
    status: requireOneOf(input.status ?? "queued", ["queued", "running", "completed", "failed"], "status"),
    requestedBy: requireString(input.requestedBy, "requestedBy"),
  };
}

function requireEmail(value) {
  const email = requireString(value, "email").trim().toLowerCase();
  assertCondition(email.includes("@"), "Valid email is required.", { code: "DATA_VALIDATION_ERROR", status: 400 });
  return email;
}

function requireString(value, field) {
  assertCondition(typeof value === "string" && value.trim().length > 0, `${field} is required.`, {
    code: "DATA_VALIDATION_ERROR",
    status: 400,
    details: { field },
  });
  return value.trim();
}

function optionalString(value) {
  if (value === undefined || value === null || value === "") return undefined;
  return requireString(value, "optionalString");
}

function requireStringList(value, field) {
  assertCondition(Array.isArray(value) && value.length > 0, `${field} must be a non-empty list.`, {
    code: "DATA_VALIDATION_ERROR",
    status: 400,
    details: { field },
  });
  return value.map((item) => requireString(item, field));
}

function requireOneOf(value, allowed, field) {
  assertCondition(allowed.includes(value), `${field} is invalid.`, {
    code: "DATA_VALIDATION_ERROR",
    status: 400,
    details: { field, allowed },
  });
  return value;
}

function requireIsoDate(value, field) {
  const iso = requireString(value, field);
  assertCondition(!Number.isNaN(new Date(iso).getTime()), `${field} must be an ISO date.`, {
    code: "DATA_VALIDATION_ERROR",
    status: 400,
    details: { field },
  });
  return iso;
}
