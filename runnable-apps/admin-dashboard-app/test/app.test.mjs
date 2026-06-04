import assert from "node:assert/strict";
import { test } from "node:test";

import { createAdminDashboardApp } from "../src/app.mjs";

test("admin can review content and create audit logs", () => {
  const app = createAdminDashboardApp();
  const admin = app.createUser({ email: "admin@example.com", role: "admin" });
  const user = app.createUser({ email: "user@example.com" });
  const content = app.createContent({ authorId: user.id, title: "Post", body: "Body" });

  app.reviewContent({ adminId: admin.id, contentId: content.id, decision: "approved" });

  assert.equal(content.reviewStatus, "approved");
  assert.equal(app.listAuditLogs({ adminId: admin.id }).length, 1);
});

test("normal user cannot create export", () => {
  const app = createAdminDashboardApp();
  const user = app.createUser({ email: "user@example.com" });

  assert.throws(() => app.createExport({ adminId: user.id, type: "users" }), /Admin permission required/);
});

