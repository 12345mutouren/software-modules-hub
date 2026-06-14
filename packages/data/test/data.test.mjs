import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { test } from "node:test";

import { createSystemClock } from "../../core/src/index.mjs";
import { createJsonFileDatabase } from "../../database/src/index.mjs";
import { createDataStore, dataModels, seedDefaultRoles } from "../src/index.mjs";

test("data store exposes the expected software models", () => {
  assert.deepEqual(Object.keys(dataModels), ["User", "Session", "Role", "AuditLog", "Content", "ExportJob"]);
});

test("data store creates and validates users, sessions and content", () => {
  const clock = createSystemClock();
  const store = createDataStore({ now: () => clock.now() });
  const user = store.users.create({
    email: "Admin@Example.com",
    roles: ["admin"],
    status: "active",
    passwordHash: "hash",
    passwordSalt: "salt",
  });
  const session = store.sessions.create({
    userId: user.id,
    token: "token",
    expiresAt: "2026-01-01T08:00:00.000Z",
  });
  const content = store.content.create({ authorId: user.id, title: "Post", body: "Body" });

  assert.equal(user.email, "admin@example.com");
  assert.equal(session.userId, user.id);
  assert.equal(content.reviewStatus, "pending");
});

test("repositories update records through the same validation rules", () => {
  const store = createDataStore();
  const user = store.users.create({ email: "user@example.com", roles: ["user"], status: "active" });
  const content = store.content.create({ authorId: user.id, title: "Post", body: "Body" });

  const reviewed = store.content.update(content.id, { reviewStatus: "approved", reviewedBy: user.id });

  assert.equal(reviewed.reviewStatus, "approved");
  assert.throws(() => store.content.update(content.id, { reviewStatus: "unknown" }), /reviewStatus is invalid/);
});

test("seedDefaultRoles creates role records for RBAC", () => {
  const store = createDataStore();
  const roles = seedDefaultRoles(store);
  const repeatedRoles = seedDefaultRoles(store);

  assert.equal(roles.length, 4);
  assert.equal(repeatedRoles.length, 4);
  assert.equal(store.roles.list().length, 4);
  assert.deepEqual(store.roles.find((role) => role.name === "admin").permissions, [
    "content:create",
    "content:read:all",
    "content:review",
    "export:create",
    "audit:read",
  ]);
});

test("data store can run on a durable database adapter", () => {
  const filePath = path.join(fs.mkdtempSync(path.join(os.tmpdir(), "software-modules-hub-data-")), "app.json");
  const firstStore = createDataStore({ database: createJsonFileDatabase({ filePath }) });
  const user = firstStore.users.create({
    email: "durable@example.com",
    roles: ["user"],
    status: "active",
    passwordHash: "hash",
    passwordSalt: "salt",
  });
  firstStore.content.create({ authorId: user.id, title: "Persisted", body: "Body" });

  const secondStore = createDataStore({ database: createJsonFileDatabase({ filePath }) });

  assert.equal(secondStore.users.get(user.id).email, "durable@example.com");
  assert.equal(secondStore.content.list().length, 1);
});
