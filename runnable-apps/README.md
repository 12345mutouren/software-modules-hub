# Runnable Apps

第 25-28 阶段可运行应用模板。

目标：把 v1.1 的参考模板继续推进成多个可运行应用骨架。它们仍然保持无第三方依赖，方便在仓库质量门里稳定测试；真实项目可以在这些业务行为基础上替换为框架、数据库和部署平台。

## Apps

| Phase | App | Purpose |
| --- | --- | --- |
| 25 | [saas-starter-app](saas-starter-app/README.md) | SaaS 团队、订阅、权限和使用量 |
| 26 | [ecommerce-starter-app](ecommerce-starter-app/README.md) | 商品、库存、购物车、订单和优惠券 |
| 27 | [ai-knowledge-base-app](ai-knowledge-base-app/README.md) | 文档、切片、搜索、对话和引用 |
| 28 | [admin-dashboard-app](admin-dashboard-app/README.md) | 用户管理、内容审核、审计日志和导出 |

## Test

```bash
npm run test:runnable-apps
```

## Design Rule

- Keep each app dependency-free.
- Cover business behavior with tests.
- Keep production concerns documented but not hidden in fake integrations.
- Use these apps as implementation starting points, then move to real frameworks and databases.

