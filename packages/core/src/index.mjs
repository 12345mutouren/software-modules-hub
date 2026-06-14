export class AppError extends Error {
  constructor(message, { code = "APP_ERROR", status = 500, details = {} } = {}) {
    super(message);
    this.name = "AppError";
    this.code = code;
    this.status = status;
    this.details = details;
  }
}

export function assertCondition(condition, message, options) {
  if (!condition) {
    throw new AppError(message, options);
  }
}

export function createIdFactory(prefix) {
  let nextId = 1;

  return () => `${prefix}_${String(nextId++).padStart(4, "0")}`;
}

export function createSystemClock(start = new Date("2026-01-01T00:00:00.000Z")) {
  let current = new Date(start);

  return {
    now() {
      return new Date(current);
    },
    advance(ms) {
      current = new Date(current.getTime() + ms);
      return this.now();
    },
  };
}

export function createMemoryRepository({ idPrefix, now = () => new Date() }) {
  const createId = createIdFactory(idPrefix);
  const records = new Map();

  return {
    create(input) {
      const timestamp = now().toISOString();
      const record = {
        id: createId(),
        ...input,
        createdAt: timestamp,
        updatedAt: timestamp,
      };
      records.set(record.id, record);
      return clone(record);
    },
    get(id) {
      const record = records.get(id);
      return record ? clone(record) : null;
    },
    find(predicate) {
      const record = [...records.values()].find(predicate);
      return record ? clone(record) : null;
    },
    list(predicate = () => true) {
      return [...records.values()].filter(predicate).map(clone);
    },
    update(id, updater) {
      const existing = records.get(id);
      assertCondition(existing, "Record not found.", { code: "NOT_FOUND", status: 404, details: { id } });
      const patch = typeof updater === "function" ? updater(clone(existing)) : updater;
      const updated = {
        ...existing,
        ...patch,
        id,
        updatedAt: now().toISOString(),
      };
      records.set(id, updated);
      return clone(updated);
    },
  };
}

export function createAuditLog({ now = () => new Date(), createId = createIdFactory("aud") } = {}) {
  const entries = [];

  return {
    record({ actorId, action, resourceType, resourceId, metadata = {} }) {
      const entry = {
        id: createId(),
        actorId,
        action,
        resourceType,
        resourceId,
        metadata,
        createdAt: now().toISOString(),
      };
      entries.push(entry);
      return clone(entry);
    },
    list(filter = {}) {
      return entries
        .filter((entry) => {
          return Object.entries(filter).every(([key, value]) => entry[key] === value);
        })
        .map(clone);
    },
  };
}

export function toPublicUser(user) {
  const { passwordHash, passwordSalt, ...publicUser } = user;
  return clone(publicUser);
}

function clone(value) {
  return structuredClone(value);
}
