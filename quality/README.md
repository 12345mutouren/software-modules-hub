# Quality

第七阶段质量门目录。

目标：让这个仓库不只靠人工审计，也能通过脚本和 CI 持续检查关键结构。

## Quality Gates

| Gate | Command | What it checks |
| --- | --- | --- |
| Repository verification | `npm run verify` | 关键文件、阶段清单、模块章节、模板章节、案例章节、架构图、Runbook、速查和展示材料 |
| Example tests | `npm run test:examples` | 第二阶段可运行示例的 API、权限、CSRF 和业务流程 |
| Full test | `npm test` | 同时运行仓库验证和示例测试 |
| GitHub Actions | `.github/workflows/verify.yml` | 在 push 和 pull request 时运行 `npm test` |
| GitHub Actions template | `quality/github-actions-verify.yml` | workflow 的可复制备份模板 |

## Local Use

```bash
npm test
```

## GitHub Actions

当前仓库已经启用 workflow：

```text
.github/workflows/verify.yml
```

同时保留一份模板：

```text
quality/github-actions-verify.yml
```

注意：后续更新 `.github/workflows/*.yml` 需要 GitHub token 具备 `workflow` scope。

## Why This Matters

随着阶段越来越多，人工检查容易漏掉：

- 新增阶段忘了清单。
- 改目录后 README 链接还在旧位置。
- 模板缺少关键章节。
- 示例测试被破坏。
- 架构图或 Runbook 数量不符合预期。
- 展示和发布材料没有随新阶段同步更新。

自动化质量门让这些问题更早暴露。
