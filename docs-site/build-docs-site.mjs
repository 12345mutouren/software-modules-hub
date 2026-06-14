import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const githubBase = "https://github.com/12345mutouren/software-modules-hub";

const sourceOutputs = new Map([
  ["README.md", "index.html"],
  ["START-HERE.md", "start-here.html"],
  ["reference/master-index.md", "master-index.html"],
  ["modules/README.md", "modules.html"],
  ["catalog/github-repositories.md", "repositories.html"],
  ["runnable-apps/README.md", "runnable-apps.html"],
]);

const modules = [
  ["产品层", "目标用户、核心功能、使用流程和页面范围。", "modules/01-product-layer/README.md", "Product"],
  ["账号系统", "登录、注册、资料、安全和权限管理。", "modules/02-account-system/README.md", "Identity"],
  ["数据库层", "关系型、文档、缓存、搜索、对象存储和向量数据。", "modules/03-database-layer/README.md", "Data"],
  ["后端系统", "API、业务逻辑、权限校验、文件、通知和任务。", "modules/04-backend-system/README.md", "API"],
  ["前端/客户端", "Web、移动端、桌面端、后台和交互体验。", "modules/05-frontend-client/README.md", "UI"],
  ["安全", "密码、会话、防攻击、限流、权限和隐私合规。", "modules/06-security/README.md", "Security"],
  ["运维部署", "环境、服务器、HTTPS、备份、监控和灾难恢复。", "modules/07-operations-deployment/README.md", "Ops"],
  ["测试", "单元、接口、页面、权限、安全和性能测试。", "modules/08-testing/README.md", "QA"],
  ["商业/运营功能", "会员、支付、订单、优惠券、发票和客服。", "modules/09-business-operations/README.md", "Business"],
  ["文档", "产品说明、API、数据库、部署、管理员手册和 FAQ。", "modules/10-documentation/README.md", "Docs"],
].map(([title, description, href, short]) => ({ title, description, href: resolveHref(href), short }));

const journeys = [
  {
    title: "理解完整软件",
    description: "从 10 大模块、术语和架构图开始，先建立全局地图。",
    href: "modules.html",
    accent: "teal",
  },
  {
    title: "找 GitHub 代码库",
    description: "按模块、仓库类型和学习价值筛选代表项目。",
    href: "repositories.html",
    accent: "coral",
  },
  {
    title: "启动自己的项目",
    description: "用决策树、项目启动包和生成器把想法变成计划。",
    href: "project-starter.html",
    accent: "gold",
  },
  {
    title: "规划执行顺序",
    description: "按软件类型、当前阶段和团队规模生成构建路线。",
    href: "planner.html",
    accent: "violet",
  },
  {
    title: "组合技术栈",
    description: "选择登录、数据、部署、AI 前端层和附加能力，生成推荐栈。",
    href: "stack-composer.html",
    accent: "coral",
  },
  {
    title: "看可运行示例",
    description: "从 mini app、模块 demo、技术栈模板到业务应用模板。",
    href: "runnable-apps.html",
    accent: "green",
  },
  {
    title: "复用底层代码",
    description: "查看 core、security、auth、data、api 代码包和管理后台代码底座。",
    href: resolveHref("packages/README.md"),
    accent: "teal",
  },
  {
    title: "准备上线部署",
    description: "查看生产架构、安全合规、运维 Runbook 和部署 Playground。",
    href: resolveHref("production-templates/README.md"),
    accent: "violet",
  },
  {
    title: "评估成熟度",
    description: "用 10 大模块评分表判断一个项目离可发布还有多远。",
    href: "maturity.html",
    accent: "green",
  },
  {
    title: "维护这个仓库",
    description: "运行质量门、维护索引新鲜度，并按版本发布更新。",
    href: resolveHref("quality/README.md"),
    accent: "ink",
  },
];

const templates = [
  {
    title: "SaaS 订阅系统",
    fit: "工具类、B2B、AI 产品、会员型产品。",
    href: resolveHref("templates/complete-apps/saas-subscription/README.md"),
    runnable: resolveHref("runnable-apps/saas-starter-app/README.md"),
    tags: ["saas", "subscription", "billing", "team"],
    modules: ["账号", "权限", "订阅", "用量"],
  },
  {
    title: "管理后台",
    fit: "内部运营、CRUD、审核、配置中心。",
    href: resolveHref("templates/complete-apps/admin-dashboard/README.md"),
    runnable: resolveHref("runnable-apps/admin-dashboard-app/README.md"),
    tags: ["admin", "operations", "audit", "dashboard"],
    modules: ["用户", "内容", "审计", "导出"],
  },
  {
    title: "电商系统",
    fit: "商品、购物车、订单、支付、发货。",
    href: resolveHref("templates/complete-apps/ecommerce/README.md"),
    runnable: resolveHref("runnable-apps/ecommerce-starter-app/README.md"),
    tags: ["ecommerce", "payment", "order", "inventory"],
    modules: ["商品", "库存", "购物车", "支付"],
  },
  {
    title: "内容社区",
    fit: "帖子、评论、关注、审核、推荐。",
    href: resolveHref("templates/complete-apps/content-community/README.md"),
    runnable: resolveHref("catalog/github-repositories.md"),
    tags: ["content", "community", "moderation"],
    modules: ["内容", "互动", "审核", "推荐"],
  },
  {
    title: "AI 知识库",
    fit: "文档上传、向量检索、问答、权限。",
    href: resolveHref("templates/complete-apps/ai-knowledge-base/README.md"),
    runnable: resolveHref("runnable-apps/ai-knowledge-base-app/README.md"),
    tags: ["ai", "knowledge", "search", "workspace"],
    modules: ["文档", "检索", "引用", "隔离"],
  },
  {
    title: "企业内部工具",
    fit: "组织、审批、工单、报表、SSO。",
    href: resolveHref("templates/complete-apps/enterprise-internal-tool/README.md"),
    runnable: resolveHref("production-templates/README.md"),
    tags: ["enterprise", "workflow", "sso", "report"],
    modules: ["组织", "审批", "工单", "SSO"],
  },
];

const starterProfiles = [
  {
    type: "saas-subscription",
    title: "SaaS 订阅系统",
    summary: "适合工具类、B2B、AI 产品和会员型产品。",
    command: "node starter-generator/create-starter.mjs --type saas-subscription --out ./my-saas --with-code",
    blueprint: resolveHref("templates/complete-apps/saas-subscription/README.md"),
    runnable: resolveHref("runnable-apps/saas-starter-app/README.md"),
    gates: ["团队空间和角色权限清楚", "订阅状态能控制功能访问", "账单和用量有审计记录"],
  },
  {
    type: "admin-dashboard",
    title: "管理后台",
    summary: "适合运营、客服、审核、配置中心和内部管理。",
    command: "node starter-generator/create-starter.mjs --type admin-dashboard --out ./my-admin --with-code",
    blueprint: resolveHref("templates/complete-apps/admin-dashboard/README.md"),
    runnable: resolveHref("runnable-apps/admin-dashboard-app/README.md"),
    gates: ["管理员权限不能越权", "批量操作有确认和日志", "敏感数据导出可追踪"],
  },
  {
    type: "ecommerce",
    title: "电商系统",
    summary: "适合商品、库存、购物车、订单、支付和发货。",
    command: "node starter-generator/create-starter.mjs --type ecommerce --out ./my-store --with-code",
    blueprint: resolveHref("templates/complete-apps/ecommerce/README.md"),
    runnable: resolveHref("runnable-apps/ecommerce-starter-app/README.md"),
    gates: ["订单状态机稳定", "库存扣减和支付回调幂等", "优惠券和退款规则可审计"],
  },
  {
    type: "content-community",
    title: "内容社区",
    summary: "适合帖子、评论、关注、举报、审核和推荐。",
    command: "node starter-generator/create-starter.mjs --type content-community --out ./my-community --with-code",
    blueprint: resolveHref("templates/complete-apps/content-community/README.md"),
    runnable: resolveHref("catalog/github-repositories.md"),
    gates: ["内容状态和审核链路清楚", "举报处理有 SLA", "搜索和推荐不会绕过权限"],
  },
  {
    type: "ai-knowledge-base",
    title: "AI 知识库",
    summary: "适合文档上传、向量检索、问答、引用和权限隔离。",
    command: "node starter-generator/create-starter.mjs --type ai-knowledge-base --out ./my-kb --with-code",
    blueprint: resolveHref("templates/complete-apps/ai-knowledge-base/README.md"),
    runnable: resolveHref("runnable-apps/ai-knowledge-base-app/README.md"),
    gates: ["检索结果带引用", "文档权限隔离", "失败解析和重建索引可恢复"],
  },
  {
    type: "enterprise-internal-tool",
    title: "企业内部工具",
    summary: "适合审批、工单、资产、报表、SSO 和审计。",
    command: "node starter-generator/create-starter.mjs --type enterprise-internal-tool --out ./my-internal-tool --with-code",
    blueprint: resolveHref("templates/complete-apps/enterprise-internal-tool/README.md"),
    runnable: resolveHref("production-templates/README.md"),
    gates: ["组织和审批链可配置", "内部数据按角色隔离", "报表、审批、资产变更都有审计"],
  },
];

