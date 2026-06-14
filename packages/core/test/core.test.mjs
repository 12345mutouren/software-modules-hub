import assert from "node:assert/strict";
import { test } from "node:test";

import { AppError, createAuditLog, createMemoryRepository, createSystemClock } from "../src/index.mjs";

test("memory repository creates immutable records and updates by id", () => {
  const clock = createSystemClock();
  const users = createMemoryRepository({ idPrefix: "usr", now: () => clock.now() });

  const user = users.create({ email: "admin@example.com", roles: ["admin"] });
  user.roles.push("mutated");
  clock.advance(1000);

  const updated = users.update(user.id, { status: "active" });

  assert.equal(user.id, "usr_0001");
  assert.deepEqual(users.get(user.id).roles, ["admin"]);
  assert.equal(updated.status, "active");
  assert.notEqual(updated.createdAt, updated.updatedAt);
});

test("memory repository throws a typed error for missing records", () => {
  const users = createMemoryRepository({ idPrefix: "usr" });

  assert.throws(
    () => users.update("usr_missing", { status: "active" }),
    (error) => error instanceof AppError && error.code === "NOT_FOUND" && error.status === 404,
  );
});

test("audit log records filterable entries", () => {
  const clock = createSystemClock();
  const auditLog = createAuditLog({ now: () => clock.now() });

  auditLog.record({ actorId: "usr_0001", action: "content.reviewed", resourceType: "content", resourceId: "cnt_0001" });
  auditLog.record({ actorId: "usr_0002", action: "session.created", resourceType: "session", resourceId: "ses_0001" });

  assert.equal(auditLog.list().length, 2);
  assert.equal(auditLog.list({ actorId: "usr_0001" })[0].action, "content.reviewed");
});
