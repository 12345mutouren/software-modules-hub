import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const moduleChoices = [
  ["产品层", "明确目标用户、核心任务、主流程和成功指标"],
  ["账号系统", "支持邮箱密码登录、角色权限、密码重置和登录审计"],
  ["数据库层", "PostgreSQL 存业务数据，Redis 存会话、验证码、限流和热点数据"],
  ["后端系统", "REST API、输入校验、权限校验、文件处理、通知和定时任务"],
  ["前端/客户端", "Web 主应用加管理后台，按需要扩展移动端或桌面端"],
  ["安全", "密码哈希、CSRF/XSS/SQL 注入防护、限流、审计日志和隐私流程"],
  ["运维部署", "Docker Compose 本地环境、生产环境变量、备份、监控和回滚"],
  ["测试", "单元测试、接口测试、权限测试、页面测试、安全测试和性能冒烟测试"],
  ["商业/运营功能", "按产品类型选择支付、会员、订单、客服、内容审核、数据统计"],
  ["文档", "产品说明、API 文档、数据库结构、部署文档、管理员手册和 FAQ"],
];

const sharedTables = [
  ["users", "用户账号", "id, email, password_hash, display_name, status, created_at"],
  ["roles", "角色", "id, key, name, description"],
  ["permissions", "权限", "id, key, description"],
  ["user_roles", "用户角色关系", "user_id, role_id, scope_type, scope_id"],
  ["sessions", "登录会话", "id, user_id, token_hash, ip_address, user_agent, expires_at"],
  ["audit_logs", "操作审计", "id, actor_id, action, resource_type, resource_id, metadata, created_at"],
  ["files", "文件对象", "id, owner_id, storage_key, mime_type, byte_size, created_at"],
];