const starterOutputs = [
  ["产品简报", "确认目标用户、核心任务、范围边界和成功指标。"],
  ["模块选择", "把 10 个软件模块映射到当前项目需要的功能。"],
  ["权限矩阵", "明确游客、用户、管理员、运营、客服等角色能做什么。"],
  ["数据模型", "给出通用表、业务表和字段起点。"],
  ["API 合同", "把资源、接口、权限和错误处理写成可实现清单。"],
  ["安全审查", "提前处理认证、授权、输入校验、限流和审计。"],
  ["测试计划", "覆盖单元、接口、页面、权限、安全和性能冒烟。"],
  ["发布计划", "把环境、域名、备份、监控、回滚和上线步骤串起来。"],
];

const plannerProfiles = [
  {
    type: "saas-subscription",
    title: "SaaS 订阅系统",
    focus: "先打通团队空间、角色权限、订阅状态和用量限制。",
    risk: "订阅、权限和用量统计不一致会直接影响收费和访问控制。",
  },
  {
    type: "admin-dashboard",
    title: "管理后台",
    focus: "先做用户管理、内容管理、批量操作、审计日志和导出边界。",
    risk: "后台越权和批量误操作是第一风险。",
  },
  {
    type: "ecommerce",
    title: "电商系统",
    focus: "先做商品、库存、购物车、订单状态机、支付回调和退款边界。",
    risk: "库存扣减、支付回调和订单状态必须幂等。",
  },
  {
    type: "content-community",
    title: "内容社区",
    focus: "先做发布、评论、举报、审核状态、搜索和推荐边界。",
    risk: "内容审核和可见性规则不清会放大运营风险。",
  },
  {
    type: "ai-knowledge-base",
    title: "AI 知识库",
    focus: "先做文档上传、解析、向量索引、引用返回和权限隔离。",
    risk: "检索结果必须带来源，且不能跨空间泄露文档。",
  },
  {
    type: "enterprise-internal-tool",
    title: "企业内部工具",
    focus: "先做组织结构、审批链、工单状态、报表和 SSO 边界。",
    risk: "组织权限、审批记录和审计日志必须可追踪。",
  },
];

const plannerStages = [
  {
    id: "map",
    label: "Map / 梳理想法",
    window: "1-2 周",
    focus: "定义用户、核心任务、非目标和 10 模块范围。",
    risk: "范围发散、角色混乱、核心流程没有闭环。",
  },
  {
    id: "prototype",
    label: "Prototype / 做出原型",
    window: "2-4 周",
    focus: "优先跑通登录、核心数据、主流程和可演示 UI。",
    risk: "原型只会展示，不能验证权限、数据边界和错误状态。",
  },
  {
    id: "launch",
    label: "Launch / 准备发布",
    window: "4-8 周",
    focus: "补齐权限、安全、测试、监控、备份和发布步骤。",
    risk: "缺少审计、回滚和异常处理会让上线不可控。",
  },
  {
    id: "production",
    label: "Production / 长期维护",
    window: "持续迭代",
    focus: "建立质量门、更新节奏、事故响应和真实项目复核。",
    risk: "依赖、仓库索引、文档和安全假设会随时间过期。",
  },
];

const plannerTeams = [
  {
    id: "solo",
    label: "1 人",
    focus: "保持单一主流程，每周只交付一个可验证结果。",
  },
  {
    id: "small",
    label: "2-5 人",
    focus: "拆成产品/API/UI/测试四条并行线，接口合同先行。",
  },
  {
    id: "product-team",
    label: "6 人以上",
    focus: "增加 ADR、权限评审、发布负责人和每周质量门。",
  },
];

const plannerTracks = [
  {
    stage: "map",
    number: "01",
    title: "定义产品边界",
    modules: ["产品层", "账号系统", "文档"],
    checks: ["写 1 页产品简报", "确定游客、用户、管理员和运营角色", "列出第一版必须做和明确不做的功能"],
    links: [
      ["产品简报", resolveHref("project-kickoff/templates/product-brief.md")],
      ["软件类型选择", resolveHref("decision-guides/software-type-selector.md")],
    ],
  },
  {
    stage: "prototype",
    number: "02",
    title: "跑通核心闭环",
    modules: ["数据库层", "后端系统", "前端/客户端"],
    checks: ["定义核心表和 API 合同", "实现主流程页面和状态", "用可运行模板验证技术栈"],
    links: [
      ["API 合同", resolveHref("project-kickoff/templates/api-contract.md")],
      ["可运行应用", "runnable-apps.html"],
    ],
  },
  {
    stage: "launch",
    number: "03",
    title: "补齐发布门槛",
    modules: ["安全", "测试", "运维部署"],
    checks: ["覆盖权限、越权和输入校验测试", "准备环境变量、备份、监控和回滚", "用成熟度评分找最低分模块"],
    links: [
      ["成熟度评分", "maturity.html"],
      ["生产模板", resolveHref("production-templates/README.md")],
    ],
  },
  {
    stage: "production",
    number: "04",
    title: "进入长期维护",
    modules: ["商业/运营功能", "运维部署", "文档"],
    checks: ["维护发布节奏和变更记录", "定期复核仓库索引和链接", "把真实事故、反馈和指标转成下一轮计划"],
    links: [
      ["维护体系", resolveHref("maintenance/README.md")],
      ["发布手册", resolveHref("showcase/release-playbook.md")],
    ],
  },
];

