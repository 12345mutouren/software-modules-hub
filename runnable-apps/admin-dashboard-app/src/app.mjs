export function createAdminDashboardApp() {
  const users = [];
  const contentItems = [];
  const auditLogs = [];
  const exports = [];

  function createUser({ email, role = "user", status = "active" }) {
    const user = { id: `usr_${users.length + 1}`, email, role, status };
    users.push(user);
    return user;
  }

  function createContent({ authorId, title, body }) {
    const content = { id: `cnt_${contentItems.length + 1}`, authorId, title, body, reviewStatus: "pending" };
    contentItems.push(content);
    return content;
  }

  function reviewContent({ adminId, contentId, decision }) {
    requireAdmin(adminId);
    const content = contentItems.find((item) => item.id === contentId);
    if (!content) throw new Error("Content not found.");
    content.reviewStatus = decision;
    auditLogs.push({ actorId: adminId, action: `content.${decision}`, resourceId: contentId });
    return content;
  }

  function createExport({ adminId, type }) {
    requireAdmin(adminId);
    const exportJob = { id: `exp_${exports.length + 1}`, type, status: "queued" };
    exports.push(exportJob);
    auditLogs.push({ actorId: adminId, action: "export.created", resourceId: exportJob.id });
    return exportJob;
  }

  function listAuditLogs({ adminId }) {
    requireAdmin(adminId);
    return [...auditLogs];
  }

  function requireAdmin(userId) {
    const user = users.find((item) => item.id === userId);
    if (!user || !["admin", "super_admin"].includes(user.role)) {
      throw new Error("Admin permission required.");
    }
    return user;
  }

  return { createUser, createContent, reviewContent, createExport, listAuditLogs };
}