export const presets = {
  "saas-subscription": {
    title: "SaaS Subscription Starter",
    productGoal: "为企业或个人用户提供订阅制在线工具，支持团队协作、套餐、账单和使用量统计。",
    users: ["游客", "普通用户", "团队管理员", "账单管理员", "平台管理员", "客服"],
    features: ["开放注册", "团队空间", "成员邀请", "订阅套餐", "发票记录", "使用量统计", "后台管理"],
    pages: ["首页", "登录页", "注册页", "工作台", "团队设置", "账单页", "管理员后台"],
    businessTables: [
      ["organizations", "团队或企业空间", "id, name, owner_id, plan_key, status, created_at"],
      ["memberships", "团队成员关系", "id, organization_id, user_id, role, invited_by, joined_at"],
      ["subscriptions", "订阅", "id, organization_id, plan_key, status, current_period_end"],
      ["invoices", "发票和账单", "id, organization_id, amount_cents, currency, status, issued_at"],
      ["usage_events", "使用量事件", "id, organization_id, metric_key, quantity, occurred_at"],
    ],
    resources: ["organization", "member", "subscription", "invoice", "usage_report"],
    metrics: ["注册转化率", "激活团队数", "付费转化率", "MRR", "流失率"],
    risks: ["套餐和权限耦合过深", "账单状态与业务权限不同步", "免费试用滥用", "使用量统计延迟"],
  },
  "admin-dashboard": {
    title: "Admin Dashboard Starter",
    productGoal: "为运营、客服和管理员提供集中管理后台，支持用户、内容、权限、审计和数据统计。",
    users: ["管理员", "超级管理员", "运营", "客服", "只读审计员"],
    features: ["用户管理", "内容管理", "权限管理", "操作日志", "数据统计", "导出报表"],
    pages: ["登录页", "总览仪表盘", "用户列表", "内容列表", "权限设置", "审计日志", "系统设置"],
    businessTables: [
      ["managed_users", "被管理用户快照", "id, email, status, segment, last_active_at"],
      ["content_items", "内容项", "id, author_id, title, status, review_status, published_at"],
      ["moderation_notes", "审核备注", "id, content_id, reviewer_id, note, created_at"],
      ["dashboard_widgets", "仪表盘组件", "id, key, title, config_json, enabled"],
      ["exports", "导出任务", "id, requester_id, type, status, file_id, created_at"],
    ],
    resources: ["managed_user", "content_item", "permission", "audit_log", "export"],
    metrics: ["待处理数量", "处理时长", "客服响应时间", "导出成功率", "管理员活跃度"],
    risks: ["后台越权", "批量操作误伤", "敏感数据导出失控", "审计日志不足"],
  },
  ecommerce: {
    title: "Ecommerce Starter",
    productGoal: "搭建支持商品、购物车、订单、支付、优惠券、发货和售后的电商系统。",
    users: ["游客", "买家", "会员", "商家", "客服", "运营", "管理员"],
    features: ["商品浏览", "搜索筛选", "购物车", "下单支付", "优惠券", "物流跟踪", "售后退款"],
    pages: ["首页", "商品列表", "商品详情", "购物车", "结算页", "订单中心", "运营后台"],
    businessTables: [
      ["products", "商品", "id, title, sku, price_cents, stock_quantity, status"],
      ["carts", "购物车", "id, user_id, status, updated_at"],
      ["cart_items", "购物车明细", "cart_id, product_id, quantity, unit_price_cents"],
      ["orders", "订单", "id, user_id, status, total_cents, payment_status, created_at"],
      ["payments", "支付记录", "id, order_id, provider, provider_ref, status, paid_at"],
      ["shipments", "物流", "id, order_id, carrier, tracking_number, status"],
      ["coupons", "优惠券", "id, code, discount_type, value, expires_at"],
    ],
    resources: ["product", "cart", "order", "payment", "shipment", "coupon"],
    metrics: ["下单转化率", "支付成功率", "客单价", "退款率", "库存周转"],
    risks: ["库存超卖", "支付回调重复", "优惠券滥用", "订单状态机混乱"],
  },
  "content-community": {
    title: "Content Community Starter",
    productGoal: "建设内容社区，支持发布、互动、搜索、举报、审核和社区运营。",
    users: ["游客", "注册用户", "创作者", "版主", "运营", "管理员"],
    features: ["发帖", "评论", "点赞收藏", "关注", "全文搜索", "举报", "内容审核"],
    pages: ["首页信息流", "内容详情", "发布页", "个人主页", "搜索页", "审核后台", "社区设置"],
    businessTables: [
      ["posts", "帖子", "id, author_id, title, body, status, published_at"],
      ["comments", "评论", "id, post_id, author_id, parent_id, body, status"],
      ["reactions", "互动", "id, user_id, target_type, target_id, reaction_type"],
      ["follows", "关注关系", "follower_id, following_id, created_at"],
      ["reports", "举报", "id, reporter_id, target_type, target_id, reason, status"],
      ["moderation_cases", "审核案件", "id, target_type, target_id, reviewer_id, decision, created_at"],
    ],
    resources: ["post", "comment", "reaction", "report", "moderation_case"],
    metrics: ["日活用户", "发布量", "互动率", "举报处理时长", "内容通过率"],
    risks: ["内容审核压力", "垃圾内容和刷量", "社区规则不清", "搜索结果质量不稳定"],
  },
  "ai-knowledge-base": {
    title: "AI Knowledge Base Starter",
    productGoal: "构建 AI 知识库，支持文档上传、切片、向量检索、对话问答、引用和权限隔离。",
    users: ["游客", "知识库成员", "知识库管理员", "企业管理员", "客服", "审计员"],
    features: ["文档上传", "知识库管理", "文本切片", "向量检索", "对话问答", "引用溯源", "权限隔离"],
    pages: ["登录页", "知识库列表", "文档管理", "对话页", "引用详情", "成员设置", "管理员后台"],
    businessTables: [
      ["workspaces", "知识库空间", "id, name, owner_id, visibility, created_at"],
      ["documents", "文档", "id, workspace_id, file_id, title, status, indexed_at"],
      ["document_chunks", "文档切片", "id, document_id, chunk_index, content, token_count"],
      ["embeddings", "向量索引引用", "id, chunk_id, provider, vector_ref, created_at"],
      ["conversations", "对话", "id, workspace_id, user_id, title, created_at"],
      ["messages", "消息", "id, conversation_id, role, content, created_at"],
      ["citations", "引用", "id, message_id, chunk_id, score"],
    ],
    resources: ["workspace", "document", "chunk", "conversation", "message", "citation"],
    metrics: ["文档索引成功率", "检索命中率", "回答采纳率", "平均响应时间", "引用覆盖率"],
    risks: ["幻觉回答", "权限泄露", "向量库成本", "文档解析失败", "引用不准确"],
  },
  "enterprise-internal-tool": {
    title: "Enterprise Internal Tool Starter",
    productGoal: "为企业内部流程提供申请、审批、资产、任务、报表和权限管理能力。",
    users: ["员工", "直属主管", "审批人", "财务", "IT 管理员", "企业管理员", "审计员"],
    features: ["员工目录", "申请单", "审批流", "资产管理", "任务分派", "报表导出", "审计追踪"],
    pages: ["登录页", "工作台", "申请中心", "审批中心", "资产台账", "报表页", "系统管理"],
    businessTables: [
      ["departments", "部门", "id, name, parent_id, manager_id"],
      ["requests", "申请单", "id, requester_id, type, status, submitted_at"],
      ["approvals", "审批记录", "id, request_id, approver_id, decision, decided_at"],
      ["assets", "资产", "id, code, name, owner_id, status, purchased_at"],
      ["tasks", "任务", "id, assignee_id, title, status, due_at"],
      ["reports", "报表", "id, owner_id, type, status, file_id, created_at"],
    ],
    resources: ["department", "request", "approval", "asset", "task", "report"],
    metrics: ["申请处理时长", "审批通过率", "资产闲置率", "任务逾期率", "报表生成成功率"],
    risks: ["审批链配置错误", "内部数据越权", "旧系统集成复杂", "审计记录缺失"],
  },
};

