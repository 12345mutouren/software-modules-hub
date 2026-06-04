import assert from "node:assert/strict";
import { test } from "node:test";

import { createKnowledgeBaseApp } from "../src/app.mjs";

test("ingests documents and returns citations", () => {
  const app = createKnowledgeBaseApp();
  const workspace = app.createWorkspace({ name: "Docs", ownerId: "usr_1" });
  app.addDocument({
    workspaceId: workspace.id,
    title: "Runbook",
    content: "Backup jobs run nightly. Restore drills run monthly.",
    actorId: "usr_1",
  });

  const answer = app.ask({ workspaceId: workspace.id, question: "Backup schedule", actorId: "usr_1" });

  assert.equal(answer.answer, "Found 1 relevant chunk(s).");
  assert.equal(answer.citations.length, 1);
});

test("blocks users outside workspace", () => {
  const app = createKnowledgeBaseApp();
  const workspace = app.createWorkspace({ name: "Docs", ownerId: "usr_1" });

  assert.throws(
    () => app.addDocument({ workspaceId: workspace.id, title: "Secret", content: "Secret.", actorId: "usr_2" }),
    /Access denied/,
  );
});

