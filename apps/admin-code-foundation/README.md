# Admin Code Foundation App

这个示例展示如何把 `packages/core`、`packages/security` 和 `packages/auth` 组合成一个可运行的管理后台底座。

## What It Runs

- 用户注册。
- 登录和 Session。
- RBAC 权限校验。
- 内容创建和审核。
- 数据导出任务。
- 操作审计日志。
- XSS 文本转义。
- 无权限访问阻断。

## Source

| File | Purpose |
| --- | --- |
| `src/app.mjs` | 组合底层包并暴露应用用例 |
| `test/app.test.mjs` | 覆盖注册、登录、审核、导出、审计和越权 |

## Run

```bash
npm --prefix apps/admin-code-foundation test
```

## Why This Exists

之前仓库已经有“管理后台应该有什么”的文档和小示例。

这个 app 的目标更进一步：让账号、权限、安全、审计这些底层能力真的以代码包形式被应用复用，并且被根级测试持续验证。