const composerProfiles = [
  {
    type: "saas-subscription",
    title: "SaaS 订阅系统",
    focus: "优先选择团队空间、订阅、用量、权限和审计都能长期演进的栈。",
    command: "node starter-generator/create-starter.mjs --type saas-subscription --out ./my-saas --with-code",
    gates: ["订阅状态控制功能访问", "账单 Webhook 幂等", "团队角色和用量审计可追踪"],
  },
  {
    type: "admin-dashboard",
    title: "管理后台",
    focus: "优先选择 RBAC、审计日志、批量操作确认和数据导出边界清楚的栈。",
    command: "node starter-generator/create-starter.mjs --type admin-dashboard --out ./my-admin --with-code",
    gates: ["管理员越权测试覆盖", "批量操作有确认和回滚", "敏感导出有审计记录"],
  },
  {
    type: "ecommerce",
    title: "电商系统",
    focus: "优先选择事务、库存、订单状态机、支付回调和退款规则可靠的栈。",
    command: "node starter-generator/create-starter.mjs --type ecommerce --out ./my-store --with-code",
    gates: ["库存扣减防超卖", "支付回调幂等", "订单、退款和优惠券状态可审计"],
  },
  {
    type: "content-community",
    title: "内容社区",
    focus: "优先选择内容状态、审核队列、搜索、推荐和举报流程都能扩展的栈。",
    command: "node starter-generator/create-starter.mjs --type content-community --out ./my-community --with-code",
    gates: ["内容可见性不绕过权限", "举报和审核 SLA 清楚", "搜索索引和推荐策略可解释"],
  },
  {
    type: "ai-knowledge-base",
    title: "AI 知识库",
    focus: "优先选择文档解析、向量索引、引用返回、权限隔离和重建索引可恢复的栈。",
    command: "node starter-generator/create-starter.mjs --type ai-knowledge-base --out ./my-kb --with-code",
    gates: ["回答带引用", "向量检索按空间隔离", "解析失败和重建索引可恢复"],
  },
  {
    type: "enterprise-internal-tool",
    title: "企业内部工具",
    focus: "优先选择 SSO、组织权限、审批链、报表和审计日志成熟的栈。",
    command: "node starter-generator/create-starter.mjs --type enterprise-internal-tool --out ./my-internal-tool --with-code",
    gates: ["SSO 和组织同步可控", "审批链可配置", "报表、资产和工单变更有审计"],
  },
];

const composerAuthOptions = [
  {
    id: "password-oauth",
    label: "账号密码 + OAuth",
    stack: "Auth.js / Lucia + 邮箱验证 + OAuth",
    risk: "必须补密码重置、登录失败限流、邮箱验证和登录记录。",
    repos: ["Auth.js", "Lucia", "Keycloak"],
  },
  {
    id: "magic-link",
    label: "Magic Link / 邮箱验证码",
    stack: "Magic Link + 短期 token + 邮件队列",
    risk: "要控制 token 过期、重复点击、邮件延迟和账号枚举风险。",
    repos: ["Auth.js", "Supabase Auth", "Resend"],
  },
  {
    id: "sso",
    label: "企业 SSO",
    stack: "OIDC / SAML SSO + SCIM 同步 + RBAC",
    risk: "要提前定义组织同步、离职禁用、角色映射和审计留痕。",
    repos: ["Keycloak", "BoxyHQ", "Ory"],
  },
  {
    id: "passkey",
    label: "Passkey",
    stack: "WebAuthn / Passkey + 备用恢复方式",
    risk: "要设计设备丢失、跨设备恢复和管理员协助流程。",
    repos: ["SimpleWebAuthn", "Auth.js", "Ory"],
  },
];

const composerDataOptions = [
  {
    id: "postgres",
    label: "PostgreSQL",
    stack: "PostgreSQL + Prisma / Drizzle + Redis",
    risk: "适合大多数业务；重点是事务边界、索引、唯一约束和备份。",
    repos: ["PostgreSQL", "Prisma", "Drizzle ORM", "Redis"],
  },
  {
    id: "postgres-search",
    label: "PostgreSQL + Search",
    stack: "PostgreSQL + Meilisearch / Elasticsearch + Redis",
    risk: "搜索索引要处理同步延迟、权限过滤和重建流程。",
    repos: ["PostgreSQL", "Meilisearch", "Elasticsearch", "Redis"],
  },
  {
    id: "mongo",
    label: "MongoDB",
    stack: "MongoDB + Redis + 对象存储",
    risk: "适合灵活结构；要控制 schema 漂移、索引和跨集合一致性。",
    repos: ["MongoDB", "Mongoose", "Redis", "MinIO"],
  },
  {
    id: "vector",
    label: "PostgreSQL + Vector",
    stack: "PostgreSQL + pgvector / Qdrant + 对象存储",
    risk: "AI 场景必须处理权限隔离、引用、重嵌入和索引重建。",
    repos: ["pgvector", "Qdrant", "LangChain", "MinIO"],
  },
];

const composerDeployOptions = [
  {
    id: "vercel-managed",
    label: "Vercel / 托管服务",
    stack: "Next.js + Vercel + 托管数据库 + GitHub Actions",
    risk: "上线快；要提前确认环境变量、冷启动、队列和后台任务边界。",
    repos: ["Vercel", "Next.js", "GitHub Actions"],
  },
  {
    id: "container",
    label: "容器部署",
    stack: "Docker Compose / Coolify + PostgreSQL + Redis + 对象存储",
    risk: "更可控；要补备份、监控、HTTPS、滚动发布和回滚。",
    repos: ["Docker", "Coolify", "Traefik", "PostgreSQL"],
  },
  {
    id: "serverless",
    label: "Serverless",
    stack: "Serverless API + 队列 + 托管数据库 + 对象存储",
    risk: "弹性好；要控制超时、幂等、队列重试和数据库连接。",
    repos: ["Cloudflare Workers", "Supabase", "Upstash", "SST"],
  },
  {
    id: "enterprise",
    label: "企业内网 / 私有云",
    stack: "Kubernetes / VM + OIDC + 私有网络 + 集中日志",
    risk: "适合企业；要处理网络边界、SSO、审计、备份和权限复核。",
    repos: ["Kubernetes", "Keycloak", "Grafana", "OpenTelemetry"],
  },
];

const composerAgentOptions = [
  {
    id: "none",
    label: "暂不引入",
    stack: "",
    risk: "",
    repos: [],
  },
  {
    id: "copilotkit",
    label: "CopilotKit / AG-UI",
    stack: "CopilotKit + AG-UI + Generative UI",
    risk: "要限制 Agent 工具权限、共享状态写入、人机确认和生成 UI 的安全边界。",
    repos: ["CopilotKit", "AG-UI", "LangChain", "Mastra"],
  },
  {
    id: "custom-agent-ui",
    label: "自定义 Agent UI",
    stack: "自定义 Chat UI + Tool Call Renderer + 状态同步",
    risk: "灵活但成本高；必须自己处理流式消息、工具渲染、恢复和审计。",
    repos: ["Vercel AI SDK", "assistant-ui", "OpenAI Agents SDK"],
  },
];

const composerExtras = [
  {
    id: "payments",
    label: "支付/订阅",
    stack: "Stripe Checkout + Webhook + 发票/退款记录",
    risk: "支付回调必须幂等，订阅状态和权限访问必须一致。",
    repos: ["Stripe Samples", "Lago", "Kill Bill"],
    checked: true,
  },
  {
    id: "admin",
    label: "管理后台",
    stack: "RBAC Admin + 审计日志 + 导出审批",
    risk: "后台要覆盖越权测试、批量操作确认和敏感导出审计。",
    repos: ["React Admin", "Refine", "Twenty"],
    checked: false,
  },
  {
    id: "ai-search",
    label: "AI 检索",
    stack: "文档解析 + 向量检索 + 引用返回 + 重建索引",
    risk: "AI 检索不能绕过数据权限，回答必须带来源和失败兜底。",
    repos: ["pgvector", "Qdrant", "LangChain", "LlamaIndex"],
    checked: false,
  },
];

const maturityLevels = [
  ["0-39", "Map", "只适合学习和梳理想法。先补产品、账号、数据和核心流程。"],
  ["40-69", "Prototype", "可以做内部演示。需要补权限、安全、测试和部署恢复能力。"],
  ["70-89", "Launch Candidate", "可以准备小范围上线。重点复核审计日志、备份、监控和文档。"],
  ["90-100", "Production Ready", "具备较完整的发布基础。继续做真实项目安全和合规复核。"],
];

