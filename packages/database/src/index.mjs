import fs from "node:fs";
import { createRequire } from "node:module";
import path from "node:path";

import { AppError, assertCondition } from "../../core/src/index.mjs";

const databaseVersion = 1;
const require = createRequire(import.meta.url);

export const databaseTables = {
  users: {
    name: "users",
    idPrefix: "usr",
    indexes: [{ name: "users_email_unique", fields: ["email"], unique: true }],
  },
  sessions: {
    name: "sessions",
    idPrefix: "ses",
    indexes: [{ name: "sessions_token_unique", fields: ["token"], unique: true }],
  },
  roles: {
    name: "roles",
    idPrefix: "rol",
    indexes: [{ name: "roles_name_unique", fields: ["name"], unique: true }],
  },
  auditLogs: {
    name: "audit_logs",
    idPrefix: "aud",
    indexes: [{ name: "audit_logs_actor", fields: ["actorId"] }],
  },
  content: {
    name: "content_items",
    idPrefix: "cnt",
    indexes: [{ name: "content_items_author", fields: ["authorId"] }],
  },
  exportJobs: {
    name: "export_jobs",
    idPrefix: "exp",
    indexes: [{ name: "export_jobs_requested_by", fields: ["requestedBy"] }],
  },
};

export const databaseMigrations = [
  {
    id: "20260614_0001_foundation_tables",
    name: "Create foundation tables",
    up(database) {
      for (const table of Object.values(databaseTables)) {
        database.createTable(table.name);
      }
    },
  },
  {
    id: "20260614_0002_lookup_indexes",
    name: "Register lookup indexes",
    up(database) {
      for (const table of Object.values(databaseTables)) {
        for (const index of table.indexes) {
          database.createIndex(table.name, index);
        }
      }
    },
  },
];

export function runMigrations(database, { now = () => new Date(), migrations = databaseMigrations } = {}) {
  database.connect?.();
  database.ensureMigrationStore();

  for (const migration of migrations) {
    if (database.hasMigration(migration.id)) continue;

    database.transaction(() => {
      migration.up(database);
      database.recordMigration({
        id: migration.id,
        name: migration.name,
        appliedAt: now().toISOString(),
      });
    });
  }

  return database.listMigrations();
}

export function createMemoryDatabase({ now = () => new Date() } = {}) {
  let state = createEmptyState();

  const adapter = {
    kind: "memory",
    connect() {
      return adapter;
    },
    ensureMigrationStore() {
      state.migrations ??= [];
    },
    hasMigration(id) {
      return state.migrations.some((migration) => migration.id === id);
    },
    recordMigration(migration) {
      state.migrations.push(clone(migration));
      return clone(migration);
    },
    listMigrations() {
      return state.migrations.map(clone);
    },
    createTable(tableName) {
      state.tables[tableName] ??= [];
    },
    createIndex(tableName, index) {
      adapter.createTable(tableName);
      const record = { tableName, ...index };
      if (!state.indexes.some((item) => item.tableName === tableName && item.name === index.name)) {
        state.indexes.push(clone(record));
      }
    },
    listIndexes() {
      return state.indexes.map(clone);
    },
    insert(tableName, record) {
      const table = requireTable(state, tableName);
      assertUniqueIndexes(state, tableName, record);
      table.push(clone(record));
      return clone(record);
    },
    get(tableName, id) {
      const record = requireTable(state, tableName).find((item) => item.id === id);
      return record ? clone(record) : null;
    },
    find(tableName, predicate) {
      const record = requireTable(state, tableName).find(predicate);
      return record ? clone(record) : null;
    },
    list(tableName, predicate = () => true) {
      return requireTable(state, tableName).filter(predicate).map(clone);
    },
    update(tableName, id, updater) {
      const table = requireTable(state, tableName);
      const index = table.findIndex((item) => item.id === id);
      assertCondition(index >= 0, "Record not found.", { code: "NOT_FOUND", status: 404, details: { tableName, id } });
      const next = typeof updater === "function" ? updater(clone(table[index])) : updater;
      assertUniqueIndexes(state, tableName, next, id);
      table[index] = clone(next);
      return clone(next);
    },
    transaction(work) {
      const before = clone(state);
      try {
        return work();
      } catch (error) {
        state = before;
        throw error;
      }
    },
    snapshot() {
      return clone(state);
    },
    now,
  };

  return adapter;
}

