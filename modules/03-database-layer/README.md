# 03 数据库层

数据库层回答：数据存在哪里，如何组织，如何查询，如何保护，如何恢复。

完整软件通常不会只有一种数据存储，而是根据数据特征组合关系型数据库、缓存、搜索、对象存储和其他专用数据库。

## 核心能力

- 保存用户、订单、权限和业务数据。
- 支持查询、筛选、排序、分页和统计。
- 管理表结构或数据结构变化。
- 支持缓存、搜索、文件和 AI 语义检索等场景。
- 支持备份、恢复和数据权限。

## 数据库类别

| 类别 | 代表 | 适合数据 |
| --- | --- | --- |
| 关系型数据库 | PostgreSQL、MySQL | 用户、订单、权限、业务数据 |
| 文档数据库 | MongoDB | 灵活结构、内容、配置、日志型文档 |
| 缓存数据库 | Redis | 验证码、登录状态、热点数据、限流 |
| 搜索数据库 | Elasticsearch、Meilisearch、Typesense | 全文搜索、筛选、排序、搜索建议 |
| 对象存储 | S3、OSS、COS、Supabase Storage、SeaweedFS | 图片、视频、附件、导出文件 |
| 向量数据库 | pgvector、Qdrant、Milvus、Weaviate | AI 搜索、知识库、语义检索 |
| 图数据库 | Neo4j | 复杂关系、推荐、权限关系 |
| 时间序列数据库 | InfluxDB、TimescaleDB | 指标、监控、传感器数据 |

## 常见数据表

| 表 | 作用 |
| --- | --- |
| users | 用户账号 |
| profiles | 用户资料 |
| roles | 角色 |
| permissions | 权限 |
| user_roles | 用户和角色关系 |
| sessions | 登录会话 |
| login_logs | 登录记录 |
| audit_logs | 操作日志 |
| business_records | 核心业务数据 |
| orders | 订单 |
| payments | 支付记录 |
| subscriptions | 会员订阅 |
| files | 文件元数据 |
| notifications | 通知记录 |
| settings | 系统或用户配置 |

## 数据访问类别

| 类别 | 说明 | 代表工具 |
| --- | --- | --- |
| ORM | 用对象或模型操作数据库 | Prisma、TypeORM、SQLAlchemy |
| Query Builder | 用代码构建 SQL | Knex、Kysely |
| 原生 SQL | 直接写 SQL | 复杂查询、性能敏感场景 |
| 数据迁移 | 管理表结构版本 | Flyway、Liquibase、Alembic |
| 数据种子 | 初始化测试或演示数据 | seed scripts |
| 数据备份 | 定期保存数据库快照 | pg_dump、mysqldump、云备份 |

## 常见流程

1. 产品层定义业务对象。
2. 数据库层设计表、字段、索引和关系。
3. 后端通过 ORM、Query Builder 或 SQL 访问数据。
4. 数据变化通过迁移文件管理。
5. 高频数据进入缓存，全文查询进入搜索数据库。
6. 文件进入对象存储，数据库只保存元数据。
7. 运维层定期备份并验证恢复。

## 代表 GitHub 仓库

| 仓库 | 类型 | 适合学习 |
| --- | --- | --- |
| [postgres/postgres](https://github.com/postgres/postgres) | platform | 关系型数据库核心 |
| [mysql/mysql-server](https://github.com/mysql/mysql-server) | platform | MySQL 数据库 |
| [mongodb/mongo](https://github.com/mongodb/mongo) | platform | 文档数据库 |
| [redis/redis](https://github.com/redis/redis) | platform | 缓存、队列、限流 |
| [elastic/elasticsearch](https://github.com/elastic/elasticsearch) | platform | 搜索和分析 |
| [meilisearch/meilisearch](https://github.com/meilisearch/meilisearch) | platform | 轻量全文搜索 |
| [typesense/typesense](https://github.com/typesense/typesense) | platform | 搜索服务 |
| [supabase/storage](https://github.com/supabase/storage) | platform | 对象存储服务 |
| [seaweedfs/seaweedfs](https://github.com/seaweedfs/seaweedfs) | platform | 分布式对象存储和文件系统 |
| [qdrant/qdrant](https://github.com/qdrant/qdrant) | platform | 向量搜索 |
| [milvus-io/milvus](https://github.com/milvus-io/milvus) | platform | 向量数据库 |
| [prisma/prisma](https://github.com/prisma/prisma) | library | TypeScript ORM |
| [drizzle-team/drizzle-orm](https://github.com/drizzle-team/drizzle-orm) | library | TypeScript SQL ORM |
| [typeorm/typeorm](https://github.com/typeorm/typeorm) | library | Node.js ORM |
| [sqlalchemy/sqlalchemy](https://github.com/sqlalchemy/sqlalchemy) | library | Python SQL 工具和 ORM |
| [flyway/flyway](https://github.com/flyway/flyway) | tooling | 数据库迁移 |
| [liquibase/liquibase](https://github.com/liquibase/liquibase) | tooling | 数据库变更管理 |

## 设计检查清单

- [ ] 是否明确每类数据用哪种存储。
- [ ] 是否有用户、角色、权限、登录记录、审计日志等基础表。
- [ ] 是否区分数据库数据和文件数据。
- [ ] 是否有索引、分页和查询性能考虑。
- [ ] 是否有迁移方案。
- [ ] 是否有测试数据或种子数据。
- [ ] 是否有备份和恢复方案。
- [ ] 是否有数据权限和删除策略。
