# GitHub 仓库索引

这个索引按模块整理代表性 GitHub 仓库。它不是简单收藏夹，而是用于理解「同一个模块有哪些类别、每类可以看什么代码」。

仓库类型：

- library：库或 SDK。
- framework：框架。
- starter：模板或脚手架。
- platform：可独立部署的平台。
- product-source：真实产品源码。
- sample：单功能示例。
- tooling：开发、测试、部署、监控工具。

## 完整模板和真实产品

| 仓库 | 类型 | 适合学习 |
| --- | --- | --- |
| [nextjs/saas-starter](https://github.com/nextjs/saas-starter) | starter | SaaS 项目如何组合认证、数据库、支付和后台 |
| [wasp-lang/open-saas](https://github.com/wasp-lang/open-saas) | starter | SaaS 模板和商业功能 |
| [boxyhq/saas-starter-kit](https://github.com/boxyhq/saas-starter-kit) | starter | 企业 SaaS 基础能力 |
| [calcom/cal.diy](https://github.com/calcom/cal.diy) | product-source | 预约产品完整架构 |
| [makeplane/plane](https://github.com/makeplane/plane) | product-source | 项目管理产品架构 |
| [twentyhq/twenty](https://github.com/twentyhq/twenty) | product-source | CRM 产品架构 |
| [dubinc/dub](https://github.com/dubinc/dub) | product-source | 链接管理 SaaS |
| [supabase/supabase](https://github.com/supabase/supabase) | platform | 开源后端平台组合 |
| [appwrite/appwrite](https://github.com/appwrite/appwrite) | platform | 后端即服务平台 |

## 01 产品层

| 类别 | 仓库 | 类型 | 适合学习 |
| --- | --- | --- | --- |
| SaaS 产品 | [calcom/cal.diy](https://github.com/calcom/cal.diy) | product-source | 用户、团队、支付、后台如何组合 |
| 项目管理 | [makeplane/plane](https://github.com/makeplane/plane) | product-source | 工作空间、项目、任务、协作 |
| CRM | [twentyhq/twenty](https://github.com/twentyhq/twenty) | product-source | 对象模型、客户关系、后台 |
| 链接管理 | [dubinc/dub](https://github.com/dubinc/dub) | product-source | 小产品如何做成 SaaS |
| SaaS 模板 | [wasp-lang/open-saas](https://github.com/wasp-lang/open-saas) | starter | 从产品到商业化的基础结构 |

## 02 账号系统

| 类别 | 仓库 | 类型 | 适合学习 |
| --- | --- | --- | --- |
| Web 认证库 | [nextauthjs/next-auth](https://github.com/nextauthjs/next-auth) | library | OAuth、邮箱登录、会话 |
| TypeScript 认证 | [better-auth/better-auth](https://github.com/better-auth/better-auth) | library | 现代账号系统 |
| 企业身份平台 | [keycloak/keycloak](https://github.com/keycloak/keycloak) | platform | SSO、OIDC、SAML、MFA |
| 身份自服务 | [ory/kratos](https://github.com/ory/kratos) | platform | 注册、登录、账号恢复 |
| 认证平台 | [supertokens/supertokens-core](https://github.com/supertokens/supertokens-core) | platform | 登录、会话、无密码 |
| 身份平台 | [logto-io/logto](https://github.com/logto-io/logto) | platform | 登录体验和身份管理 |
| SSO 平台 | [casdoor/casdoor](https://github.com/casdoor/casdoor) | platform | OAuth、OIDC、SSO |
| 权限库 | [apache/casbin](https://github.com/apache/casbin) | library | RBAC、ABAC |
| 关系权限 | [openfga/openfga](https://github.com/openfga/openfga) | platform | ReBAC |
| 授权服务 | [Permify/permify](https://github.com/Permify/permify) | platform | 权限建模 |

## 03 数据库层

| 类别 | 仓库 | 类型 | 适合学习 |
| --- | --- | --- | --- |
| 关系型数据库 | [postgres/postgres](https://github.com/postgres/postgres) | platform | PostgreSQL |
| 关系型数据库 | [mysql/mysql-server](https://github.com/mysql/mysql-server) | platform | MySQL |
| 文档数据库 | [mongodb/mongo](https://github.com/mongodb/mongo) | platform | MongoDB |
| 缓存 | [redis/redis](https://github.com/redis/redis) | platform | Redis |
| 搜索 | [elastic/elasticsearch](https://github.com/elastic/elasticsearch) | platform | 搜索和分析 |
| 搜索 | [meilisearch/meilisearch](https://github.com/meilisearch/meilisearch) | platform | 轻量搜索 |
| 搜索 | [typesense/typesense](https://github.com/typesense/typesense) | platform | 搜索服务 |
| 对象存储 | [supabase/storage](https://github.com/supabase/storage) | platform | 对象存储服务 |
| 对象存储 | [seaweedfs/seaweedfs](https://github.com/seaweedfs/seaweedfs) | platform | 分布式对象存储和文件系统 |
| 向量数据库 | [qdrant/qdrant](https://github.com/qdrant/qdrant) | platform | 向量搜索 |
| 向量数据库 | [milvus-io/milvus](https://github.com/milvus-io/milvus) | platform | 向量数据库 |
| ORM | [prisma/prisma](https://github.com/prisma/prisma) | library | TypeScript ORM |
| ORM | [drizzle-team/drizzle-orm](https://github.com/drizzle-team/drizzle-orm) | library | SQL ORM |
| ORM | [typeorm/typeorm](https://github.com/typeorm/typeorm) | library | Node.js ORM |
| ORM | [sqlalchemy/sqlalchemy](https://github.com/sqlalchemy/sqlalchemy) | library | Python ORM |
| 迁移 | [flyway/flyway](https://github.com/flyway/flyway) | tooling | 数据库迁移 |
| 迁移 | [liquibase/liquibase](https://github.com/liquibase/liquibase) | tooling | 数据库变更 |

## 04 后端系统

| 类别 | 仓库 | 类型 | 适合学习 |
| --- | --- | --- | --- |
| Node API | [expressjs/express](https://github.com/expressjs/express) | framework | REST API |
| TypeScript 后端 | [nestjs/nest](https://github.com/nestjs/nest) | framework | 企业后端结构 |
| Python API | [fastapi/fastapi](https://github.com/fastapi/fastapi) | framework | API、校验、文档 |
| Django API | [encode/django-rest-framework](https://github.com/encode/django-rest-framework) | framework | REST API |
| Java 后端 | [spring-projects/spring-boot](https://github.com/spring-projects/spring-boot) | framework | Java 应用 |
| PHP 后端 | [laravel/laravel](https://github.com/laravel/laravel) | framework | Web 后端 |
| RPC | [trpc/trpc](https://github.com/trpc/trpc) | framework | TypeScript RPC |
| GraphQL | [graphql/graphql-js](https://github.com/graphql/graphql-js) | library | GraphQL |
| 实时通信 | [socketio/socket.io](https://github.com/socketio/socket.io) | library | WebSocket |
| 文件上传 | [transloadit/uppy](https://github.com/transloadit/uppy) | library | 上传组件 |
| 断点续传 | [tus/tus-js-client](https://github.com/tus/tus-js-client) | library | 大文件上传 |
| 通知 | [novuhq/novu](https://github.com/novuhq/novu) | platform | 多渠道通知 |
| 邮件 | [resend/react-email](https://github.com/resend/react-email) | library | 邮件模板 |
| 队列 | [taskforcesh/bullmq](https://github.com/taskforcesh/bullmq) | library | 异步任务 |

## 05 前端/客户端

| 类别 | 仓库 | 类型 | 适合学习 |
| --- | --- | --- | --- |
| React | [facebook/react](https://github.com/facebook/react) | library | UI 组件 |
| Vue | [vuejs/core](https://github.com/vuejs/core) | framework | Vue 应用 |
| Next.js | [vercel/next.js](https://github.com/vercel/next.js) | framework | 全栈 React |
| 构建工具 | [vitejs/vite](https://github.com/vitejs/vite) | tooling | 前端构建 |
| CSS | [tailwindlabs/tailwindcss](https://github.com/tailwindlabs/tailwindcss) | library | 原子化 CSS |
| UI 组件 | [shadcn-ui/ui](https://github.com/shadcn-ui/ui) | library | 组件示例 |
| 企业 UI | [ant-design/ant-design](https://github.com/ant-design/ant-design) | library | React 组件 |
| 管理后台 | [ant-design/ant-design-pro](https://github.com/ant-design/ant-design-pro) | starter | 后台模板 |
| 管理框架 | [marmelab/react-admin](https://github.com/marmelab/react-admin) | framework | CRUD 后台 |
| 管理框架 | [refinedev/refine](https://github.com/refinedev/refine) | framework | 内部工具 |
| AI Agent UI | [CopilotKit/CopilotKit](https://github.com/CopilotKit/CopilotKit) | framework | Agent 前端栈、Generative UI 和 AG-UI |
| 移动/桌面 | [flutter/flutter](https://github.com/flutter/flutter) | framework | 跨平台 |
| 移动 App | [facebook/react-native](https://github.com/facebook/react-native) | framework | React Native |
| 桌面 | [electron/electron](https://github.com/electron/electron) | framework | 桌面应用 |
| 桌面 | [tauri-apps/tauri](https://github.com/tauri-apps/tauri) | framework | 轻量桌面 |

## 06 安全

| 类别 | 仓库 | 类型 | 适合学习 |
| --- | --- | --- | --- |
| 安全清单 | [OWASP/CheatSheetSeries](https://github.com/OWASP/CheatSheetSeries) | documentation | Web 安全实践 |
| 漏洞练习 | [juice-shop/juice-shop](https://github.com/juice-shop/juice-shop) | sample | 常见漏洞 |
| 安全扫描 | [zaproxy/zaproxy](https://github.com/zaproxy/zaproxy) | tooling | 动态扫描 |
| 密钥扫描 | [gitleaks/gitleaks](https://github.com/gitleaks/gitleaks) | tooling | Secret scanning |
| 密钥扫描 | [trufflesecurity/trufflehog](https://github.com/trufflesecurity/trufflehog) | tooling | Secret scanning |
| 依赖安全 | [dependabot/dependabot-core](https://github.com/dependabot/dependabot-core) | tooling | 依赖更新 |
| JWT | [auth0/node-jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) | library | Token |
| JOSE | [panva/jose](https://github.com/panva/jose) | library | JWT、JWK、JWE |

## 07 运维部署

| 类别 | 仓库 | 类型 | 适合学习 |
| --- | --- | --- | --- |
| Compose | [docker/compose](https://github.com/docker/compose) | tooling | 多服务部署 |
| Kubernetes | [kubernetes/kubernetes](https://github.com/kubernetes/kubernetes) | platform | 容器编排 |
| Helm | [helm/helm](https://github.com/helm/helm) | tooling | K8s 部署 |
| IaC | [hashicorp/terraform](https://github.com/hashicorp/terraform) | tooling | 基础设施即代码 |
| 自托管 PaaS | [coollabsio/coolify](https://github.com/coollabsio/coolify) | platform | 应用部署 |
| 自托管 PaaS | [caprover/caprover](https://github.com/caprover/caprover) | platform | 应用部署 |
| Git 部署 | [dokku/dokku](https://github.com/dokku/dokku) | platform | Git push 部署 |
| 指标监控 | [prometheus/prometheus](https://github.com/prometheus/prometheus) | platform | 指标 |
| 监控面板 | [grafana/grafana](https://github.com/grafana/grafana) | platform | Dashboard |
| 错误监控 | [getsentry/sentry](https://github.com/getsentry/sentry) | platform | Error tracking |
| 可观测性 | [open-telemetry/opentelemetry-collector](https://github.com/open-telemetry/opentelemetry-collector) | tooling | 数据采集 |

## 08 测试

| 类别 | 仓库 | 类型 | 适合学习 |
| --- | --- | --- | --- |
| JS 单元测试 | [jestjs/jest](https://github.com/jestjs/jest) | tooling | 单元测试 |
| Vite 测试 | [vitest-dev/vitest](https://github.com/vitest-dev/vitest) | tooling | 单元测试 |
| Python 测试 | [pytest-dev/pytest](https://github.com/pytest-dev/pytest) | tooling | 单元测试 |
| E2E | [microsoft/playwright](https://github.com/microsoft/playwright) | tooling | 浏览器测试 |
| E2E | [cypress-io/cypress](https://github.com/cypress-io/cypress) | tooling | 浏览器测试 |
| 组件测试 | [testing-library/react-testing-library](https://github.com/testing-library/react-testing-library) | tooling | React 测试 |
| 组件文档 | [storybookjs/storybook](https://github.com/storybookjs/storybook) | tooling | 组件测试和文档 |
| 性能 | [grafana/k6](https://github.com/grafana/k6) | tooling | 压测 |
| 性能 | [locustio/locust](https://github.com/locustio/locust) | tooling | 压测 |
| 合约测试 | [pact-foundation/pact-js](https://github.com/pact-foundation/pact-js) | tooling | 服务契约 |
| 集成测试 | [testcontainers/testcontainers-node](https://github.com/testcontainers/testcontainers-node) | tooling | 容器化测试 |

## 09 商业/运营功能

| 类别 | 仓库 | 类型 | 适合学习 |
| --- | --- | --- | --- |
| 一次性支付 | [stripe-samples/accept-a-payment](https://github.com/stripe-samples/accept-a-payment) | sample | 支付 |
| 订阅支付 | [stripe-samples/checkout-single-subscription](https://github.com/stripe-samples/checkout-single-subscription) | sample | 订阅 |
| 电商 | [medusajs/medusa](https://github.com/medusajs/medusa) | platform | 商品、订单 |
| 电商 | [saleor/saleor](https://github.com/saleor/saleor) | platform | GraphQL 电商 |
| 发票 | [invoiceninja/invoiceninja](https://github.com/invoiceninja/invoiceninja) | product-source | 发票账单 |
| 产品分析 | [PostHog/posthog](https://github.com/PostHog/posthog) | platform | 埋点、漏斗 |
| 客服 | [chatwoot/chatwoot](https://github.com/chatwoot/chatwoot) | platform | 客服会话 |
| 工单 | [zammad/zammad](https://github.com/zammad/zammad) | platform | Ticket |
| 反馈 | [getfider/fider](https://github.com/getfider/fider) | platform | 用户反馈 |
| 自动化 | [n8n-io/n8n](https://github.com/n8n-io/n8n) | platform | 运营自动化 |
| 推荐 | [tensorflow/recommenders](https://github.com/tensorflow/recommenders) | library | 推荐系统 |

## 10 文档

| 类别 | 仓库 | 类型 | 适合学习 |
| --- | --- | --- | --- |
| 文档站 | [facebook/docusaurus](https://github.com/facebook/docusaurus) | tooling | 文档网站 |
| 文档站 | [mkdocs/mkdocs](https://github.com/mkdocs/mkdocs) | tooling | 文档网站 |
| 文档主题 | [squidfunk/mkdocs-material](https://github.com/squidfunk/mkdocs-material) | tooling | 文档主题 |
| API 文档 | [swagger-api/swagger-ui](https://github.com/swagger-api/swagger-ui) | tooling | OpenAPI |
| API 文档 | [Redocly/redoc](https://github.com/Redocly/redoc) | tooling | OpenAPI |
| API 文档 | [scalar/scalar](https://github.com/scalar/scalar) | tooling | API 文档和客户端 |
| 数据库文档 | [k1LoW/tbls](https://github.com/k1LoW/tbls) | tooling | 数据库结构 |
| 数据库文档 | [schemaspy/schemaspy](https://github.com/schemaspy/schemaspy) | tooling | 数据库结构 |
| 知识库 | [BookStackApp/BookStack](https://github.com/BookStackApp/BookStack) | platform | 内部文档 |
| Wiki | [requarks/wiki](https://github.com/requarks/wiki) | platform | Wiki |