export function createJsonFileDatabase({ filePath, now = () => new Date() }) {
  assertCondition(typeof filePath === "string" && filePath.length > 0, "filePath is required.", {
    code: "DATABASE_CONFIG_ERROR",
    status: 500,
  });

  let connected = false;
  let state = createEmptyState();

  const adapter = {
    kind: "json-file",
    filePath,
    connect() {
      if (connected) return adapter;

      fs.mkdirSync(path.dirname(filePath), { recursive: true });
      if (fs.existsSync(filePath)) {
        state = normalizeState(readStateFile(filePath));
      } else {
        state = createEmptyState();
        persist();
      }

      connected = true;
      return adapter;
    },
    ensureMigrationStore() {
      adapter.connect();
      state.migrations ??= [];
      persist();
    },
    hasMigration(id) {
      adapter.connect();
      return state.migrations.some((migration) => migration.id === id);
    },
    recordMigration(migration) {
      adapter.connect();
      state.migrations.push(clone(migration));
      persist();
      return clone(migration);
    },
    listMigrations() {
      adapter.connect();
      return state.migrations.map(clone);
    },
    createTable(tableName) {
      adapter.connect();
      state.tables[tableName] ??= [];
      persist();
    },
    createIndex(tableName, index) {
      adapter.connect();
      adapter.createTable(tableName);
      const record = { tableName, ...index };
      if (!state.indexes.some((item) => item.tableName === tableName && item.name === index.name)) {
        state.indexes.push(clone(record));
        persist();
      }
    },
    listIndexes() {
      adapter.connect();
      return state.indexes.map(clone);
    },
    insert(tableName, record) {
      adapter.connect();
      const table = requireTable(state, tableName);
      assertUniqueIndexes(state, tableName, record);
      table.push(clone(record));
      persist();
      return clone(record);
    },
    get(tableName, id) {
      adapter.connect();
      const record = requireTable(state, tableName).find((item) => item.id === id);
      return record ? clone(record) : null;
    },
    find(tableName, predicate) {
      adapter.connect();
      const record = requireTable(state, tableName).find(predicate);
      return record ? clone(record) : null;
    },
    list(tableName, predicate = () => true) {
      adapter.connect();
      return requireTable(state, tableName).filter(predicate).map(clone);
    },
    update(tableName, id, updater) {
      adapter.connect();
      const table = requireTable(state, tableName);
      const index = table.findIndex((item) => item.id === id);
      assertCondition(index >= 0, "Record not found.", { code: "NOT_FOUND", status: 404, details: { tableName, id } });
      const next = typeof updater === "function" ? updater(clone(table[index])) : updater;
      assertUniqueIndexes(state, tableName, next, id);
      table[index] = clone(next);
      persist();
      return clone(next);
    },
    transaction(work) {
      adapter.connect();
      const before = clone(state);
      try {
        const result = work();
        persist();
        return result;
      } catch (error) {
        state = before;
        persist();
        throw error;
      }
    },
    snapshot() {
      adapter.connect();
      return clone(state);
    },
    now,
  };

  function persist() {
    fs.writeFileSync(filePath, `${JSON.stringify(state, null, 2)}\n`);
  }

  return adapter;
}

