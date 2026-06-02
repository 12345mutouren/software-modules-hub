# Database Decision Tree

数据库选择从数据形态开始，不从流行度开始。

## Primary Store

| 数据类型 | 推荐 |
| --- | --- |
| 用户、订单、权限、业务记录 | PostgreSQL 或 MySQL |
| 强关系、事务、报表 | PostgreSQL |
| 灵活文档、字段变化频繁 | MongoDB |
| 临时状态、验证码、限流、队列 | Redis |
| 全文搜索、筛选、排序 | Meilisearch、Typesense、Elasticsearch |
| 图片、视频、附件、导出文件 | S3、Supabase Storage、SeaweedFS |
| AI 语义检索 | pgvector、Qdrant、Milvus |

## Default Stack

大多数 Web 软件默认可以从这里开始：

```text
PostgreSQL + Redis + Object Storage
```

需要搜索时加：

```text
Meilisearch or Typesense
```

需要 AI 知识库时加：

```text
pgvector or Qdrant
```

## ORM And Migrations

| 技术栈 | 推荐 |
| --- | --- |
| TypeScript | Prisma、Drizzle、TypeORM |
| Python | SQLAlchemy、Django ORM |
| Java | JPA/Hibernate、Flyway |
| SQL-first | Flyway、Liquibase |

## Data Boundary Rules

- 用户数据、订单、权限优先放关系型数据库。
- 文件不要直接塞进关系型数据库，保存到对象存储，数据库保存元数据。
- 搜索索引可以重建，不要把它当唯一数据源。
- 缓存可以丢失，不能把核心业务状态只放 Redis。
- 向量库要保留原始文档和分块，否则无法重建。

