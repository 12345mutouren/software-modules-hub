# 10 文档

文档模块回答：用户、开发者、管理员和运营如何理解软件、使用软件、维护软件。

一个软件没有文档，短期看只是少写了几页文字，长期看会变成 onboarding 慢、协作混乱、维护成本高。

## 核心能力

- 产品说明。
- 用户使用文档。
- API 文档。
- 数据库结构文档。
- 部署文档。
- 管理员操作手册。
- 常见问题 FAQ。

## 文档类别

| 类别 | 读者 | 内容 |
| --- | --- | --- |
| 产品说明 | 用户、团队、投资人、开发者 | 软件目标、核心功能、适用场景 |
| 用户使用文档 | 普通用户、会员、企业用户 | 注册、登录、核心功能、设置 |
| API 文档 | 前端、移动端、第三方开发者 | 接口、参数、响应、错误码 |
| 数据库结构文档 | 后端、数据、运维 | 表、字段、关系、索引 |
| 部署文档 | 开发者、运维 | 环境变量、构建、发布、回滚 |
| 管理员操作手册 | 管理员、客服、运营 | 用户管理、权限、审核、配置 |
| 常见问题 FAQ | 所有用户 | 常见问题和解决方式 |
| 变更日志 | 用户、团队 | 新功能、修复、破坏性变更 |
| 贡献文档 | 开源贡献者 | 分支、提交、测试、代码规范 |
| 安全文档 | 管理员、企业客户 | 数据、权限、隐私、合规 |

## API 文档类别

| 类别 | 说明 |
| --- | --- |
| OpenAPI/Swagger | REST API 标准描述 |
| GraphQL Schema | GraphQL 类型和查询 |
| SDK 文档 | 语言 SDK 使用方式 |
| Webhook 文档 | 事件、签名、重试 |
| 错误码文档 | 错误类型、含义、处理方式 |

## 数据库文档类别

| 类别 | 说明 |
| --- | --- |
| ER 图 | 表和关系 |
| 表结构 | 字段、类型、默认值、约束 |
| 索引说明 | 查询性能和唯一约束 |
| 迁移说明 | 数据库版本变化 |
| 数据保留 | 删除、归档、备份策略 |

## 常见流程

1. 产品层定义目标和角色。
2. 每个模块沉淀文档入口。
3. API 和数据库文档尽量从代码或 schema 自动生成。
4. 部署文档跟随环境变量和发布流程更新。
5. 管理员手册覆盖后台操作和风险操作。
6. FAQ 根据真实用户问题持续补充。

## 代表 GitHub 仓库

| 仓库 | 类型 | 适合学习 |
| --- | --- | --- |
| [facebook/docusaurus](https://github.com/facebook/docusaurus) | tooling | 文档站点 |
| [mkdocs/mkdocs](https://github.com/mkdocs/mkdocs) | tooling | Python 文档站点 |
| [squidfunk/mkdocs-material](https://github.com/squidfunk/mkdocs-material) | tooling | Material 风格文档 |
| [swagger-api/swagger-ui](https://github.com/swagger-api/swagger-ui) | tooling | OpenAPI 文档 UI |
| [Redocly/redoc](https://github.com/Redocly/redoc) | tooling | OpenAPI 文档渲染 |
| [scalar/scalar](https://github.com/scalar/scalar) | tooling | API 文档和客户端 |
| [k1LoW/tbls](https://github.com/k1LoW/tbls) | tooling | 数据库文档生成 |
| [schemaspy/schemaspy](https://github.com/schemaspy/schemaspy) | tooling | 数据库结构文档 |
| [BookStackApp/BookStack](https://github.com/BookStackApp/BookStack) | platform | 内部知识库 |
| [requarks/wiki](https://github.com/requarks/wiki) | platform | Wiki 文档系统 |

## 设计检查清单

- [ ] 是否有产品说明。
- [ ] 是否有用户使用文档。
- [ ] 是否有 API 文档。
- [ ] 是否有数据库结构文档。
- [ ] 是否有部署文档。
- [ ] 是否有管理员操作手册。
- [ ] 是否有 FAQ。
- [ ] 是否有变更日志。
- [ ] 是否有贡献说明。
- [ ] 是否有安全和隐私说明。

