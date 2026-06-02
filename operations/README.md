# Operations

第五阶段运维手册目录。

这些 Runbook 用来回答：一个软件从本地示例走向真实上线时，应该怎样部署、验证、监控、备份、恢复和处理事故。

## Runbooks

| Runbook | 说明 |
| --- | --- |
| [local-to-production.md](runbooks/local-to-production.md) | 从本地开发到生产环境 |
| [deployment-checklist.md](runbooks/deployment-checklist.md) | 每次发布前后的检查 |
| [backup-restore.md](runbooks/backup-restore.md) | 数据备份和恢复演练 |
| [incident-response.md](runbooks/incident-response.md) | 事故响应流程 |
| [security-release.md](runbooks/security-release.md) | 安全相关发布流程 |
| [monitoring-alerting.md](runbooks/monitoring-alerting.md) | 监控和报警设计 |

## 最小生产能力

一个能上线的软件至少要能回答：

- 服务运行在哪里。
- 数据存在哪里。
- 密钥如何管理。
- 如何发布。
- 如何回滚。
- 如何监控错误和性能。
- 数据库如何备份和恢复。
- 出事故谁处理，怎么处理。
- 用户和管理员如何知道发生了什么。

