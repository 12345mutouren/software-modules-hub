const tokenKey = "softwareModulesAdminToken";
const state = {
  token: localStorage.getItem(tokenKey),
  user: null,
  content: [],
  exportJobs: [],
  auditLogs: [],
};

const els = {
  session: document.querySelector("#sessionLabel"),
  output: document.querySelector("#output"),
  loginForm: document.querySelector("#loginForm"),
  contentForm: document.querySelector("#contentForm"),
  exportForm: document.querySelector("#exportForm"),
  contentList: document.querySelector("#contentList"),
  exportList: document.querySelector("#exportList"),
  auditList: document.querySelector("#auditList"),
  refreshButton: document.querySelector("#refreshButton"),
  quickAdmin: document.querySelector("#quickAdmin"),
  quickWriter: document.querySelector("#quickWriter"),
  logoutButton: document.querySelector("#logoutButton"),
};

function print(payload) {
  els.output.textContent = JSON.stringify(payload, null, 2);
}

async function api(path, { method = "GET", body } = {}) {
  const response = await fetch(`/api${path}`, {
    method,
    headers: {
      "content-type": "application/json",
      ...(state.token ? { authorization: `Bearer ${state.token}` } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  const payload = await response.json();

  if (!response.ok) {
    print(payload);
    throw payload;
  }

  print(payload);
  return payload;
}

function formData(form) {
  return Object.fromEntries(new FormData(form).entries());
}

async function login(email, password) {
  const payload = await api("/auth/login", { method: "POST", body: { email, password } });
  state.token = payload.session.token;
  localStorage.setItem(tokenKey, state.token);
  await refreshAll();
}

function setLoginForm(email, password) {
  els.loginForm.elements.email.value = email;
  els.loginForm.elements.password.value = password;
}

async function refreshSession() {
  if (!state.token) {
    state.user = null;
    els.session.textContent = "未登录";
    return;
  }

  try {
    const payload = await api("/me");
    state.user = payload.user;
    els.session.textContent = `${payload.user.email} · ${payload.user.roles.join(", ")}`;
  } catch {
    state.token = null;
    localStorage.removeItem(tokenKey);
    els.session.textContent = "未登录";
  }
}

async function refreshContent() {
  if (!state.token) {
    state.content = [];
    renderContent();
    return;
  }

  try {
    const payload = await api("/content");
    state.content = payload.content;
  } catch {
    state.content = [];
  }
  renderContent();
}

async function refreshExports() {
  if (!state.token) {
    state.exportJobs = [];
    renderExports();
    return;
  }

  try {
    const payload = await api("/exports");
    state.exportJobs = payload.exportJobs;
  } catch {
    state.exportJobs = [];
  }
  renderExports();
}

async function refreshAuditLogs() {
  if (!state.token) {
    state.auditLogs = [];
    renderAuditLogs();
    return;
  }

  try {
    const payload = await api("/audit-logs");
    state.auditLogs = payload.auditLogs;
  } catch {
    state.auditLogs = [];
  }
  renderAuditLogs();
}

async function refreshAll() {
  await refreshSession();
  await refreshContent();
  await refreshExports();
  await refreshAuditLogs();
}

function renderContent() {
  if (!state.content.length) {
    els.contentList.innerHTML = `<div class="row"><div><strong>暂无内容</strong><small>登录后会显示可访问内容。</small></div></div>`;
    return;
  }

  els.contentList.innerHTML = state.content.map((item) => {
    const canReview = state.user?.roles.includes("admin") && item.reviewStatus === "pending";
    return `<div class="row ${item.reviewStatus}">
      <div>
        <strong>${item.title}</strong>
        <small>${item.reviewStatus} · ${item.id} · ${item.body}</small>
      </div>
      <div class="row-actions">
        ${canReview ? `<button class="secondary" data-review="approved" data-id="${item.id}" type="button">通过</button><button class="danger" data-review="rejected" data-id="${item.id}" type="button">拒绝</button>` : ""}
      </div>
    </div>`;
  }).join("");
}

function renderExports() {
  if (!state.exportJobs.length) {
    els.exportList.innerHTML = `<div class="row"><div><strong>暂无导出任务</strong><small>管理员创建导出后会显示在这里。</small></div></div>`;
    return;
  }

  els.exportList.innerHTML = state.exportJobs.map((job) => `<div class="row">
    <div>
      <strong>${job.type}</strong>
      <small>${job.status} · ${job.id} · requested by ${job.requestedBy}</small>
    </div>
  </div>`).join("");
}

function renderAuditLogs() {
  if (!state.auditLogs.length) {
    els.auditList.innerHTML = `<div class="row"><div><strong>暂无审计日志</strong><small>管理员登录后会显示操作记录。</small></div></div>`;
    return;
  }

  els.auditList.innerHTML = state.auditLogs.slice().reverse().map((entry) => `<div class="row">
    <div>
      <strong>${entry.action}</strong>
      <small>${entry.actorId} · ${entry.resourceType}:${entry.resourceId} · ${entry.createdAt}</small>
    </div>
  </div>`).join("");
}

els.loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const data = formData(event.currentTarget);
  await login(data.email, data.password).catch(() => {});
});

els.contentForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  await api("/content", { method: "POST", body: formData(event.currentTarget) }).catch(() => {});
  await refreshAll();
});

els.exportForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  await api("/exports", { method: "POST", body: formData(event.currentTarget) }).catch(() => {});
  await refreshAll();
});

els.contentList.addEventListener("click", async (event) => {
  const button = event.target.closest("[data-review]");
  if (!button) return;
  await api(`/content/${button.dataset.id}/review`, {
    method: "POST",
    body: { decision: button.dataset.review },
  }).catch(() => {});
  await refreshAll();
});

els.quickAdmin.addEventListener("click", () => {
  setLoginForm("admin@example.com", "StrongPass123");
  login("admin@example.com", "StrongPass123").catch(() => {});
});
els.quickWriter.addEventListener("click", () => {
  setLoginForm("writer@example.com", "StrongPass123");
  login("writer@example.com", "StrongPass123").catch(() => {});
});
els.refreshButton.addEventListener("click", () => refreshAll().catch(() => {}));
els.logoutButton.addEventListener("click", () => {
  state.token = null;
  state.user = null;
  localStorage.removeItem(tokenKey);
  refreshAll().catch(() => {});
});

refreshAll().catch((error) => print(error));
