# Software Modules Hub

这是一个用于整理「完整软件应该包含什么」的知识地图仓库。

目标不是一开始就把所有模块都写成可运行代码，而是先把完整软件拆成可理解、可比较、可扩展的模块体系：每个模块有哪些类别、解决什么问题、常见实现方式、代表 GitHub 仓库、设计时要注意什么。

## 仓库目标

- 帮助初学者理解一个完整软件从产品、账号、数据库、后端、前端、安全、部署、测试、运营到文档的全貌。
- 给每个模块建立类别地图，而不是只列一个单一方案。
- 收集代表性 GitHub 仓库，区分库、框架、模板、平台、真实产品源码和学习示例。
- 为后续阶段补充最小示例、完整模板、实战组合方案打基础。

## 第一阶段范围

第一阶段是完整知识地图，不做最小可行版，也不只覆盖局部模块。

覆盖模块：

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

辅助索引：

- [模块总览](modules/README.md)
- [GitHub 仓库索引](catalog/github-repositories.md)
- [模块分类法](catalog/module-taxonomy.md)
- [第一阶段完成度清单](checklists/phase-1-completeness.md)
- [第二阶段完成度清单](checklists/phase-2-completeness.md)
- [可运行示例](examples/README.md)
- [完整软件模板组合](templates/complete-apps/README.md)
- [第三阶段完成度清单](checklists/phase-3-completeness.md)
- [真实项目案例研究](case-studies/README.md)
- [第四阶段完成度清单](checklists/phase-4-completeness.md)
- [架构图](architecture/README.md)
- [运维 Runbook](operations/README.md)
- [第五阶段完成度清单](checklists/phase-5-completeness.md)
- [决策指南](decision-guides/README.md)
- [项目启动包](project-kickoff/README.md)
- [第六阶段完成度清单](checklists/phase-6-completeness.md)
- [质量门](quality/README.md)
- [第七阶段完成度清单](checklists/phase-7-completeness.md)
- [学习路线](learning-paths/README.md)
- [第八阶段完成度清单](checklists/phase-8-completeness.md)
- [模块文档模板](templates/module-template.md)

## 如何使用

如果你刚开始学习，建议按这个顺序阅读：

1. 先读 [模块总览](modules/README.md)，建立完整软件的整体框架。
2. 再读 10 个模块文档，理解每一层有哪些类别。
3. 遇到想深入的类别，去 [GitHub 仓库索引](catalog/github-repositories.md) 找代表项目。
4. 用 [完成度清单](checklists/phase-1-completeness.md) 检查自己的软件设想是否缺模块。
5. 进入 [可运行示例](examples/README.md)，把模块地图和代码对应起来。
6. 阅读 [完整软件模板组合](templates/complete-apps/README.md)，选择一个真实软件方向继续深化。
7. 阅读 [真实项目案例研究](case-studies/README.md)，学习成熟开源项目如何组合这些模块。
8. 查看 [架构图](architecture/README.md) 和 [运维 Runbook](operations/README.md)，理解软件如何上线和长期维护。
9. 使用 [决策指南](decision-guides/README.md) 和 [项目启动包](project-kickoff/README.md)，把一个软件想法整理成可执行项目计划。
10. 运行 [质量门](quality/README.md)，确认仓库结构和示例测试仍然健康。
11. 按 [学习路线](learning-paths/README.md) 选择角色路径、30 天计划和毕业项目。

## 仓库类型说明

同一个软件模块在 GitHub 上通常会有多种类型的仓库：

| 类型 | 适合用途 | 例子 |
| --- | --- | --- |
| 库/框架 | 接入自己的项目，解决一个具体问题 | Auth.js、Prisma、Playwright |
| 模板/脚手架 | 克隆后快速开始一个完整项目 | Next.js SaaS Starter、Open SaaS |
| 平台/服务 | 自己部署一套完整系统 | Keycloak、Novu、Coolify |
| 真实产品源码 | 学习完整产品架构和模块组合 | Cal.com、Plane、Twenty |
| 学习示例 | 学习某个功能的最小写法 | Stripe samples、NextAuth example |

## 后续阶段

第一阶段完成后，可以继续扩展：

- 第二阶段：为每个模块补充最小可运行示例。
- 第三阶段：组合出多种完整软件模板，例如 SaaS、管理后台、电商、内容社区、AI 应用。
- 第四阶段：增加代码审计、架构图、部署流程和真实项目拆解。
- 第五阶段：补充架构图、部署流程、监控报警、备份恢复和事故响应 Runbook。
- 第六阶段：补充选型决策树、项目启动模板、ADR、权限矩阵、API/数据/安全/测试/发布计划。
- 第七阶段：补充自动化质量门、根级测试命令、仓库验证脚本和 GitHub Actions。
- 第八阶段：补充角色学习路线、30 天计划、实战练习、毕业项目和自评清单。
