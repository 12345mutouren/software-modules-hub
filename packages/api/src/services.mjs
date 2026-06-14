import { assertCondition } from "../../core/src/index.mjs";
import { escapeHtml } from "../../security/src/index.mjs";

export function createAuditService({ auditRepository }) {
  return {
    record(entry) {
      return auditRepository.create(entry);
    },
    list(filter) {
      return auditRepository.list(filter);
    },
  };
}

export function createContentService({ contentRepository, auditLog }) {
  return {
    createDraft({ actor, title, body }) {
      const content = contentRepository.create({
        authorId: actor.id,
        title: escapeHtml(title),
        body: escapeHtml(body),
        reviewStatus: "pending",
      });
      auditLog.record({ actorId: actor.id, action: "content.created", resourceType: "content", resourceId: content.id });
      return content;
    },
    listVisible({ actor, readAll }) {
      return contentRepository.list((item) => readAll || item.authorId === actor.id);
    },
    review({ actor, contentId, decision }) {
      assertCondition(["approved", "rejected"].includes(decision), "decision is invalid.", {
        code: "VALIDATION_ERROR",
        status: 400,
        details: { field: "decision" },
      });
      const content = contentRepository.update(contentId, { reviewStatus: decision, reviewedBy: actor.id });
      auditLog.record({
        actorId: actor.id,
        action: `content.${decision}`,
        resourceType: "content",
        resourceId: content.id,
      });
      return content;
    },
  };
}

export function createExportService({ exportRepository, auditLog }) {
  return {
    create({ actor, type }) {
      const exportJob = exportRepository.create({ type, status: "queued", requestedBy: actor.id });
      auditLog.record({ actorId: actor.id, action: "export.created", resourceType: "export", resourceId: exportJob.id });
      return exportJob;
    },
    list() {
      return exportRepository.list();
    },
  };
}
