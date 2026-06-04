# Software Modules Hub

这是一个用于整理「完整软件应该包含什么」的知识地图、项目启动器和模板仓库。

它把完整软件拆成可理解、可比较、可扩展的模块体系，并把这些模块连接到可运行示例、项目生成器、完整软件模板、生产化资料和可部署文档站。

## 仓库目标

- 帮助初学者理解一个完整软件从产品、账号、数据库、后端、前端、安全、部署、测试、运营到文档的全貌。
- 给每个模块建立类别地图，而不是只列一个单一方案。
- 收集代表性 GitHub 仓库，区分库、框架、模板、平台、真实产品源码和学习示例。
- 为后续扩展最小示例、完整模板、实战组合方案打基础。

## 核心模块

1. [产品层](modules/01-product-layer/README.md)
2. [账号系统](modules/02-account-system/README.md)
3. [数据库层](modules/03-database-layer/README.md)
4. [后端系统](modules/04-backend-system/README.md)
5. [前端/客户端](modules/05-frontend-client/README.md)
6. [安全](modules/06-security/README.md)
7. [运维部署](modules/07-operations-deployment/README.md)
8. [测试](modules/08-testing/README.md)
9. [商业/运营功能](modules/09-business-operations/README.md)
10. [文档](modules/10-documentation/README.md)

## 主要入口

- [从这里开始](START-HERE.md)
- [模块总览](modules/README.md)
- [模块分类法](catalog/module-taxonomy.md)
- [GitHub 仓库索引](catalog/github-repositories.md)
- [可运行示例](examples/README.md)
- [模块 Demo 示例](examples/module-demos/README.md)
- [完整软件模板组合](templates/complete-apps/README.md)
- [项目启动器](https://12345mutouren.github.io/software-modules-hub/project-starter.html)
- [构建计划器](https://12345mutouren.github.io/software-modules-hub/planner.html)
- [成熟度评分](https://12345mutouren.github.io/software-modules-hub/maturity.html)
- [可运行模板](runnable-templates/README.md)
- [可运行应用模板](runnable-apps/README.md)
- [项目生成器](starter-generator/README.md)
- [真实项目案例研究](case-studies/README.md)
- [架构图](architecture/README.md)
- [决策指南](decision-guides/README.md)
- [项目启动包](project-kickoff/README.md)
- [学习路线](learning-paths/README.md)
- [快速参考](reference/README.md)
- [展示与发布材料](showcase/README.md)
- [生产级架构模板](production-templates/README.md)
- [安全与合规模板](security-compliance/README.md)
- [运维生产化](ops-production/README.md)
- [运维 Runbook](operations/README.md)
- [部署 Playground](deployment-playground/README.md)
- [文档站](docs-site/README.md)
- [文档站部署包](docs-site/deploy/README.md)
- [质量门](quality/README.md)
- [审计体系](auditing/README.md)
- [仓库索引在线复核](maintenance/online-audits/README.md)
- [持续更新体系](maintenance/README.md)
- [治理说明](GOVERNANCE.md)
- [项目状态](PROJECT-STATUS.md)
- [最终审查](FINAL-REVIEW.md)
- [v1.6.0 发布说明](releases/v1.6.0.md)
- [发布记录](CHANGELOG.md)
- [模块文档模板](templates/module-template.md)

## 如何使用

如果你刚开始学习，建议按这个顺序阅读：

1. 先读 [从这里开始](START-HERE.md)，按目标选择阅读路径。
2. 再读 [模块总览](modules/README.md)，建立完整软件的整体框架。
3. 遇到想深入的类别，去 [GitHub 仓库索引](catalog/github-repositories.md) 找代表项目。
4. 进入 [可运行示例](examples/README.md) 和 [模块 Demo 示例](examples/module-demos/README.md)，把模块地图和代码对应起来。
5. 阅读 [完整软件模板组合](templates/complete-apps/README.md)，选择一个真实软件方向继续深化。
6. 使用 [项目启动器](https://12345mutouren.github.io/software-modules-hub/project-starter.html)、[构建计划器](https://12345mutouren.github.io/software-modules-hub/planner.html)、[成熟度评分](https://12345mutouren.github.io/software-modules-hub/maturity.html)、[决策指南](decision-guides/README.md)、[项目启动包](project-kickoff/README.md) 和 [项目生成器](starter-generator/README.md)，把一个软件想法整理成可执行项目计划。
7. 用 [可运行模板](runnable-templates/README.md) 和 [可运行应用模板](runnable-apps/README.md) 快速学习实现方式。
8. 查看 [架构图](architecture/README.md)、[生产级架构模板](production-templates/README.md)、[安全与合规模板](security-compliance/README.md) 和 [运维生产化](ops-production/README.md)，准备上线。
9. 用 [文档站](docs-site/README.md)、[文档站部署包](docs-site/deploy/README.md)、[质量门](quality/README.md)、[审计体系](auditing/README.md) 和 [持续更新体系](maintenance/README.md) 做发布后的维护。

## 仓库类型说明

同一个软件模块在 GitHub 上通常会有多种类型的仓库：

| 类型 | 适合用途 | 例子 |
| --- | --- | --- |
| 库/框架 | 接入自己的项目，解决一个具体问题 | Auth.js、Prisma、Playwright |
| 模板/脚手架 | 克隆后快速开始一个完整项目 | Next.js SaaS Starter、Open SaaS |
| 平台/服务 | 自己部署一套完整系统 | Keycloak、Novu、Coolify |
| 真实产品源码 | 学习完整产品架构和模块组合 | Cal.com、Plane、Twenty |
| 学习示例 | 学习某个功能的最小写法 | Stripe samples、NextAuth example |

## 当前能力

- 知识地图：10 个完整软件模块、模块分类法、术语表、技术对比和常见坑。
- 参考资料：代表性 GitHub 仓库索引、真实项目案例研究、架构图和决策指南。
- 项目启动：产品简报、模块选择、权限矩阵、数据模型、API 合同、测试计划、发布计划和风险登记模板。
- 可运行材料：模块 Demo、完整应用方向模板、项目生成器、可运行技术栈模板和可运行业务应用模板。
- 项目启动：项目启动器、构建计划器、模板选择器、生成命令、启动包输出说明和第一版发布门槛。
- 成熟度评估：10 大模块 readiness scorecard、实时评分、等级判断和优先补强建议。
- 上线维护：生产级架构、安全合规、运维 Runbook、部署 Playground、产品化文档站、质量门、审计体系和持续更新体系。