const outputFiles = [
  "README.md",
  "docs/product-brief.md",
  "docs/module-selection.md",
  "docs/permission-matrix.md",
  "docs/data-model.md",
  "docs/api-contract.md",
  "docs/security-review.md",
  "docs/test-plan.md",
  "docs/launch-plan.md",
  "docs/risk-register.md",
];

export function listStarterTypes() {
  return Object.keys(presets);
}

export function generateStarter({ type, outDir, force = false, generatedAt = currentDate(), includeCode = false }) {
  if (!type || !presets[type]) {
    throw new Error(`Unknown starter type: ${type || "(missing)"}`);
  }

  if (!outDir) {
    throw new Error("Missing output directory.");
  }

  const preset = presets[type];
  const absoluteOutDir = path.resolve(outDir);
  assertWritableOutput(absoluteOutDir, force);

  const files = buildFiles(type, preset, generatedAt, includeCode);
  for (const [filePath, content] of Object.entries(files)) {
    const target = path.join(absoluteOutDir, filePath);
    fs.mkdirSync(path.dirname(target), { recursive: true });
    fs.writeFileSync(target, `${content.trimEnd()}\n`, "utf8");
  }

  return {
    type,
    title: preset.title,
    outDir: absoluteOutDir,
    files: Object.keys(files),
  };
}

function assertWritableOutput(outDir, force) {
  if (!fs.existsSync(outDir)) {
    return;
  }

  const existingFiles = fs.readdirSync(outDir);
  if (existingFiles.length > 0 && !force) {
    throw new Error(`Output directory is not empty: ${outDir}. Use --force to overwrite starter files.`);
  }
}

function currentDate() {
  return new Date().toISOString().slice(0, 10);
}

function buildFiles(type, preset, generatedAt, includeCode) {
  const files = {
    "README.md": renderReadme(type, preset, generatedAt, includeCode),
    "docs/product-brief.md": renderProductBrief(preset),
    "docs/module-selection.md": renderModuleSelection(preset),
    "docs/permission-matrix.md": renderPermissionMatrix(preset),
    "docs/data-model.md": renderDataModel(preset),
    "docs/api-contract.md": renderApiContract(preset),
    "docs/security-review.md": renderSecurityReview(preset),
    "docs/test-plan.md": renderTestPlan(preset),
    "docs/launch-plan.md": renderLaunchPlan(preset),
    "docs/risk-register.md": renderRiskRegister(preset),
  };

  if (includeCode) {
    Object.assign(files, buildCodeScaffoldFiles(type, preset));
  }

  return files;
}

function renderReadme(type, preset, generatedAt, includeCode) {
  return `# ${preset.title}

Generated: ${generatedAt}

Starter type: \`${type}\`

## Product Goal

${preset.productGoal}

## Core Users

${bulletList(preset.users)}

## Core Features

${bulletList(preset.features)}

## Generated Files

${bulletList(outputFiles.filter((file) => file !== "README.md"))}

## First Implementation Order

1. Confirm product brief.
2. Review module choices.
3. Finalize permission matrix.
4. Turn data model into migrations.
5. Turn API contract into routes and tests.
6. Run security review before launch.
7. Complete test plan and launch plan.
${includeCode ? `
## Code Scaffold

This starter includes a dependency-free Node.js scaffold:

- \`package.json\`
- \`src/app.mjs\`
- \`src/store.mjs\`
- \`test/app.test.mjs\`
- \`.env.example\`
- \`docker-compose.yml\`

Run:

\`\`\`bash
npm test
\`\`\`
` : ""}
`;
}

function renderProductBrief(preset) {
  return `# Product Brief