export function createSqliteDatabase({ filePath = ":memory:", now = () => new Date() } = {}) {
  const { DatabaseSync } = loadNodeSqlite();
  let connection;

  const adapter = {
    kind: "sqlite",
    filePath,
    connect() {
      if (connection) return adapter;

      if (filePath !== ":memory:") {
        fs.mkdirSync(path.dirname(filePath), { recursive: true });
      }

      connection = new DatabaseSync(filePath);
      connection.exec("PRAGMA foreign_keys = ON");
      return adapter;
    },
    close() {
      connection?.close();
      connection = undefined;
    },
    ensureMigrationStore() {
      adapter.connect();
      connection.exec(`
        CREATE TABLE IF NOT EXISTS __migrations (
          id TEXT PRIMARY KEY,
          name TEXT NOT NULL,
          applied_at TEXT NOT NULL
        );
        CREATE TABLE IF NOT EXISTS __indexes (
          name TEXT PRIMARY KEY,
          table_name TEXT NOT NULL,
          fields_json TEXT NOT NULL,
          is_unique INTEGER NOT NULL DEFAULT 0
        );
      `);
    },
    hasMigration(id) {
      adapter.ensureMigrationStore();
      return Boolean(connection.prepare("SELECT id FROM __migrations WHERE id = ?").get(id));
    },
    recordMigration(migration) {
      adapter.ensureMigrationStore();
      connection
        .prepare("INSERT INTO __migrations (id, name, applied_at) VALUES (?, ?, ?)")
        .run(migration.id, migration.name, migration.appliedAt);
      return clone(migration);
    },
    listMigrations() {
      adapter.ensureMigrationStore();
      return connection
        .prepare("SELECT id, name, applied_at AS appliedAt FROM __migrations ORDER BY id")
        .all()
        .map(clone);
    },
    createTable(tableName) {
      adapter.connect();
      connection.exec(`CREATE TABLE IF NOT EXISTS ${quoteIdentifier(tableName)} (id TEXT PRIMARY KEY, record_json TEXT NOT NULL)`);
    },
    createIndex(tableName, index) {
      adapter.ensureMigrationStore();
      adapter.createTable(tableName);
      const unique = index.unique ? "UNIQUE " : "";
      const fields = index.fields.map((field) => `json_extract(record_json, '$.${validateJsonField(field)}')`).join(", ");
      connection.exec(`CREATE ${unique}INDEX IF NOT EXISTS ${quoteIdentifier(index.name)} ON ${quoteIdentifier(tableName)} (${fields})`);
      connection
        .prepare(
          `INSERT OR IGNORE INTO __indexes (name, table_name, fields_json, is_unique)
           VALUES (?, ?, ?, ?)`,
        )
        .run(index.name, tableName, JSON.stringify(index.fields), index.unique ? 1 : 0);
    },
    listIndexes() {
      adapter.ensureMigrationStore();
      return connection
        .prepare("SELECT name, table_name AS tableName, fields_json AS fieldsJson, is_unique AS isUnique FROM __indexes ORDER BY name")
        .all()
        .map((row) => ({
          name: row.name,
          tableName: row.tableName,
          fields: JSON.parse(row.fieldsJson),
          unique: Boolean(row.isUnique),
        }));
    },
    insert(tableName, record) {
      adapter.createTable(tableName);
      assertSqlUniqueIndexes(adapter, tableName, record);
      connection.prepare(`INSERT INTO ${quoteIdentifier(tableName)} (id, record_json) VALUES (?, ?)`).run(record.id, JSON.stringify(record));
      return clone(record);
    },
    get(tableName, id) {
      adapter.createTable(tableName);
      const row = connection.prepare(`SELECT record_json AS recordJson FROM ${quoteIdentifier(tableName)} WHERE id = ?`).get(id);
      return row ? JSON.parse(row.recordJson) : null;
    },
    find(tableName, predicate) {
      return adapter.list(tableName).find(predicate) ?? null;
    },
    list(tableName, predicate = () => true) {
      adapter.createTable(tableName);
      return connection
        .prepare(`SELECT record_json AS recordJson FROM ${quoteIdentifier(tableName)} ORDER BY id`)
        .all()
        .map((row) => JSON.parse(row.recordJson))
        .filter(predicate)
        .map(clone);
    },
    update(tableName, id, updater) {
      adapter.createTable(tableName);
      const existing = adapter.get(tableName, id);
      assertCondition(existing, "Record not found.", { code: "NOT_FOUND", status: 404, details: { tableName, id } });
      const next = typeof updater === "function" ? updater(clone(existing)) : updater;
      assertSqlUniqueIndexes(adapter, tableName, next, id);
      connection.prepare(`UPDATE ${quoteIdentifier(tableName)} SET record_json = ? WHERE id = ?`).run(JSON.stringify(next), id);
      return clone(next);
    },
    transaction(work) {
      adapter.connect();
      connection.exec("BEGIN IMMEDIATE");
      try {
        const result = work();
        connection.exec("COMMIT");
        return result;
      } catch (error) {
        connection.exec("ROLLBACK");
        throw error;
      }
    },
    snapshot() {
      adapter.connect();
      const tableNames = connection
        .prepare(
          `SELECT name FROM sqlite_master
           WHERE type = 'table' AND substr(name, 1, 2) != '__' AND name NOT LIKE 'sqlite_%'
           ORDER BY name`,
        )
        .all()
        .map((row) => row.name);
      const tables = Object.fromEntries(tableNames.map((tableName) => [tableName, adapter.list(tableName)]));

      return {
        version: databaseVersion,
        migrations: adapter.listMigrations(),
        indexes: adapter.listIndexes(),
        tables,
      };
    },
    now,
  };

  return adapter;
}

