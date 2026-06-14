import assert from "node:assert/strict";
import { test } from "node:test";

import { createAdminCodeFoundationApp } from "../src/app.mjs";

test("admin code foundation runs register, login, review, export and audit flow", () => {
  const app = createAdminCodeFoundationApp();
  app.registerUser({ email: "admin@example.com", password: "StrongPass123", roles: ["admin"] });
  app.registerUser({ email: "writer@example.com", password: "StrongPass123" });

  const adminLogin = app.login({ email: "admin@example.com", password: "StrongPass123" });
  const writerLogin = app.login({ email: "writer@example.com", password: "StrongPass123" });
  const draft = app.createContent({
    sessionToken: writerLogin.session.token,
    title: "<script>bad()</script>Launch Note",
    body: "Body",
  });
  const reviewed = app.reviewContent({ sessionToken: adminLogin.session.token, contentId: draft.id, decision: "approved" });
  const exportJob = app.createExport({ sessionToken: adminLogin.session.token, type: "content" });
  const auditLogs = app.listAuditLogs({ sessionToken: adminLogin.session.token });

  assert.equal(reviewed.reviewStatus, "approved");
  assert.equal(exportJob.status, "queued");
  assert.match(draft.title, /&lt;script&gt;/);
  assert.deepEqual(
    auditLogs.map((entry) => entry.action),
    ["user.registered", "user.registered", "session.created", "session.created", "content.created", "content.approved", "export.created"],
  );
});

test("normal user cannot review content, export data or read audit logs", () => {
  const app = createAdminCodeFoundationApp();
  app.registerUser({ email: "writer@example.com", password: "StrongPass123" });
  const writerLogin = app.login({ email: "writer@example.com", password: "StrongPass123" });
  const draft = app.createContent({ sessionToken: writerLogin.session.token, title: "Post", body: "Body" });

  assert.throws(
    () => app.reviewContent({ sessionToken: writerLogin.session.token, contentId: draft.id, decision: "approved" }),
    /Permission denied/,
  );
  assert.throws(() => app.createExport({ sessionToken: writerLogin.session.token, type: "users" }), /Permission denied/);
  assert.throws(() => app.listAuditLogs({ sessionToken: writerLogin.session.token }), /Permission denied/);
});

test("invalid password does not create a session", () => {
  const app = createAdminCodeFoundationApp();
  app.registerUser({ email: "user@example.com", password: "StrongPass123" });

  assert.throws(() => app.login({ email: "user@example.com", password: "WrongPass123" }), /Invalid credentials/);
});