## Goal

${preset.productGoal}

## Target Users

${bulletList(preset.users)}

## Core Features

${bulletList(preset.features)}

## Primary Pages

${bulletList(preset.pages)}

## Success Metrics

${bulletList(preset.metrics)}

## Main Flow

1. User enters the product.
2. User registers or logs in.
3. User completes the core task.
4. System records the action and audit trail.
5. User returns through notification, dashboard, report or billing flow.
`;
}

function renderModuleSelection(preset) {
  const rows = moduleChoices
    .map(([moduleName, recommendation]) => `| ${moduleName} | ${recommendation} |`)
    .join("\n");

  return `# Module Selection

| Module | Recommended Starting Point |
| --- | --- |
${rows}

## Product-Specific Notes

- Business objects: ${preset.resources.join(", ")}.
- Business metrics: ${preset.metrics.join(", ")}.
- Highest risks: ${preset.risks.slice(0, 3).join(", ")}.
`;
}

function renderPermissionMatrix(preset) {
  const roles = preset.users.slice(-4);
  const rows = preset.resources
    .map((resource) => {
      const permissions = roles.map((role, index) => {
        if (index === 0) return "read own";
        if (index === roles.length - 1) return "full access";
        return "read, update";
      });
      return `| ${resource} | ${permissions.join(" | ")} |`;
    })
    .join("\n");

  return `# Permission Matrix

| Resource | ${roles.join(" | ")} |
| --- | ${roles.map(() => "---").join(" | ")} |
${rows}

## Required Rules

- Default deny for every protected resource.
- User can only access scoped data unless an admin role grants broader access.
- Sensitive exports require audit logging.
- Destructive actions require confirmation and audit trail.
`;
}

function renderDataModel(preset) {
  const rows = [...sharedTables, ...preset.businessTables]
    .map(([table, purpose, fields]) => `| ${table} | ${purpose} | ${fields} |`)
    .join("\n");

  return `# Data Model

## Tables

| Table | Purpose | Suggested Fields |
| --- | --- | --- |
${rows}

## Data Rules

- Use stable IDs for all primary entities.
- Add \`created_at\` and \`updated_at\` to mutable tables.
- Keep audit logs append-only.
- Store files in object storage and keep metadata in the database.
- Add indexes for owner, status, created time and lookup keys.
`;
}

function renderApiContract(preset) {
  const baseEndpoints = [
    ["POST", "/api/auth/register", "Create user account"],
    ["POST", "/api/auth/login", "Create session"],
    ["POST", "/api/auth/logout", "Destroy session"],
    ["GET", "/api/me", "Read current user"],
    ["GET", "/api/audit-logs", "Read scoped audit logs"],
  ];

  const resourceEndpoints = preset.resources.flatMap((resource) => [
    ["GET", `/api/${resource}s`, `List ${resource}`],
    ["POST", `/api/${resource}s`, `Create ${resource}`],
    ["GET", `/api/${resource}s/:id`, `Read ${resource}`],
    ["PATCH", `/api/${resource}s/:id`, `Update ${resource}`],
  ]);

  const rows = [...baseEndpoints, ...resourceEndpoints]
    .map(([method, route, description]) => `| ${method} | ${route} | ${description} |`)
    .join("\n");

  return `# API Contract

| Method | Route | Description |
| --- | --- | --- |
${rows}

## API Rules

- Validate every request body and query parameter.
- Return consistent error objects.
- Check authentication before business logic.
- Check authorization before reading or mutating scoped data.
- Add idempotency keys to payment, order, import and batch APIs.
`;
}

function renderSecurityReview(preset) {
  return `# Security Review

## Authentication

- Passwords must be hashed, never stored in plain text.
- Sessions must expire and support revocation.
- Password reset and invitation links must be single-use and time-limited.

## Authorization

- Protected resources: ${preset.resources.join(", ")}.
- Enforce scoped access on every list, read, update and delete operation.
- Log role changes, exports and destructive actions.

## Attack Protection

- Add rate limits for login, registration, password reset and expensive APIs.
- Escape user-generated content.
- Use CSRF protection for cookie-based sessions.
- Use parameterized queries or ORM-safe query builders.

## Privacy

- Provide user data export and deletion flows when applicable.
- Minimize stored personal data.
- Keep audit logs useful without storing secrets or raw credentials.
`;
}

