import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { test } from "node:test";

import {
  createDatabaseRepository,
  createJsonFileDatabase,
  createMemoryDatabase,
  createSqliteDatabase,
  databaseTables,
  runMigrations,
} from "../src/index.mjs";

test("database migrations create foundation tables and index metadata", () => {
  const database = createMemoryDatabase();
  const applied = runMigrations(database);
  const snapshot = database.snapshot();

  assert.deepEqual(applied.map((migration) => migration.id), [
    "20260614_0001_foundation_tables",
    "20260614_0002_lookup_indexes",
  ]);
  assert.deepEqual(Object.keys(snapshot.tables), [
    "users",
    "sessions",
    "roles",
    "audit_logs",
    "content_items",
    "export_jobs",
  ]);
  assert.ok(database.listIndexes().some((index) => index.name === "users_email_unique"));
});

test("database repository creates validated records with durable ids", () => {
  const database = createMemoryDatabase();
  runMigrations(database);
  const users = createDatabaseRepository({
    database,
    tableName: databaseTables.users.name,
    idPrefix: databaseTables.users.idPrefix,
    validate: (input) => ({ email: input.email.toLowerCase(), roles: input.roles, status: input.status }),
  });

  const user = users.create({ email: "Admin@Example.com", roles: ["admin"], status: "active" });
  const updated = users.update(user.id, { status: "disabled" });

  assert.equal(user.id, "usr_0001");
  assert.equal(user.email, "admin@example.com");
  assert.equal(updated.status, "disabled");
});

test("json file database persists data across adapter instances", () => {
  const filePath = createTempDatabasePath();
  const firstDatabase = createJsonFileDatabase({ filePath });
  runMigrations(firstDatabase);
  const firstUsers = createUserRepository(firstDatabase);

  const user = firstUsers.create({ email: "persisted@example.com", roles: ["user"], status: "active" });

  const secondDatabase = createJsonFileDatabase({ filePath });
  runMigrations(secondDatabase);
  const secondUsers = createUserRepository(secondDatabase);

  assert.equal(secondUsers.get(user.id).email, "persisted@example.com");
  assert.equal(secondDatabase.listMigrations().length, 2);
});

test("sqlite database runs SQL migrations and exposes table metadata", () => {
  const database = createSqliteDatabase();

  try {
    runMigrations(database);
    const snapshot = database.snapshot();

    assert.ok(snapshot.tables.users);
    assert.ok(snapshot.tables.content_items);
    assert.ok(snapshot.indexes.some((index) => index.name === "sessions_token_unique"));
  } finally {
    database.close();
  }
});

test("sqlite database persists data across adapter instances", () => {
  const filePath = createTempDatabasePath("app.sqlite");
  const firstDatabase = createSqliteDatabase({ filePath });
  runMigrations(firstDatabase);
  const firstUsers = createUserRepository(firstDatabase);
  const user = firstUsers.create({ email: "sqlite@example.com", roles: ["user"], status: "active" });
  firstDatabase.close();

  const secondDatabase = createSqliteDatabase({ filePath });
  runMigrations(secondDatabase);
  const secondUsers = createUserRepository(secondDatabase);

  try {
    assert.equal(secondUsers.get(user.id).email, "sqlite@example.com");
    assert.equal(secondDatabase.listMigrations().length, 2);
  } finally {
    secondDatabase.close();
  }
});

test("database transactions roll back failed writes", () => {
  const database = createMemoryDatabase();
  runMigrations(database);
  const users = createUserRepository(database);

  assert.throws(
    () =>
      database.transaction(() => {
        users.create({ email: "rollback@example.com", roles: ["user"], status: "active" });
        throw new Error("stop");
      }),
    /stop/,
  );

  assert.equal(users.list().length, 0);
});

test("sqlite transactions roll back failed writes", () => {
  const database = createSqliteDatabase();
  runMigrations(database);
  const users = createUserRepository(database);

  try {
    assert.throws(
      () =>
        database.transaction(() => {
          users.create({ email: "sqlite-rollback@example.com", roles: ["user"], status: "active" });
          throw new Error("stop");
        }),
      /stop/,
    );

    assert.equal(users.list().length, 0);
  } finally {
    database.close();
  }
});

test("unique indexes reject duplicate lookup values", () => {
  const database = createMemoryDatabase();
  runMigrations(database);
  const users = createUserRepository(database);

  users.create({ email: "unique@example.com", roles: ["user"], status: "active" });

  assert.throws(
    () => users.create({ email: "unique@example.com", roles: ["admin"], status: "active" }),
    /Unique index violation/,
  );
});

test("sqlite unique indexes reject duplicate lookup values", () => {
  const database = createSqliteDatabase();
  runMigrations(database);
  const users = createUserRepository(database);

  try {
    users.create({ email: "sqlite-unique@example.com", roles: ["user"], status: "active" });

    assert.throws(
      () => users.create({ email: "sqlite-unique@example.com", roles: ["admin"], status: "active" }),
      /Unique index violation/,
    );
  } finally {
    database.close();
  }
});

test("json file database reports invalid files with a database error", () => {
  const filePath = createTempDatabasePath();
  fs.writeFileSync(filePath, "{not-json");
  const database = createJsonFileDatabase({ filePath });

  assert.throws(() => database.connect(), /Database file is invalid JSON/);
});

function createUserRepository(database) {
  return createDatabaseRepository({
    database,
    tableName: databaseTables.users.name,
    idPrefix: databaseTables.users.idPrefix,
    validate: (input) => ({ email: input.email, roles: input.roles, status: input.status }),
  });
}

function createTempDatabasePath(fileName = "app.json") {
  return path.join(fs.mkdtempSync(path.join(os.tmpdir(), "software-modules-hub-db-")), fileName);
}
