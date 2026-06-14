# Code Foundation Packages

这些包把仓库从“模块说明”推进到“可复用底层代码”。

它们不复制 React、Auth.js、Prisma 或 CopilotKit 的源码，而是提供完整软件常见底层边界：核心类型、认证、权限、安全、数据库适配、数据、API 和审计。后续可以把 SQLite 适配器替换成 PostgreSQL/Prisma，把 Session 替换成真实 Cookie/JWT，把 API 挂到 Node.js、Next.js 或 Fastify。

## Packages

| Package | Purpose |
| --- | --- |
| `packages/core` | `AppError`、断言、ID 工厂、系统时钟、内存 Repository、审计日志 |
| `packages/security` | 密码策略、scrypt 密码哈希、密码验证、登录限流、HTML 转义 |
| `packages/auth` | 注册、登录、Session、RBAC 权限校验、审计事件 |
| `packages/database` | 迁移账本、表注册、唯一索引、事务、JSON 文件适配器和 SQLite SQL 适配器 |
| `packages/data` | User、Session、Role、AuditLog、Content、ExportJob 模型和 Repository |
| `packages/api` | 健康检查、认证、内容、审核、导出、审计日志 API 路由 |

## Run Tests

```bash
npm run test:code-foundation
npm run test:database
npm run test:data-api
```

## Design Boundaries

- `core` 不知道账号、业务或 UI。
- `security` 只处理安全原语，不保存用户。
- `auth` 组合 `core` 和 `security`，但不关心具体业务对象。
- `database` 定义迁移、适配器、事务和通用 Repository 工厂，不关心业务模型。
- `data` 定义模型和业务 Repository，不关心 HTTP。
- `api` 组合 `auth`、`security`、`data` 和服务层，但不绑定具体 Web 框架。
- 应用通过明确权限字符串调用底层包，例如 `content:review`、`export:create`、`audit:read`。

## Apps

- [admin-code-foundation](../apps/admin-code-foundation/README.md)
- [web-admin-app](../apps/web-admin-app/README.md)