export function createDatabaseRepository({ database, tableName, idPrefix, now = () => new Date(), validate }) {
  assertCondition(database, "database is required.", { code: "DATABASE_CONFIG_ERROR", status: 500 });
  assertCondition(typeof validate === "function", "validate is required.", { code: "DATABASE_CONFIG_ERROR", status: 500 });

  database.connect?.();

  return {
    create(input) {
      const timestamp = now().toISOString();
      const record = {
        id: createNextId(database, tableName, idPrefix),
        ...validate(input),
        createdAt: timestamp,
        updatedAt: timestamp,
      };
      return database.insert(tableName, record);
    },
    get(id) {
      return database.get(tableName, id);
    },
    find(predicate) {
      return database.find(tableName, predicate);
    },
    list(predicate) {
      return database.list(tableName, predicate);
    },
    update(id, patchOrUpdater) {
      const existing = database.get(tableName, id);
      assertCondition(existing, "Record not found.", { code: "NOT_FOUND", status: 404, details: { tableName, id } });
      const patch = typeof patchOrUpdater === "function" ? patchOrUpdater(clone(existing)) : patchOrUpdater;
      const updated = {
        ...existing,
        ...validate({ ...existing, ...patch }),
        id,
        updatedAt: now().toISOString(),
      };
      return database.update(tableName, id, updated);
    },
  };
}

function createEmptyState() {
  return {
    version: databaseVersion,
    migrations: [],
    indexes: [],
    tables: {},
  };
}

function readStateFile(filePath) {
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch (error) {
    throw new AppError("Database file is invalid JSON.", {
      code: "DATABASE_FILE_INVALID",
      status: 500,
      details: { filePath },
    });
  }
}

function normalizeState(input) {
  const safeInput = input && typeof input === "object" ? input : {};

  return {
    version: safeInput.version ?? databaseVersion,
    migrations: Array.isArray(safeInput.migrations) ? safeInput.migrations : [],
    indexes: Array.isArray(safeInput.indexes) ? safeInput.indexes : [],
    tables: safeInput.tables && typeof safeInput.tables === "object" ? safeInput.tables : {},
  };
}

function requireTable(state, tableName) {
  const table = state.tables[tableName];
  if (!table) {
    throw new AppError("Database table does not exist.", {
      code: "DATABASE_TABLE_MISSING",
      status: 500,
      details: { tableName },
    });
  }
  return table;
}

function assertUniqueIndexes(state, tableName, record, existingId) {
  const table = requireTable(state, tableName);
  const uniqueIndexes = state.indexes.filter((index) => index.tableName === tableName && index.unique);

  for (const index of uniqueIndexes) {
    const duplicate = table.find((item) => {
      if (item.id === existingId) return false;
      return index.fields.every((field) => item[field] === record[field]);
    });
    assertCondition(!duplicate, "Unique index violation.", {
      code: "UNIQUE_CONSTRAINT",
      status: 409,
      details: { tableName, index: index.name },
    });
  }
}

function assertSqlUniqueIndexes(database, tableName, record, existingId) {
  const uniqueIndexes = database.listIndexes().filter((index) => index.tableName === tableName && index.unique);

  for (const index of uniqueIndexes) {
    const duplicate = database.list(tableName).find((item) => {
      if (item.id === existingId) return false;
      return index.fields.every((field) => item[field] === record[field]);
    });
    assertCondition(!duplicate, "Unique index violation.", {
      code: "UNIQUE_CONSTRAINT",
      status: 409,
      details: { tableName, index: index.name },
    });
  }
}

function createNextId(database, tableName, idPrefix) {
  const max = database
    .list(tableName)
    .map((record) => String(record.id ?? "").match(new RegExp(`^${idPrefix}_(\\d+)$`)))
    .filter(Boolean)
    .map((match) => Number(match[1]))
    .reduce((highest, value) => Math.max(highest, value), 0);

  return `${idPrefix}_${String(max + 1).padStart(4, "0")}`;
}

function quoteIdentifier(identifier) {
  assertCondition(/^[A-Za-z_][A-Za-z0-9_]*$/.test(identifier), "Unsafe SQL identifier.", {
    code: "DATABASE_IDENTIFIER_INVALID",
    status: 500,
    details: { identifier },
  });
  return `"${identifier}"`;
}

function validateJsonField(field) {
  assertCondition(/^[A-Za-z_][A-Za-z0-9_]*$/.test(field), "Unsafe JSON index field.", {
    code: "DATABASE_INDEX_FIELD_INVALID",
    status: 500,
    details: { field },
  });
  return field;
}

function loadNodeSqlite() {
  try {
    return require("node:sqlite");
  } catch (error) {
    throw new AppError("node:sqlite is not available in this Node.js runtime.", {
      code: "SQLITE_UNAVAILABLE",
      status: 500,
    });
  }
}

function clone(value) {
  return structuredClone(value);
}