const maturityScorecard = [
  {
    module: "产品层",
    short: "Product",
    checks: ["目标用户和核心任务清楚", "主流程和页面范围明确", "成功指标可衡量", "范围边界和非目标写清"],
  },
  {
    module: "账号系统",
    short: "Identity",
    checks: ["注册登录方式已选定", "角色和权限矩阵完整", "密码重置和二次验证有方案", "登录记录和异常提醒可追踪"],
  },
  {
    module: "数据库层",
    short: "Data",
    checks: ["核心表和关系已定义", "索引、唯一约束和事务边界清楚", "缓存、搜索、文件或向量存储有取舍", "备份和数据导出删除流程明确"],
  },
  {
    module: "后端系统",
    short: "API",
    checks: ["核心 API 合同写清", "输入校验和错误语义统一", "资源级权限校验覆盖", "文件、通知和定时任务边界明确"],
  },
  {
    module: "前端/客户端",
    short: "UI",
    checks: ["核心页面和状态流完整", "表单、加载、错误和空状态可用", "搜索、筛选、分页或详情流清楚", "桌面和移动端布局不溢出"],
  },
  {
    module: "安全",
    short: "Security",
    checks: ["密码和会话不明文暴露", "SQL 注入、XSS、CSRF 有防护", "限流和登录失败限制存在", "隐私授权、删除和导出流程明确"],
  },
  {
    module: "运维部署",
    short: "Ops",
    checks: ["开发、测试、生产环境区分", "HTTPS、域名和环境变量清楚", "日志、监控和报警已设计", "备份、回滚和灾难恢复有演练"],
  },
  {
    module: "测试",
    short: "QA",
    checks: ["单元和接口测试覆盖核心逻辑", "页面流程和权限测试覆盖", "安全和越权测试存在", "性能或并发冒烟测试存在"],
  },
  {
    module: "商业/运营功能",
    short: "Business",
    checks: ["会员、支付、订单或业务对象清楚", "优惠、发票、客服或反馈按需设计", "运营后台和数据统计有入口", "内容审核或推荐风险有处理"],
  },
  {
    module: "文档",
    short: "Docs",
    checks: ["产品说明和用户文档可读", "API 和数据库结构文档存在", "部署和管理员手册完整", "FAQ、发布记录和维护说明同步"],
  },
];

export function buildDocsSite({ outDir, siteMapPath = "docs-site/site-map.json" }) {
  if (!outDir) {
    throw new Error("Missing output directory.");
  }

  const absoluteOutDir = path.resolve(outDir);
  const siteMap = JSON.parse(fs.readFileSync(path.join(root, siteMapPath), "utf8"));
  const repositories = parseRepositoryCatalog(read("catalog/github-repositories.md"));

  fs.mkdirSync(absoluteOutDir, { recursive: true });
  copyAssets(absoluteOutDir);

  for (const page of siteMap) {
    const html = renderSitePage(page, repositories);
    fs.writeFileSync(path.join(absoluteOutDir, page.output), html, "utf8");
  }

  fs.writeFileSync(path.join(absoluteOutDir, "site-map.json"), JSON.stringify(siteMap, null, 2), "utf8");
  fs.writeFileSync(path.join(absoluteOutDir, "repositories.json"), JSON.stringify(repositories, null, 2), "utf8");

  return {
    outDir: absoluteOutDir,
    pages: siteMap.map((page) => page.output),
  };
}

function renderSitePage(page, repositories) {
  const kind = page.kind || "markdown";
  const renderers = {
    home: () => renderHomePage(),
    start: () => renderStartPage(),
    explore: () => renderExplorePage(),
    templates: () => renderTemplatePage(),
    starter: () => renderProjectStarterPage(),
    maturity: () => renderMaturityScorecardPage(),
    planner: () => renderBuildPlannerPage(),
    composer: () => renderStackComposerPage(),
    repositories: () => renderRepositoryPage(repositories),
    markdown: () => renderMarkdownPage(page),
  };
  const body = (renderers[kind] || renderers.markdown)();

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeHtml(page.title)} - Software Modules Hub</title>
  <link rel="stylesheet" href="assets/site.css">
  <script defer src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js"></script>
  <script defer src="assets/site.js"></script>
</head>
<body class="page-${escapeAttr(kind)}">
  <header class="site-header">
    <a class="brand" href="index.html" aria-label="Software Modules Hub home">
      <span class="brand-mark">SMH</span>
      <span>Software Modules Hub</span>
    </a>
    <nav class="site-nav" aria-label="Main navigation">
      <a href="start-here.html">Start Here</a>
      <a href="explore.html">Explore</a>
      <a href="templates.html">Templates</a>
      <a href="project-starter.html">Project Starter</a>
      <a href="planner.html">Build Planner</a>
      <a href="stack-composer.html">Stack Composer</a>
      <a href="maturity.html">Scorecard</a>
      <a href="repositories.html">GitHub Index</a>
      <a href="modules.html">Modules</a>
    </nav>
  </header>
  <main>${body}</main>
</body>
</html>
`;
}

function renderHomePage() {
  return `
<section class="hero">
  <canvas id="module-constellation" aria-hidden="true"></canvas>
  <div class="hero-copy">
    <p class="eyebrow reveal">Complete Software Map</p>
    <h1 class="reveal">从模块地图到可运行模板，一个仓库看懂完整软件。</h1>
    <p class="hero-text reveal">按产品、账号、数据库、后端、前端、安全、运维、测试、商业和文档拆解现代软件，并配套代码示例、GitHub 仓库索引、模板和上线资料。</p>
    <div class="hero-actions reveal">
      <a class="button primary" href="start-here.html">从这里开始</a>
      <a class="button ghost" href="project-starter.html">启动一个项目</a>
    </div>
  </div>
</section>
<section class="band stats-band" aria-label="Repository highlights">
  <div class="stat reveal"><strong>10</strong><span>核心模块</span></div>
  <div class="stat reveal"><strong>121</strong><span>GitHub 仓库链接</span></div>
  <div class="stat reveal"><strong>6</strong><span>完整软件模板</span></div>
  <div class="stat reveal"><strong>4</strong><span>可运行业务应用</span></div>
</section>
<section class="band">
  <div class="section-heading reveal">
    <p class="eyebrow">Choose A Path</p>
    <h2>按你的目标进入，不用从头读。</h2>
  </div>
  <div class="card-grid journey-grid">${journeys.map(renderJourneyCard).join("")}</div>
</section>
<section class="band split-band">
  <div class="section-heading reveal">
    <p class="eyebrow">Module System</p>
    <h2>10 个模块是一张系统地图。</h2>
    <p>每张卡都对应仓库中的深度文档和后续模板。</p>
  </div>
  <div class="module-grid">${modules.map(renderModuleCard).join("")}</div>
</section>
<section class="band feature-strip">
  <a class="feature-card reveal" href="templates.html"><span>01</span><strong>模板选择器</strong><p>从 SaaS、电商、AI 知识库、管理后台等方向快速选型。</p></a>
  <a class="feature-card reveal" href="project-starter.html"><span>02</span><strong>项目启动器</strong><p>把软件类型转换成生成命令、启动包和上线门槛。</p></a>
  <a class="feature-card reveal" href="planner.html"><span>03</span><strong>构建计划器</strong><p>按软件类型、阶段和团队规模生成执行路线。</p></a>
  <a class="feature-card reveal" href="stack-composer.html"><span>04</span><strong>技术栈组合器</strong><p>把登录、数据、部署、AI 前端层和附加能力组合成推荐栈。</p></a>
  <a class="feature-card reveal" href="maturity.html"><span>05</span><strong>成熟度评分</strong><p>按 10 大模块评估一个项目是否接近可发布。</p></a>
  <a class="feature-card reveal" href="repositories.html"><span>06</span><strong>GitHub 仓库浏览页</strong><p>按模块和仓库类型筛选学习对象。</p></a>
  <a class="feature-card reveal" href="${resolveHref("packages/README.md")}"><span>07</span><strong>底层代码包</strong><p>复用 core、security、auth、data、api 包和管理后台代码底座。</p></a>
