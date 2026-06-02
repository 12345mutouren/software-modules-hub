# Deployment Decision Tree

部署选择取决于你想管理多少基础设施。

## Quick Choices

| 场景 | 推荐 |
| --- | --- |
| Next.js Web 产品 | Vercel、Render、Railway、Fly.io |
| 多服务应用 | Docker Compose |
| 企业/高可用/复杂服务 | Kubernetes |
| 小函数或事件处理 | Serverless |
| 自己控制服务器但想简单部署 | Coolify、CapRover、Dokku |
| 内部工具 | Docker Compose + 内网/VPN |

## Environment Strategy

| 阶段 | 最小要求 |
| --- | --- |
| Local | 能启动、能测试、能重置数据 |
| Development | 团队联调、非生产密钥 |
| Staging | 接近生产、跑 E2E、验证发布 |
| Production | 域名、HTTPS、备份、监控、报警、回滚 |

## Production Minimum

- 域名和 HTTPS。
- 数据库备份。
- 环境变量和密钥管理。
- 日志和错误监控。
- 健康检查。
- 发布和回滚流程。
- 事故响应 Runbook。

## Avoid This

- 不要只有生产环境。
- 不要把 `.env` 提交到 Git。
- 不要没有备份就改数据库结构。
- 不要没有回滚方案就发布关键路径变更。

