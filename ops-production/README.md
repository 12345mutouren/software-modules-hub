# Operations Productionization

第十五阶段运维生产化。

目标：把部署后的长期运行要求整理成可执行的标准：环境变量、备份、监控报警、发布回滚和灾难恢复演练。

## Files

| File | Purpose |
| --- | --- |
| [env-var-standard.md](env-var-standard.md) | 环境变量命名和分级标准 |
| [backup-script-plan.md](backup-script-plan.md) | 备份脚本和恢复计划 |
| [monitoring-alerting-template.md](monitoring-alerting-template.md) | 监控和报警模板 |
| [release-rollback-script.md](release-rollback-script.md) | 发布和回滚脚本模板 |
| [disaster-recovery-drill.md](disaster-recovery-drill.md) | 灾难恢复演练 |

## Production Readiness Rule

A project is not production-ready until it can answer:

- What are the required environment variables?
- How are secrets stored and rotated?
- How are database backups created and restored?
- Which metrics alert humans?
- How do we roll back a bad release?
- How do we recover if the primary server or database fails?

