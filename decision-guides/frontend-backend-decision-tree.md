# Frontend And Backend Decision Tree

前后端选择先看团队能力、产品复杂度和上线方式。

## Frontend

| 场景 | 推荐 |
| --- | --- |
| Web SaaS | Next.js、React |
| 管理后台 | React Admin、Refine、Ant Design Pro |
| 内容站或社区 | Next.js、Vue/Nuxt |
| 移动 App | Flutter、React Native |
| 桌面软件 | Tauri、Electron |
| 快速原型 | Vite + React/Vue |

## Backend

| 场景 | 推荐 |
| --- | --- |
| TypeScript 全栈 | Next.js API/Server Actions、NestJS、tRPC |
| Python API | FastAPI、Django REST Framework |
| 企业 Java | Spring Boot |
| PHP Web | Laravel |
| 内部 CRUD | NestJS/FastAPI + Admin frontend |

## API Style

| 需求 | 推荐 |
| --- | --- |
| 通用 Web 和移动端 | REST |
| 前端复杂且字段变化多 | GraphQL |
| TypeScript 前后端同仓 | tRPC |
| 实时聊天/协作/通知 | WebSocket |
| 支付和第三方事件 | Webhook |

## Default Recommendation

如果你没有强约束：

```text
Next.js + PostgreSQL + Prisma/Drizzle + REST or tRPC
```

如果你做企业后台：

```text
React Admin/Refine + NestJS/FastAPI + PostgreSQL
```

## Avoid This

- 不要为了简单 CRUD 上复杂微服务。
- 不要在前端绕过后端直接修改敏感数据。
- 不要没有 API 文档。
- 不要忽略加载、错误、空状态和无权限状态。

