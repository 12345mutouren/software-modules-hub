export function createKnowledgeBaseApp() {
  const workspaces = [];
  const documents = [];
  const chunks = [];
  const memberships = [];

  function createWorkspace({ name, ownerId }) {
    const workspace = { id: `wks_${workspaces.length + 1}`, name, ownerId };
    workspaces.push(workspace);
    memberships.push({ workspaceId: workspace.id, userId: ownerId, role: "owner" });
    return workspace;
  }

  function addMember({ workspaceId, userId, role = "member" }) {
    requireWorkspace(workspaceId);
    memberships.push({ workspaceId, userId, role });
  }

  function addDocument({ workspaceId, title, content, actorId }) {
    requireAccess(workspaceId, actorId);
    const document = { id: `doc_${documents.length + 1}`, workspaceId, title };
    documents.push(document);
    splitIntoChunks(content).forEach((chunkText, index) => {
      chunks.push({ id: `chk_${chunks.length + 1}`, workspaceId, documentId: document.id, index, text: chunkText });
    });
    return document;
  }

  function search({ workspaceId, query, actorId }) {
    requireAccess(workspaceId, actorId);
    const normalized = query.toLowerCase();
    return chunks.filter((chunk) => chunk.workspaceId === workspaceId && chunk.text.toLowerCase().includes(normalized));
  }

  function ask({ workspaceId, question, actorId }) {
    const matches = search({ workspaceId, query: question.split(" ")[0], actorId });
    return {
      answer: matches.length > 0 ? `Found ${matches.length} relevant chunk(s).` : "No relevant context found.",
      citations: matches.map((chunk) => ({ documentId: chunk.documentId, chunkId: chunk.id })),
    };
  }

  function requireWorkspace(workspaceId) {
    const workspace = workspaces.find((item) => item.id === workspaceId);
    if (!workspace) throw new Error("Workspace not found.");
    return workspace;
  }

  function requireAccess(workspaceId, userId) {
    const membership = memberships.find((item) => item.workspaceId === workspaceId && item.userId === userId);
    if (!membership) throw new Error("Access denied.");
    return membership;
  }

  return { createWorkspace, addMember, addDocument, search, ask };
}

function splitIntoChunks(content) {
  return content
    .split(".")
    .map((part) => part.trim())
    .filter(Boolean);
}

