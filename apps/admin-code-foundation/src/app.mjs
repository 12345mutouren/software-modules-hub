import { createAuditLog, createMemoryRepository } from "../../../packages/core/src/index.mjs";
import { createAuthService } from "../../../packages/auth/src/index.mjs";
import { escapeHtml } from "../../../packages/security/src/index.mjs";

export function createAdminCodeFoundationApp({ now = () => new Date() } = {}) {
  const auditLog = createAuditLog({ now });
  const auth = createAuthService({ now, auditLog });
  const content = createMemoryRepository({ idPrefix: "cnt", now });
  const exports = createMemoryRepository({ idPrefix: "exp", now });

  function registerUser(input) {
    return auth.register(input);
  }

  function login(input) {
    return auth.login(input);
  }

  function createContent({ sessionToken, title, body }) {
    const user = auth.requirePermission(sessionToken, "content:create");
    const item = content.create({
      authorId: user.id,
      title: escapeHtml(title),
      body: escapeHtml(body),
      reviewStatus: "pending",
    });
    auditLog.record({ actorId: user.id, action: "content.created", resourceType: "content", resourceId: item.id });
    return item;
  }

  function reviewContent({ sessionToken, contentId, decision }) {
    const user = auth.requirePermission(sessionToken, "content:review");
    const item = content.update(contentId, { reviewStatus: decision, reviewedBy: user.id });
    auditLog.record({
      actorId: user.id,
      action: `content.${decision}`,
      resourceType: "content",
      resourceId: item.id,
    });
    return item;
  }

  function createExport({ sessionToken, type }) {
    const user = auth.requirePermission(sessionToken, "export:create");
    const job = exports.create({ type, status: "queued", requestedBy: user.id });
    auditLog.record({ actorId: user.id, action: "export.created", resourceType: "export", resourceId: job.id });
    return job;
  }

  function listAuditLogs({ sessionToken }) {
    auth.requirePermission(sessionToken, "audit:read");
    return auditLog.list();
  }

  return { registerUser, login, createContent, reviewContent, createExport, listAuditLogs };
}
