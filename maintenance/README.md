# Maintenance

第 24 阶段持续更新体系。

目标：让 v1.1 之后的仓库可以继续维护 GitHub 仓库索引、真实项目案例、模板和质量门，而不是停在一次性整理。

## Files

| File | Purpose |
| --- | --- |
| [refresh-plans/github-repository-index.md](refresh-plans/github-repository-index.md) | GitHub 仓库索引刷新计划 |
| [refresh-plans/case-study-refresh.md](refresh-plans/case-study-refresh.md) | 真实项目案例刷新计划 |
| [refresh-plans/template-refresh.md](refresh-plans/template-refresh.md) | 模板刷新计划 |
| [release-cadence.md](release-cadence.md) | 后续发布节奏 |
| [freshness-audit.md](freshness-audit.md) | Freshness 审计说明 |

## Automated Check

```bash
npm run audit:freshness
```

The check validates that key maintenance files and catalog sources are present.