</section>`;
}

function renderStartPage() {
  return `
<section class="page-hero">
  <p class="eyebrow reveal">Start Here</p>
  <h1 class="reveal">先选目标，再选资料。</h1>
  <p class="reveal">这个仓库内容很多，最好的读法不是顺序阅读，而是按任务进入。</p>
</section>
<section class="band">
  <div class="card-grid journey-grid">${journeys.map(renderJourneyCard).join("")}</div>
</section>
<section class="band compact-band">
  <h2 class="reveal">最短路径</h2>
  <ol class="timeline">
    <li class="reveal"><strong>建立地图</strong><span>读模块总览，知道完整软件有哪些层。</span></li>
    <li class="reveal"><strong>找参考</strong><span>进入 GitHub 仓库浏览页，按模块看代表代码库。</span></li>
    <li class="reveal"><strong>选方向</strong><span>用模板选择器、项目启动器、构建计划器和技术栈组合器确定 SaaS、电商、AI 知识库或管理后台。</span></li>
    <li class="reveal"><strong>跑示例</strong><span>用可运行模板把概念对应到代码。</span></li>
  </ol>
</section>`;
}

function renderExplorePage() {
  return `
<section class="page-hero">
  <p class="eyebrow reveal">Explore</p>
  <h1 class="reveal">按使用场景浏览整个仓库。</h1>
  <p class="reveal">这里把文档、模板、代码、部署和维护资料重新组织成几个清晰入口。</p>
</section>
<section class="band">
  <div class="card-grid journey-grid">${journeys.map(renderJourneyCard).join("")}</div>
</section>
<section class="band">
  <div class="section-heading reveal">
    <p class="eyebrow">Deep Links</p>
    <h2>常用入口</h2>
  </div>
  <div class="link-matrix">
    ${renderLinkColumn("学习", [["模块总览", "modules.html"], ["术语表", resolveHref("reference/glossary.md")], ["30 天计划", resolveHref("learning-paths/30-day-plan.md")]])}
    ${renderLinkColumn("构建", [["项目启动器", "project-starter.html"], ["构建计划器", "planner.html"], ["技术栈组合器", "stack-composer.html"], ["成熟度评分", "maturity.html"], ["可运行应用", "runnable-apps.html"], ["底层代码包", resolveHref("packages/README.md")], ["API 层代码", resolveHref("packages/api/README.md")]])}
    ${renderLinkColumn("上线", [["生产模板", resolveHref("production-templates/README.md")], ["安全合规", resolveHref("security-compliance/README.md")], ["部署包", resolveHref("docs-site/deploy/README.md")]])}
  </div>
</section>`;
}

function renderStackComposerPage() {
  const activeProfile = composerProfiles[0];
  const activeAuth = composerAuthOptions[0];
  const activeData = composerDataOptions[0];
  const activeDeploy = composerDeployOptions[0];
  const activeAgent = composerAgentOptions[0];
  const activeExtras = composerExtras.filter((extra) => extra.checked);
  const activeItems = [activeAuth, activeData, activeDeploy, activeAgent, ...activeExtras];
  const activeRepos = unique(activeItems.flatMap((item) => item.repos));
  const activeRisks = activeItems.map((item) => item.risk).filter(Boolean);

  return `
<section class="page-hero">
  <p class="eyebrow reveal">Stack Composer</p>
  <h1 class="reveal">把技术选择组合成一套可执行架构。</h1>
  <p class="reveal">选择软件类型、登录方式、数据层、部署方式、AI 前端层和附加能力，实时得到推荐栈、风险提醒、参考仓库和生成命令。</p>
</section>
<section class="band composer-control-band">
  <div class="composer-controls reveal">
    <label for="composer-type"><span>软件类型</span><select id="composer-type">${composerProfiles.map(renderComposerProfileOption).join("")}</select></label>
    <label for="composer-auth"><span>登录方案</span><select id="composer-auth">${composerAuthOptions.map(renderComposerOption).join("")}</select></label>
    <label for="composer-data"><span>数据层</span><select id="composer-data">${composerDataOptions.map(renderComposerOption).join("")}</select></label>
    <label for="composer-deploy"><span>部署方式</span><select id="composer-deploy">${composerDeployOptions.map(renderComposerOption).join("")}</select></label>
    <label for="composer-agent"><span>AI 前端层</span><select id="composer-agent">${composerAgentOptions.map(renderComposerOption).join("")}</select></label>
    <fieldset class="composer-extra-list">
      <legend>附加能力</legend>
      ${composerExtras.map(renderComposerExtra).join("")}
    </fieldset>
  </div>
  <div class="composer-summary-grid reveal" aria-live="polite">
    <article><span>Recommended Stack</span><strong id="composer-stack">${escapeHtml(activeItems.map((item) => item.stack).filter(Boolean).join(" + "))}</strong></article>
    <article><span>Project Focus</span><strong id="composer-focus">${escapeHtml(activeProfile.focus)}</strong></article>
    <article><span>Build Command</span><code id="composer-command">${escapeHtml(activeProfile.command)}</code></article>
  </div>
</section>
<section class="band">
  <div class="section-heading reveal">
    <p class="eyebrow">Decision Output</p>
    <h2>组合结果要能直接拿去开工。</h2>
    <p>这里输出的不是唯一答案，而是一个起点：先用推荐栈开局，再用风险和门槛检查它是否适合当前项目。</p>
  </div>
  <div class="composer-output-grid">
    <article class="composer-output-card reveal">
      <span>Risk Review</span>
      <div id="composer-risks" class="composer-list">${activeRisks.map((risk) => `<p>${escapeHtml(risk)}</p>`).join("")}</div>
    </article>
    <article class="composer-output-card reveal">
      <span>Reference Repos</span>
      <div id="composer-repos" class="repo-chip-row">${activeRepos.map((repo) => `<a href="repositories.html">${escapeHtml(repo)}</a>`).join("")}</div>
    </article>
    <article class="composer-output-card reveal">
      <span>Release Gates</span>
      <div id="composer-gates" class="composer-list">${activeProfile.gates.map((gate) => `<p>${escapeHtml(gate)}</p>`).join("")}</div>
    </article>
  </div>
</section>
<section class="band compact-band">
  <div class="section-heading reveal">
    <p class="eyebrow">Use With</p>
    <h2>技术栈只是骨架，还要接回项目路线和成熟度检查。</h2>
  </div>
  <div class="link-matrix">
    ${renderLinkColumn("规划", [["Project Starter", "project-starter.html"], ["Build Planner", "planner.html"], ["Maturity Scorecard", "maturity.html"]])}
    ${renderLinkColumn("决策", [["账号方案", resolveHref("decision-guides/auth-decision-tree.md")], ["数据库方案", resolveHref("decision-guides/database-decision-tree.md")], ["部署方案", resolveHref("decision-guides/deployment-decision-tree.md")]])}
    ${renderLinkColumn("实现", [["可运行模板", resolveHref("runnable-templates/README.md")], ["可运行应用", "runnable-apps.html"], ["GitHub 仓库索引", "repositories.html"]])}
  </div>
</section>`;
}

function renderBuildPlannerPage() {
  const activeProfile = plannerProfiles[0];
  const activeStage = plannerStages[0];
  const activeTeam = plannerTeams[0];

  return `
<section class="page-hero">
  <p class="eyebrow reveal">Build Planner</p>
  <h1 class="reveal">把软件想法排成可执行路线。</h1>
  <p class="reveal">选择软件类型、当前阶段和团队规模，得到当前最该做的重点、时间窗口、风险提醒和四段构建顺序。</p>
