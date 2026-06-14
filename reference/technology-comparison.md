# Technology Comparison

这个文件用于快速比较常见技术选择。它不是绝对答案，真正选型还要结合团队、预算、合规和生产约束。

## Auth

| Choice | Best For | Tradeoff |
| --- | --- | --- |
| Auth.js / Better Auth | Web 应用快速接入登录 | 企业 SSO 和复杂组织权限需要额外设计 |
| Keycloak | 企业 SSO、OIDC、SAML | 部署和配置成本较高 |
| Ory Kratos | 身份自服务流程 | 需要理解 Ory 生态和配置 |
| Logto / Casdoor | 身份平台和 SSO | 需要评估部署和生态适配 |

## Database

| Choice | Best For | Tradeoff |
| --- | --- | --- |
| PostgreSQL | 大多数业务系统 | 需要设计 schema、迁移和索引 |
| MySQL | 传统 Web、电商、团队熟悉场景 | PostgreSQL 扩展能力更强 |
| MongoDB | 灵活文档数据 | 关系和事务复杂时要谨慎 |
| Redis | 缓存、限流、队列、Session | 不应作为唯一核心数据源 |
| Meilisearch / Typesense | 轻量搜索 | 大规模复杂分析不如 Elasticsearch |
| Qdrant / Milvus / pgvector | AI 语义检索 | 要保留原始文档以便重建 |

## Backend

| Choice | Best For | Tradeoff |
| --- | --- | --- |
| Next.js API / Server Actions | TypeScript 全栈产品 | 后端复杂时可能需要拆服务 |
| NestJS | TypeScript 企业后端 | 框架结构较重 |
| FastAPI | Python API 和 AI 服务 | 大型业务系统需要组织好模块 |
| Django REST Framework | Python CRUD 和后台生态 | 灵活性和性能要按项目评估 |
| Spring Boot | 企业 Java 系统 | 上手和配置成本更高 |

## Frontend

| Choice | Best For | Tradeoff |
| --- | --- | --- |
| Next.js | SaaS、内容站、全栈 React | 框架边界需要理解清楚 |
| React + Vite | 快速 SPA 和工具 | 服务端渲染和路由需要自己设计 |
| Vue / Nuxt | Vue 生态项目 | 团队和生态偏好影响大 |
| React Admin / Refine | 管理后台和 CRUD | 定制复杂交互时要看框架边界 |
| Flutter / React Native | 移动 App | Web 与移动共用逻辑有限 |
| CopilotKit / AG-UI | 产品内 AI Copilot、Agent UI、Generative UI | 需要设计工具权限、状态同步、人机确认和安全边界 |

## Deployment

| Choice | Best For | Tradeoff |
| --- | --- | --- |
| Vercel / Render / Railway | 快速上线 Web 产品 | 平台限制和成本要评估 |
| Docker Compose | 小团队、多服务、自托管 | 高可用和扩容能力有限 |
| Kubernetes | 企业、高可用、复杂服务 | 运维成本高 |
| Serverless | 事件处理、低运维 | 冷启动、限制和可观测性要评估 |
| Coolify / CapRover / Dokku | 自托管 PaaS | 仍需要维护服务器 |
