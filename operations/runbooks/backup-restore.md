# Backup And Restore Runbook

备份不是完成任务，能恢复才算完成。

## Backup Targets

| Target | Examples | Backup Strategy |
| --- | --- | --- |
| Relational database | PostgreSQL, MySQL | Daily snapshot plus point-in-time recovery if possible |
| Cache/session | Redis | Usually disposable, but queue state may need persistence |
| Object storage | S3, Supabase Storage | Versioning or lifecycle backup |
| Search index | Meilisearch, Typesense, Elasticsearch | Rebuild from source data or snapshot |
| Vector index | Qdrant, Milvus, pgvector | Snapshot or rebuild from document chunks |
| Secrets | API keys, certificates | Secret manager export policy |

## Backup Checklist

- [ ] 明确哪些数据必须备份。
- [ ] 明确备份频率。
- [ ] 明确保留时间。
- [ ] 明确备份存储位置。
- [ ] 备份文件加密。
- [ ] 备份权限受控。
- [ ] 有恢复演练。

## Restore Drill

至少定期演练：

1. 准备一个空的测试环境。
2. 从备份恢复数据库。
3. 恢复对象存储或使用测试替身。
4. 运行数据库迁移或校验脚本。
5. 启动应用。
6. 验证登录、查询、核心业务流程。
7. 记录恢复耗时和问题。

## Recovery Metrics

| Metric | Meaning |
| --- | --- |
| RPO | 最多能接受丢失多少数据 |
| RTO | 最多能接受多久恢复服务 |

## Common Failure Modes

- 备份文件存在但无法解密。
- 只备份了数据库，忘了文件存储。
- 搜索或向量索引无法重建。
- 恢复环境缺少密钥。
- 备份太旧，不满足业务要求。