</section>
<section class="band planner-control-band">
  <div class="planner-controls reveal">
    <label for="planner-type"><span>软件类型</span><select id="planner-type">${plannerProfiles.map(renderPlannerProfileOption).join("")}</select></label>
    <label for="planner-stage"><span>当前阶段</span><select id="planner-stage">${plannerStages.map(renderPlannerStageOption).join("")}</select></label>
    <label for="planner-team"><span>团队规模</span><select id="planner-team">${plannerTeams.map(renderPlannerTeamOption).join("")}</select></label>
  </div>
  <div class="planner-summary reveal" aria-live="polite">
    <article><span>Focus</span><strong id="planner-focus">${escapeHtml(`${activeProfile.focus} ${activeTeam.focus}`)}</strong></article>
    <article><span>Window</span><strong id="planner-window">${escapeHtml(activeStage.window)}</strong></article>
    <article><span>Risk</span><strong id="planner-risk">${escapeHtml(`${activeStage.risk} ${activeProfile.risk}`)}</strong></article>
  </div>
</section>
<section class="band">
  <div class="section-heading reveal">
    <p class="eyebrow">Sequence</p>
    <h2>先把路线排对，再决定写哪段代码。</h2>
    <p>高亮卡片会随当前阶段变化。完整路线保留在页面上，方便你知道下一段会接到哪里。</p>
  </div>
  <div id="planner-sequence" class="planner-roadmap-grid">${plannerTracks.map(renderPlannerTrackCard).join("")}</div>
</section>
<section class="band compact-band">
  <div class="section-heading reveal">
    <p class="eyebrow">Use With</p>
    <h2>计划器负责排顺序，其他页面负责给材料。</h2>
  </div>
  <div class="link-matrix">
    ${renderLinkColumn("启动", [["Project Starter", "project-starter.html"], ["项目生成器", resolveHref("starter-generator/README.md")], ["启动包模板", resolveHref("project-kickoff/README.md")]])}
    ${renderLinkColumn("验证", [["Maturity Scorecard", "maturity.html"], ["测试计划", resolveHref("project-kickoff/templates/test-plan.md")], ["安全审查", resolveHref("project-kickoff/templates/security-review.md")]])}
    ${renderLinkColumn("上线", [["生产模板", resolveHref("production-templates/README.md")], ["部署 Playground", resolveHref("deployment-playground/README.md")], ["运维生产化", resolveHref("ops-production/README.md")]])}
  </div>
</section>`;
}

function renderMaturityScorecardPage() {
  return `
<section class="page-hero">
  <p class="eyebrow reveal">Maturity Scorecard</p>
  <h1 class="reveal">用 10 大模块判断项目离发布还有多远。</h1>
  <p class="reveal">勾选已经完成的能力，实时得到总分、成熟度等级、完成模块数和下一步补强方向。</p>
</section>
<section class="band score-summary-band">
  <div class="score-meter reveal" aria-live="polite">
    <span>Readiness Score</span>
    <strong id="score-value">0</strong>
    <p id="score-label">Map</p>
    <div class="score-bar" aria-hidden="true"><span id="score-bar-fill"></span></div>
  </div>
  <div class="score-meta-grid">
    <div class="score-meta reveal"><strong id="score-completed">0</strong><span>checked items</span></div>
    <div class="score-meta reveal"><strong id="score-modules">0</strong><span>complete modules</span></div>
    <div class="score-meta reveal"><strong>40</strong><span>total checks</span></div>
  </div>
</section>
<section class="band compact-band">
  <div class="section-heading reveal">
    <p class="eyebrow">Levels</p>
    <h2>分数只是入口，真正要看缺口在哪个模块。</h2>
  </div>
  <div class="level-grid">${maturityLevels.map(renderMaturityLevel).join("")}</div>
</section>
<section class="band">
  <div class="section-heading reveal">
    <p class="eyebrow">Checklist</p>
    <h2>逐项勾选当前项目已经具备的能力。</h2>
  </div>
  <div class="scorecard-grid">${maturityScorecard.map(renderScorecardModule).join("")}</div>
</section>
<section class="band score-next-band">
  <div class="section-heading reveal">
    <p class="eyebrow">Next Move</p>
    <h2>低分模块优先补，不要平均用力。</h2>
  </div>
  <div id="score-next-actions" class="next-action-list reveal">
    <p>先勾选已经完成的能力，这里会显示优先补强模块。</p>
  </div>
</section>`;
}

function renderProjectStarterPage() {
  const active = starterProfiles[0];

  return `
<section class="page-hero">
  <p class="eyebrow reveal">Project Starter</p>
  <h1 class="reveal">把“我要做什么软件”变成项目启动包。</h1>
  <p class="reveal">选择一个软件类型，直接拿到生成命令、模板入口、可运行参考和第一版上线前必须过的门槛。</p>
</section>
<section class="band starter-command-band">
  <div class="starter-picker reveal">
    <label for="starter-select">我要做</label>
    <select id="starter-select" aria-label="Choose software starter type">
      ${starterProfiles.map((profile) => `<option value="${escapeAttr(profile.type)}">${escapeHtml(profile.title)}</option>`).join("")}
    </select>
    <p id="starter-summary">${escapeHtml(active.summary)}</p>
  </div>
  <div class="starter-command reveal">
    <span>生成命令</span>
    <code id="starter-command">${escapeHtml(active.command)}</code>
  </div>
</section>
<section class="band">
  <div class="section-heading reveal">
    <p class="eyebrow">Starter Profiles</p>
    <h2>6 种常见软件，一键进入不同启动路径。</h2>
  </div>
  <div class="starter-profile-grid">${starterProfiles.map((profile, index) => renderStarterProfileCard(profile, index === 0)).join("")}</div>
</section>
<section class="band compact-band">
  <div class="section-heading reveal">
    <p class="eyebrow">Generated Package</p>
    <h2>启动包会输出这些决策文件。</h2>
  </div>
  <div class="starter-output-grid">${starterOutputs.map(renderStarterOutputCard).join("")}</div>
</section>
<section class="band">
  <div class="section-heading reveal">
    <p class="eyebrow">First Release Gate</p>
    <h2>第一版不是只要能跑，还要能被解释、测试和恢复。</h2>
  </div>
  <div class="maturity-grid">
    ${renderMaturityGate("产品清楚", "目标用户、核心流程、角色和成功指标能在 1 页内讲清。")}
    ${renderMaturityGate("数据有边界", "用户只能访问自己的数据，关键表和审计字段已经定义。")}
    ${renderMaturityGate("接口可验证", "核心 API 有输入校验、权限校验和错误语义。")}
    ${renderMaturityGate("上线可恢复", "环境变量、备份、监控、回滚和发布步骤都有文档。")}
  </div>
</section>`;
}

function renderTemplatePage() {
  const filters = [
    ["all", "全部"],
    ["saas", "SaaS"],
    ["ecommerce", "电商"],
    ["ai", "AI"],
    ["admin", "后台"],
    ["enterprise", "企业工具"],
  ];

  return `
<section class="page-hero">
  <p class="eyebrow reveal">Template Selector</p>
  <h1 class="reveal">选择你要做的软件类型。</h1>
  <p class="reveal">每个模板都连接到蓝图文档、模块组合和可运行参考。</p>
</section>
<section class="band">
  <div class="filter-bar reveal" role="group" aria-label="Template filters">
    ${filters.map(([value, label], index) => `<button class="filter-button${index === 0 ? " active" : ""}" data-template-filter="${escapeAttr(value)}">${escapeHtml(label)}</button>`).join("")}
  </div>
  <div class="template-grid">${templates.map(renderTemplateCard).join("")}</div>
