# Role Based Learning Paths

按你的目标选择路线。每条路线都包含阅读、实践和完成标准。

## Beginner: Understand Complete Software

适合：刚开始理解软件开发全貌的人。

Path:

1. [模块总览](../modules/README.md)
2. 10 个模块 README。
3. [GitHub 仓库索引](../catalog/github-repositories.md)
4. [可运行示例](../examples/full-stack-mini-app/README.md)
5. [10 大模块关系图](../architecture/diagrams/10-module-system.md)

Done when:

- 能说清楚完整软件的 10 个模块。
- 能解释登录、数据库、后端、前端、安全、部署和测试如何连接。
- 能运行 full-stack-mini-app 并看懂主要 API。

## Full-Stack Builder

适合：想从零做一个 Web 产品的人。

Path:

1. [SaaS 订阅系统模板](../templates/complete-apps/saas-subscription/README.md)
2. [full-stack-mini-app](../examples/full-stack-mini-app/README.md)
3. [前后端决策树](../decision-guides/frontend-backend-decision-tree.md)
4. [数据库决策树](../decision-guides/database-decision-tree.md)
5. [项目启动包](../project-kickoff/README.md)

Done when:

- 能设计一个登录、数据库、API、页面和部署都齐全的小项目。
- 能写出初版数据表和 API 合同。
- 能用测试覆盖注册、登录和核心业务流程。

## Backend And Database Developer

适合：重点学习 API、数据建模、权限和业务逻辑的人。

Path:

1. [数据库层](../modules/03-database-layer/README.md)
2. [后端系统](../modules/04-backend-system/README.md)
3. [账号系统](../modules/02-account-system/README.md)
4. [安全](../modules/06-security/README.md)
5. [API 合同模板](../project-kickoff/templates/api-contract.md)
6. [数据模型模板](../project-kickoff/templates/data-model.md)

Done when:

- 能为一个产品设计核心表结构。
- 能说明每个 API 的权限边界。
- 能设计审计日志、数据校验和错误格式。

## Frontend And Admin Builder

适合：重点学习页面、管理后台和交互体验的人。

Path:

1. [前端/客户端](../modules/05-frontend-client/README.md)
2. [管理后台模板](../templates/complete-apps/admin-dashboard/README.md)
3. [权限矩阵模板](../project-kickoff/templates/permission-matrix.md)
4. [React Admin、Refine、Ant Design Pro 相关仓库](../catalog/github-repositories.md)
5. [full-stack-mini-app public 页面](../examples/full-stack-mini-app/public/index.html)

Done when:

- 能列出一个后台需要的列表、详情、编辑、审核和日志页面。
- 能处理加载、错误、空状态和无权限状态。
- 能解释前端隐藏按钮不等于权限控制。

## DevOps And Security Learner

适合：想学习上线、监控、备份、恢复和安全发布的人。

Path:

1. [运维部署](../modules/07-operations-deployment/README.md)
2. [安全](../modules/06-security/README.md)
3. [Operations Runbooks](../operations/README.md)
4. [Operations Lifecycle](../architecture/diagrams/operations-lifecycle.md)
5. [Security Release Runbook](../operations/runbooks/security-release.md)
6. [Monitoring And Alerting Runbook](../operations/runbooks/monitoring-alerting.md)

Done when:

- 能写出发布、回滚、备份恢复和事故响应计划。
- 能列出登录、支付、权限和数据库变更的安全风险。
- 能解释 RPO、RTO、健康检查、错误率和报警质量。

## SaaS Builder

适合：想做收费工具、B2B 产品或 AI 工具的人。

Path:

1. [SaaS 订阅系统模板](../templates/complete-apps/saas-subscription/README.md)
2. [SaaS Reference Architecture](../architecture/diagrams/saas-reference-architecture.md)
3. [SaaS Kickoff Example](../project-kickoff/examples/saas-kickoff-example.md)
4. [Cal DIY Teardown](../case-studies/real-projects/cal-diy/README.md)
5. [Dub Teardown](../case-studies/real-projects/dub/README.md)

Done when:

- 能设计免费、付费、团队、订阅、账单和用量限制。
- 能说明支付 webhook、发票、退款和权限如何测试。
- 能启动一个 SaaS 项目计划。

## AI Knowledge Base Builder

适合：想做文档问答、知识库、AI 搜索的人。

Path:

1. [AI 知识库模板](../templates/complete-apps/ai-knowledge-base/README.md)
2. [AI Knowledge Base Reference Architecture](../architecture/diagrams/ai-knowledge-base-reference-architecture.md)
3. [数据库决策树](../decision-guides/database-decision-tree.md)
4. [Supabase Teardown](../case-studies/real-projects/supabase/README.md)
5. [Appwrite Teardown](../case-studies/real-projects/appwrite/README.md)

Done when:

- 能解释文档上传、解析、分块、向量化、检索、生成和引用。
- 能说明权限过滤为什么必须在检索前后都处理。
- 能设计 AI 成本、延迟、质量和安全检查。

