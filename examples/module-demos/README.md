# Module Demos

第十二阶段模块示例目录。

目标：把 10 大软件模块拆成一组可运行、可测试、可单独阅读的小示例。它们不是生产级实现，而是帮助学习者把“模块文档里的概念”对应到代码行为。

## Demo List

| Demo | Module | What It Shows |
| --- | --- | --- |
| `planProductFlow` | 产品层 | 用户、入口、核心功能、成功指标 |
| `createAccountSystem` | 账号系统 | 注册、邮箱验证、登录、会话、密码重置 |
| `createInMemoryDatabase` | 数据库层 | 表、插入、查询、索引、事务回滚 |
| `createApiRouter` | 后端系统 | 路由、认证、权限校验、统一响应 |
| `createFrontendState` | 前端/客户端 | 加载、错误、筛选、分页、订阅更新 |
| `createSecurityControls` | 安全 | HTML 转义、登录失败限制、CSRF token |
| `createOperationsChecklist` | 运维部署 | 环境变量、备份、报警、HTTPS 检查 |
| `createTestingMatrix` | 测试 | 单元、接口、权限、回归测试矩阵 |
| `createBusinessEngine` | 商业/运营功能 | 优惠券、订单、支付状态 |
| `generateDocumentation` | 文档 | API 和数据库文档生成 |

## Run

```bash
npm --prefix examples/module-demos test
```

Root quality gate also includes these tests:

```bash
npm test
```

## Files

| File | Purpose |
| --- | --- |
| `src/module-demos.mjs` | 10 个模块 demo 的实现 |
| `test/module-demos.test.mjs` | Node.js 内置测试 |
| `docs/module-map.md` | demo 到 10 大模块的映射 |

## Design Rules

- No third-party dependencies.
- Keep each demo small enough to read in isolation.
- Prefer clear behavior over framework-specific implementation.
- Cover every demo with tests.
- Use these demos to learn concepts, then return to templates and real projects for production architecture.