</section>`;
}

function renderRepositoryPage(repositories) {
  const modulesList = unique(repositories.map((repo) => repo.module)).filter(Boolean);
  const types = unique(repositories.map((repo) => repo.type)).filter(Boolean);

  return `
<section class="page-hero">
  <p class="eyebrow reveal">GitHub Repository Browser</p>
  <h1 class="reveal">按模块和类型筛选代表仓库。</h1>
  <p class="reveal">从库、框架、模板、平台、真实产品源码和学习示例里找到该看的代码。</p>
</section>
<section class="band">
  <div class="repo-toolbar reveal">
    <label><span>搜索</span><input id="repo-search" type="search" placeholder="Auth.js, PostgreSQL, Playwright"></label>
    <label><span>模块</span><select id="repo-module"><option value="all">全部模块</option>${modulesList.map((moduleName) => `<option value="${escapeAttr(moduleName)}">${escapeHtml(moduleName)}</option>`).join("")}</select></label>
    <label><span>类型</span><select id="repo-type"><option value="all">全部类型</option>${types.map((type) => `<option value="${escapeAttr(type)}">${escapeHtml(type)}</option>`).join("")}</select></label>
    <p class="repo-count"><strong id="repo-count">${repositories.length}</strong> repositories</p>
  </div>
  <div class="repo-grid">
    ${repositories.map(renderRepositoryCard).join("")}
  </div>
</section>`;
}

function renderMarkdownPage(page) {
  const markdown = read(page.source);
  return `<article class="article-shell">${markdownToHtml(markdown)}</article>`;
}

function renderJourneyCard(journey) {
  return `<a class="journey-card reveal accent-${journey.accent}" href="${escapeAttr(journey.href)}">
  <strong>${escapeHtml(journey.title)}</strong>
  <p>${escapeHtml(journey.description)}</p>
</a>`;
}

function renderModuleCard(moduleItem) {
  return `<a class="module-card reveal" href="${escapeAttr(moduleItem.href)}">
  <span>${escapeHtml(moduleItem.short)}</span>
  <strong>${escapeHtml(moduleItem.title)}</strong>
  <p>${escapeHtml(moduleItem.description)}</p>
</a>`;
}

function renderTemplateCard(template) {
  return `<article class="template-card reveal" data-template-tags="${escapeAttr(template.tags.join(" "))}">
  <div class="template-card-top">
    <h2>${escapeHtml(template.title)}</h2>
    <p>${escapeHtml(template.fit)}</p>
  </div>
  <div class="tag-row">${template.modules.map((tag) => `<span>${escapeHtml(tag)}</span>`).join("")}</div>
  <div class="card-actions">
    <a class="button compact" href="${escapeAttr(template.href)}">看蓝图</a>
    <a class="button compact ghost-light" href="${escapeAttr(template.runnable)}">看实现</a>
  </div>
</article>`;
}

function renderStarterProfileCard(profile, active = false) {
  return `<article class="starter-profile-card reveal${active ? " active" : ""}" data-starter-profile="${escapeAttr(profile.type)}" data-summary="${escapeAttr(profile.summary)}" data-command="${escapeAttr(profile.command)}">
  <div>
    <p class="eyebrow">${escapeHtml(profile.type)}</p>
    <h2>${escapeHtml(profile.title)}</h2>
    <p>${escapeHtml(profile.summary)}</p>
  </div>
  <ul>${profile.gates.map((gate) => `<li>${escapeHtml(gate)}</li>`).join("")}</ul>
  <div class="card-actions">
    <a class="button compact" href="${escapeAttr(profile.blueprint)}">看蓝图</a>
    <a class="button compact ghost-light" href="${escapeAttr(profile.runnable)}">看实现</a>
  </div>
</article>`;
}

function renderStarterOutputCard([title, description]) {
  return `<article class="starter-output-card reveal">
  <strong>${escapeHtml(title)}</strong>
  <p>${escapeHtml(description)}</p>
</article>`;
}

function renderPlannerProfileOption(profile) {
  return `<option value="${escapeAttr(profile.type)}" data-focus="${escapeAttr(profile.focus)}" data-risk="${escapeAttr(profile.risk)}">${escapeHtml(profile.title)}</option>`;
}

function renderPlannerStageOption(stage) {
  return `<option value="${escapeAttr(stage.id)}" data-focus="${escapeAttr(stage.focus)}" data-window="${escapeAttr(stage.window)}" data-risk="${escapeAttr(stage.risk)}">${escapeHtml(stage.label)}</option>`;
}

function renderPlannerTeamOption(team) {
  return `<option value="${escapeAttr(team.id)}" data-focus="${escapeAttr(team.focus)}">${escapeHtml(team.label)}</option>`;
}

function renderPlannerTrackCard(track) {
  return `<article class="planner-track-card reveal${track.stage === "map" ? " active" : ""}" data-planner-track="${escapeAttr(track.stage)}">
  <div class="planner-track-top">
    <span>${escapeHtml(track.number)}</span>
    <h2>${escapeHtml(track.title)}</h2>
  </div>
  <div class="tag-row">${track.modules.map((moduleName) => `<span>${escapeHtml(moduleName)}</span>`).join("")}</div>
  <ul>${track.checks.map((check) => `<li>${escapeHtml(check)}</li>`).join("")}</ul>
  <div class="card-actions">${track.links.map(([label, href]) => `<a class="button compact ghost-light" href="${escapeAttr(href)}">${escapeHtml(label)}</a>`).join("")}</div>
</article>`;
}

function renderComposerProfileOption(profile) {
  return `<option value="${escapeAttr(profile.type)}" data-focus="${escapeAttr(profile.focus)}" data-command="${escapeAttr(profile.command)}" data-gates="${escapeAttr(profile.gates.join("|"))}">${escapeHtml(profile.title)}</option>`;
}

function renderComposerOption(option) {
  return `<option value="${escapeAttr(option.id)}" data-stack="${escapeAttr(option.stack)}" data-risk="${escapeAttr(option.risk)}" data-repos="${escapeAttr(option.repos.join("|"))}">${escapeHtml(option.label)}</option>`;
}

function renderComposerExtra(extra) {
  return `<label class="composer-option${extra.checked ? " active" : ""}">
  <input type="checkbox" data-composer-extra="${escapeAttr(extra.id)}" data-stack="${escapeAttr(extra.stack)}" data-risk="${escapeAttr(extra.risk)}" data-repos="${escapeAttr(extra.repos.join("|"))}"${extra.checked ? " checked" : ""}>
  <span>${escapeHtml(extra.label)}</span>
</label>`;
}

function renderMaturityGate(title, description) {
  return `<article class="maturity-card reveal">
  <strong>${escapeHtml(title)}</strong>
  <p>${escapeHtml(description)}</p>
</article>`;
}

function renderMaturityLevel([range, label, description]) {
  return `<article class="level-card reveal">
  <span>${escapeHtml(range)}</span>
  <strong>${escapeHtml(label)}</strong>
  <p>${escapeHtml(description)}</p>
</article>`;
}

function renderScorecardModule(moduleItem, moduleIndex) {
  return `<article class="scorecard-module reveal" data-score-module="${escapeAttr(moduleItem.module)}">
  <div class="scorecard-module-heading">
    <span>${escapeHtml(moduleItem.short)}</span>
    <h2>${escapeHtml(moduleItem.module)}</h2>
    <strong data-module-score>0/4</strong>
  </div>
  <div class="score-check-list">
    ${moduleItem.checks.map((check, checkIndex) => renderScoreCheck(moduleItem.module, moduleIndex, check, checkIndex)).join("")}
  </div>
