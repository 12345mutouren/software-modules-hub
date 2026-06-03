# Repository Tour

这份导览适合第一次打开仓库的人。

## 5-Minute Tour

| Step | Read | Why |
| --- | --- | --- |
| 1 | [README.md](../README.md) | 确认仓库目标和阶段范围 |
| 2 | [modules/README.md](../modules/README.md) | 建立完整软件的 10 层地图 |
| 3 | [examples/module-demos](../examples/module-demos/README.md) | 运行 10 大模块 demo |
| 4 | [reference/master-index.md](../reference/master-index.md) | 找到按用途组织的入口 |
| 5 | [catalog/github-repositories.md](../catalog/github-repositories.md) | 看每类模块有哪些代表仓库 |

## 30-Minute Tour

1. 阅读 [modules/README.md](../modules/README.md)，理解 10 个模块。
2. 任选 2 个模块深读，例如账号系统和数据库层。
3. 打开 [examples/module-demos](../examples/module-demos/README.md)，逐个运行 10 大模块 demo。
4. 打开 [examples/full-stack-mini-app](../examples/full-stack-mini-app/README.md)，对照代码看用户、会话、权限、CSRF、订单和文档。
5. 查看 [templates/complete-apps](../templates/complete-apps/README.md)，选一个最接近自己想做的软件类型。
6. 阅读 [architecture/README.md](../architecture/README.md)，把模板和运行时结构连起来。
7. 阅读 [decision-guides/README.md](../decision-guides/README.md)，用决策树做技术选择。
8. 打开 [project-kickoff/README.md](../project-kickoff/README.md)，开始填项目启动模板。

## Builder Path

| Goal | Files |
| --- | --- |
| 从零想一个软件 | `project-kickoff/templates/product-brief.md`、`decision-guides/software-type-selector.md` |
| 逐个运行模块 demo | `examples/module-demos/README.md`、`examples/module-demos/src/module-demos.mjs` |
| 生成项目启动包 | `starter-generator/README.md`、`starter-generator/create-starter.mjs` |
| 设计账号和权限 | `modules/02-account-system/README.md`、`project-kickoff/templates/permission-matrix.md` |
| 设计数据库 | `modules/03-database-layer/README.md`、`project-kickoff/templates/data-model.md` |
| 设计 API | `modules/04-backend-system/README.md`、`project-kickoff/templates/api-contract.md` |
| 设计上线流程 | `operations/runbooks/deployment-checklist.md`、`project-kickoff/templates/launch-plan.md` |
| 做质量检查 | `quality/README.md`、`tools/verify-repo.mjs` |

## Maintainer Path

| Goal | Files |
| --- | --- |
| 新增阶段 | `showcase/release-playbook.md`、`checklists/phase-*.md`、`audits/phase-*.md` |
| 新增模块内容 | `templates/module-template.md`、`modules/*/README.md` |
| 新增真实项目拆解 | `case-studies/real-projects/README.md` |
| 新增自动校验 | `tools/verify-repo.mjs`、`quality/automated-checks.md` |
| 更新发布记录 | `CHANGELOG.md` |

## Reading Rule

不要试图一次读完所有文件。

先选一个目标：

- 学概念：从模块和术语表开始。
- 做项目：从模板和项目启动包开始。
- 学架构：从架构图和真实项目案例开始。
- 准备维护：从质量门、发布手册和审计记录开始。