function renderTestPlan(preset) {
  return `# Test Plan

## Unit Tests

- Validate input rules.
- Validate permission helpers.
- Validate state transitions for ${preset.resources.slice(0, 3).join(", ")}.

## API Tests

- Registration, login, logout and current user.
- CRUD for ${preset.resources.join(", ")}.
- Unauthorized user cannot access protected resources.
- User cannot access another user's scoped data.

## Page Tests

- Primary pages: ${preset.pages.join(", ")}.
- Form validation.
- Loading and error states.
- Empty states and pagination.

## Security Tests

- SQL injection attempts are rejected or safely handled.
- XSS payloads do not execute.
- CSRF token is required for state-changing requests.
- Rate limits block repeated login failures.

## Performance Smoke Tests

- List endpoints stay responsive with realistic page sizes.
- Search, export and report flows have bounded execution time.
`;
}

function renderLaunchPlan(preset) {
  return `# Launch Plan

## Environments

- Local development.
- Test or staging.
- Production.

## Pre-Launch

- Confirm domain and HTTPS.
- Confirm environment variables and secrets.
- Run database migrations.
- Verify backup and restore.
- Run full test plan.
- Review security checklist.

## Launch

- Deploy backend and frontend.
- Run smoke tests.
- Verify core pages: ${preset.pages.slice(0, 5).join(", ")}.
- Monitor errors, latency and business events.

## Rollback

- Keep previous release available.
- Record migration rollback steps.
- Preserve user data before reverting.
- Communicate incident status if users are affected.
`;
}

function renderRiskRegister(preset) {
  const rows = preset.risks
    .map((risk) => `| ${risk} | Medium | High | Add owner, detection signal and mitigation before launch |`)
    .join("\n");

  return `# Risk Register

| Risk | Probability | Impact | Mitigation |
| --- | --- | --- | --- |
${rows}

## Review Cadence

- Review risks before first implementation sprint.
- Review again before launch.
- Move unresolved high-impact risks into the project backlog.
`;
}

function buildCodeScaffoldFiles(type, preset) {
  return {
    "package.json": renderCodePackageJson(type),
    ".env.example": renderCodeEnvExample(),
    "docker-compose.yml": renderCodeDockerCompose(),
    "src/app.mjs": renderCodeApp(type, preset),
    "src/store.mjs": renderCodeStore(),
    "test/app.test.mjs": renderCodeTest(preset),
  };
}

function renderCodePackageJson(type) {
  return JSON.stringify({
    name: `${type}-starter`,
    version: "0.1.0",
    private: true,
    type: "module",
    scripts: {
      test: "node --test",
    },
  }, null, 2);
}

function renderCodeEnvExample() {
  return `NODE_ENV=development
DATABASE_URL=postgres://app:app_password@localhost:5432/app
SESSION_SECRET=replace-with-local-secret
PUBLIC_URL=http://localhost:3000
`;
}

function renderCodeDockerCompose() {
  return `services:
  postgres:
    image: postgres:16
    environment:
      POSTGRES_USER: app
      POSTGRES_PASSWORD: app_password
      POSTGRES_DB: app
    ports:
      - "5432:5432"
`;
}

function renderCodeApp(type, preset) {
  const resources = JSON.stringify(preset.resources);
  const metrics = JSON.stringify(preset.metrics);

  return `import { createStore } from "./store.mjs";

export const starterType = ${JSON.stringify(type)};
export const resources = ${resources};
export const metrics = ${metrics};

export function createApp() {
  const store = createStore();

  function health() {
    return {
      status: "ok",
      starterType,
      resources,
    };
  }

  function createResource({ type, ownerId, data }) {
    if (!resources.includes(type)) {
      throw new Error("Unknown resource type.");
    }

    return store.insert(type, {
      ownerId,
      data,
      status: "active",
    });
  }

  function listOwnResources({ type, ownerId }) {
    return store.where(type, "ownerId", ownerId);
  }

  function canRead(user, record) {
    return user.role === "admin" || record.ownerId === user.id;
  }

  return {
    health,
    createResource,
    listOwnResources,
    canRead,
  };
}
`;
}