</article>`;
}

function renderScoreCheck(moduleName, moduleIndex, check, checkIndex) {
  const id = `score-${moduleIndex}-${checkIndex}`;
  return `<label class="score-check" for="${escapeAttr(id)}">
    <input id="${escapeAttr(id)}" type="checkbox" data-score-check data-module="${escapeAttr(moduleName)}">
    <span>${escapeHtml(check)}</span>
  </label>`;
}

function renderRepositoryCard(repo) {
  const searchText = `${repo.name} ${repo.module} ${repo.category} ${repo.type} ${repo.learning}`.toLowerCase();
  return `<article class="repo-card reveal" data-module="${escapeAttr(repo.module)}" data-type="${escapeAttr(repo.type)}" data-search="${escapeAttr(searchText)}">
  <div class="repo-meta"><span>${escapeHtml(repo.module)}</span><span>${escapeHtml(repo.type)}</span></div>
  <h2><a href="${escapeAttr(repo.url)}">${escapeHtml(repo.name)}</a></h2>
  <p>${escapeHtml(repo.learning)}</p>
  <small>${escapeHtml(repo.category || "General")}</small>
</article>`;
}

function renderLinkColumn(title, links) {
  return `<div class="link-column reveal"><h3>${escapeHtml(title)}</h3>${links.map(([label, href]) => `<a href="${escapeAttr(href)}">${escapeHtml(label)}</a>`).join("")}</div>`;
}

function markdownToHtml(markdown) {
  const lines = markdown.split("\n");
  const html = [];
  let index = 0;

  while (index < lines.length) {
    const line = lines[index];

    if (line.trim() === "") {
      index += 1;
      continue;
    }

    if (line.startsWith("```")) {
      const language = line.slice(3).trim();
      const code = [];
      index += 1;
      while (index < lines.length && !lines[index].startsWith("```")) {
        code.push(lines[index]);
        index += 1;
      }
      index += 1;
      html.push(`<pre><code class="language-${escapeAttr(language)}">${escapeHtml(code.join("\n"))}</code></pre>`);
      continue;
    }

    if (line.startsWith("|") && lines[index + 1]?.startsWith("|")) {
      const table = [];
      while (index < lines.length && lines[index].startsWith("|")) {
        table.push(lines[index]);
        index += 1;
      }
      html.push(renderMarkdownTable(table));
      continue;
    }

    if (line.startsWith("- ")) {
      const items = [];
      while (index < lines.length && lines[index].startsWith("- ")) {
        items.push(lines[index].slice(2));
        index += 1;
      }
      html.push(`<ul>${items.map((item) => `<li>${inlineMarkdown(item)}</li>`).join("")}</ul>`);
      continue;
    }

    const orderedMatch = line.match(/^\d+\.\s+/);
    if (orderedMatch) {
      const items = [];
      while (index < lines.length && /^\d+\.\s+/.test(lines[index])) {
        items.push(lines[index].replace(/^\d+\.\s+/, ""));
        index += 1;
      }
      html.push(`<ol>${items.map((item) => `<li>${inlineMarkdown(item)}</li>`).join("")}</ol>`);
      continue;
    }

    const heading = line.match(/^(#{1,3})\s+(.*)$/);
    if (heading) {
      const level = heading[1].length;
      const text = heading[2].trim();
      html.push(`<h${level} id="${escapeAttr(slugify(text))}">${inlineMarkdown(text)}</h${level}>`);
      index += 1;
      continue;
    }

    html.push(`<p>${inlineMarkdown(line)}</p>`);
    index += 1;
  }

  return html.join("\n");
}

function renderMarkdownTable(lines) {
  const rows = lines
    .filter((line) => !/^\|\s*-+/.test(line))
    .map((line) => splitTableRow(line));
  const [header, ...body] = rows;

  if (!header) return "";

  return `<div class="table-wrap"><table><thead><tr>${header.map((cell) => `<th>${inlineMarkdown(cell)}</th>`).join("")}</tr></thead><tbody>${body
    .map((row) => `<tr>${row.map((cell) => `<td>${inlineMarkdown(cell)}</td>`).join("")}</tr>`)
    .join("")}</tbody></table></div>`;
}

function parseRepositoryCatalog(markdown) {
  const repositories = [];
  let section = "";

  for (const rawLine of markdown.split("\n")) {
    if (rawLine.startsWith("## ")) {
      section = rawLine.slice(3).trim();
      continue;
    }

    if (!rawLine.startsWith("|") || rawLine.includes("---")) continue;

    const cells = splitTableRow(rawLine);
    const linkCell = cells.find((cell) => cell.includes("github.com"));
    if (!linkCell) continue;

    const link = linkCell.match(/\[([^\]]+)\]\(([^)]+)\)/);
    if (!link) continue;

    const isModuleTable = cells.length >= 4;
    repositories.push({
      module: section,
      category: isModuleTable ? cells[0] : section,
      name: link[1],
      url: link[2],
      type: isModuleTable ? cells[2] : cells[1],
      learning: isModuleTable ? cells[3] : cells[2],
    });
  }

  return repositories;
}

function splitTableRow(row) {
  return row
    .trim()
    .replace(/^\|/, "")
    .replace(/\|$/, "")
    .split("|")
    .map((cell) => cell.trim());
}

function inlineMarkdown(value) {
  const tokens = [];
  const pushToken = (html) => {
    const marker = `@@TOKEN${tokens.length}@@`;
    tokens.push([marker, html]);
    return marker;
  };

  let output = String(value).replace(/`([^`]+)`/g, (_, code) => {
    return pushToken(`<code>${escapeHtml(code)}</code>`);
  });

  output = output.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, label, href) => {
    return pushToken(`<a href="${escapeAttr(resolveHref(href))}">${escapeHtml(label)}</a>`);
  });

  output = escapeHtml(output);

  tokens.forEach(([marker, html]) => {
    output = output.replaceAll(marker, html);
  });

  return output;
}

function resolveHref(href) {
  if (!href) return "#";
  if (/^(https?:|mailto:|#)/.test(href)) return href;
  if (href.endsWith(".html")) return href;

  const normalized = href.replace(/^(\.\.\/)+/, "").replace(/^\.\//, "");
  const [cleanPath, hash = ""] = normalized.split("#");
  const suffix = hash ? `#${hash}` : "";

  if (sourceOutputs.has(cleanPath)) return `${sourceOutputs.get(cleanPath)}${suffix}`;
  if (cleanPath.endsWith(".md")) return `${githubBase}/blob/main/${cleanPath}${suffix}`;
  return `${githubBase}/tree/main/${cleanPath}${suffix}`;
}

function copyAssets(outDir) {
  const assetsDir = path.join(root, "docs-site/assets");
  const outputAssetsDir = path.join(outDir, "assets");
  fs.mkdirSync(outputAssetsDir, { recursive: true });

  if (fs.existsSync(assetsDir)) {
    fs.cpSync(assetsDir, outputAssetsDir, { recursive: true });
  }
}

function read(filePath) {
  return fs.readFileSync(path.join(root, filePath), "utf8");
}

function unique(values) {
  return [...new Set(values)];
}

function slugify(value) {
  return String(value).trim().toLowerCase().replace(/\s+/g, "-").replace(/[^\p{L}\p{N}-]/gu, "");
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function escapeAttr(value) {
  return escapeHtml(value);
}

function parseArgs(args) {
  const outIndex = args.indexOf("--out");
  if (outIndex === -1) {
    return { outDir: "" };
  }
  return { outDir: args[outIndex + 1] || "" };
}

if (fileURLToPath(import.meta.url) === path.resolve(process.argv[1] || "")) {
  try {
    const result = buildDocsSite(parseArgs(process.argv.slice(2)));
    console.log(`Built docs site at ${result.outDir}`);
    for (const page of result.pages) {
      console.log(`- ${page}`);
    }
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}
