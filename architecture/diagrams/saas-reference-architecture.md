# SaaS Reference Architecture

适合：订阅工具、B2B 产品、AI 工具、开发者工具。

```mermaid
flowchart LR
  user["用户/团队成员"]
  admin["团队管理员"]
  web["Web App<br/>Dashboard、设置、账单"]
  auth["Auth<br/>登录、邀请、角色"]
  api["API Layer<br/>业务接口、权限校验"]
  billing["Billing<br/>计划、订阅、发票"]
  usage["Usage Metering<br/>用量统计、权益校验"]
  db["PostgreSQL<br/>用户、团队、订单、业务数据"]
  cache["Redis<br/>Session、限流、队列"]
  storage["Object Storage<br/>附件、导出文件"]
  webhook["Payment Webhooks"]
  analytics["Product Analytics"]
  monitor["Monitoring<br/>日志、错误、指标"]

  user --> web
  admin --> web
  web --> auth
  web --> api
  api --> auth
  api --> db
  api --> cache
  api --> storage
  api --> usage
  billing --> db
  webhook --> billing
  usage --> db
  web --> analytics
  api --> monitor
  db --> monitor
```

## Key Decisions

| Decision | Default |
| --- | --- |
| Main database | PostgreSQL |
| Session/cache | Redis or managed equivalent |
| Billing | Stripe or local payment provider |
| Analytics | PostHog or similar |
| Error monitoring | Sentry or OpenTelemetry-based stack |
| Deployment | Vercel/Render/Fly.io or Docker/Kubernetes |

## Production Notes

- 支付 webhook 必须服务端验签。
- 用量限制必须服务端校验。
- 团队数据必须按租户隔离。
- 账单、发票、退款和取消订阅要有文档。