function renderCodeStore() {
  return `export function createStore() {
  const tables = new Map();

  function insert(tableName, row) {
    const rows = table(tableName);
    const nextRow = {
      ...row,
      id: row.id || \`\${tableName}_\${rows.length + 1}\`,
      createdAt: row.createdAt || new Date().toISOString(),
    };
    rows.push(nextRow);
    return nextRow;
  }

  function where(tableName, field, value) {
    return table(tableName).filter((row) => row[field] === value);
  }

  function table(tableName) {
    if (!tables.has(tableName)) {
      tables.set(tableName, []);
    }
    return tables.get(tableName);
  }

  return {
    insert,
    where,
  };
}
`;
}

function renderCodeTest(preset) {
  const firstResource = preset.resources[0];

  return `import assert from "node:assert/strict";
import { test } from "node:test";

import { createApp, resources } from "../src/app.mjs";

test("health exposes starter resources", () => {
  const app = createApp();
  const health = app.health();

  assert.equal(health.status, "ok");
  assert.deepEqual(health.resources, resources);
});

test("user can create and list own resource", () => {
  const app = createApp();
  const record = app.createResource({
    type: ${JSON.stringify(firstResource)},
    ownerId: "usr_1",
    data: { name: "Example" },
  });

  const ownRecords = app.listOwnResources({
    type: ${JSON.stringify(firstResource)},
    ownerId: "usr_1",
  });

  assert.equal(record.ownerId, "usr_1");
  assert.equal(ownRecords.length, 1);
});

test("permission helper allows owner or admin", () => {
  const app = createApp();
  const record = app.createResource({
    type: ${JSON.stringify(firstResource)},
    ownerId: "usr_1",
    data: {},
  });

  assert.equal(app.canRead({ id: "usr_1", role: "user" }, record), true);
  assert.equal(app.canRead({ id: "usr_2", role: "user" }, record), false);
  assert.equal(app.canRead({ id: "usr_2", role: "admin" }, record), true);
});
`;
}

function bulletList(items) {
  return items.map((item) => `- ${item}`).join("\n");
}

function parseArgs(args) {
  const parsed = {
    type: "",
    outDir: "",
    force: false,
    includeCode: false,
    list: false,
    help: false,
  };

  for (let index = 0; index < args.length; index += 1) {
    const arg = args[index];

    if (arg === "--help" || arg === "-h") {
      parsed.help = true;
    } else if (arg === "--list") {
      parsed.list = true;
    } else if (arg === "--force") {
      parsed.force = true;
    } else if (arg === "--with-code") {
      parsed.includeCode = true;
    } else if (arg === "--type") {
      parsed.type = args[index + 1] || "";
      index += 1;
    } else if (arg.startsWith("--type=")) {
      parsed.type = arg.slice("--type=".length);
    } else if (arg === "--out") {
      parsed.outDir = args[index + 1] || "";
      index += 1;
    } else if (arg.startsWith("--out=")) {
      parsed.outDir = arg.slice("--out=".length);
    } else {
      throw new Error(`Unknown argument: ${arg}`);
    }
  }

  return parsed;
}

function renderHelp() {
  return `Usage:
  node starter-generator/create-starter.mjs --list
  node starter-generator/create-starter.mjs --type saas-subscription --out ./generated/my-saas
  node starter-generator/create-starter.mjs --type saas-subscription --out ./generated/my-saas --with-code
  node starter-generator/create-starter.mjs --type ecommerce --out ./generated/shop --force

Available types:
${listStarterTypes().map((type) => `  - ${type}`).join("\n")}
`;
}

function runCli() {
  try {
    const args = parseArgs(process.argv.slice(2));

    if (args.help) {
      console.log(renderHelp());
      return;
    }

    if (args.list) {
      console.log(listStarterTypes().join("\n"));
      return;
    }

    const result = generateStarter({
      type: args.type,
      outDir: args.outDir,
      force: args.force,
      includeCode: args.includeCode,
    });

    console.log(`Created ${result.title} at ${result.outDir}`);
    for (const filePath of result.files) {
      console.log(`- ${filePath}`);
    }
  } catch (error) {
    console.error(error.message);
    console.error("");
    console.error(renderHelp());
    process.exitCode = 1;
  }
}

const currentFile = fileURLToPath(import.meta.url);
const invokedFile = process.argv[1] ? path.resolve(process.argv[1]) : "";

if (currentFile === invokedFile) {
  runCli();
}
