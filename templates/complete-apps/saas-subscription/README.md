# SaaS 订阅系统模板

适合：AI 工具、B2B 工具、开发者工具、在线设计工具、数据分析工具、会员型 Web 产品。

## 产品定位

SaaS 订阅系统的核心是：用户注册后使用某个在线能力，按免费、试用、订阅或企业合同获得不同权益。

典型目标：

- 让用户快速试用核心功能。
- 把高价值能力放到付费计划中。
- 支持团队、账单、发票和权限。
- 通过数据分析理解激活、留存、付费和流失。

## 用户角色

| 角色 | 能力 |
| --- | --- |
| 游客 | 查看公开页面、注册、登录 |
| 免费用户 | 使用基础功能、查看用量 |
| 会员用户 | 使用付费功能、管理订阅 |
| 团队管理员 | 邀请成员、管理角色、管理账单 |
| 超级管理员 | 管理用户、计划、订单、系统配置 |
| 客服/运营 | 查看用户状态、处理反馈和退款 |

## 10 模块组合

| 模块 | 设计重点 |
| --- | --- |
| 产品层 | 明确免费功能、付费功能、试用流程、升级路径 |
| 账号系统 | 邮箱/Google/GitHub 登录，团队邀请，RBAC |
| 数据库层 | 用户、团队、订阅、订单、用量、审计日志 |
| 后端系统 | 认证 API、业务 API、支付 webhook、用量统计、通知 |
| 前端/客户端 | 落地页、登录注册、Dashboard、账单页、团队设置 |
| 安全 | 密码哈希、Session/Cookie、CSRF、越权防护、支付签名校验 |
| 运维部署 | Web 托管、PostgreSQL、Redis、对象存储、监控和报警 |
| 测试 | 登录、权限、订阅、webhook、用量限制、E2E |
| 商业/运营 | 计划、订阅、优惠券、发票、客服、反馈、产品分析 |
| 文档 | 用户手册、API 文档、账单说明、管理员说明、FAQ |

## 推荐技术和参考仓库

| 类别 | 推荐 |
| --- | --- |
| 完整模板 | `nextjs/saas-starter`、`wasp-lang/open-saas`、`boxyhq/saas-starter-kit` |
| 账号 | `nextauthjs/next-auth`、`better-auth/better-auth`、`keycloak/keycloak` |
| 数据库 | PostgreSQL、Prisma、Drizzle、Redis |
| 支付 | `stripe-samples/checkout-single-subscription` |
| 分析 | `PostHog/posthog` |
| 错误监控 | `getsentry/sentry` |
| 测试 | Playwright、Vitest/Jest |

## 核心数据表

| 表 | 作用 |
| --- | --- |
| users | 用户账号 |
| organizations | 团队或租户 |
| organization_members | 团队成员和角色 |
| plans | 价格计划 |
| subscriptions | 订阅状态 |
| orders | 订单 |
| payments | 支付记录 |
| usage_events | 用量记录 |
| invoices | 发票 |
| feature_entitlements | 功能权益 |
| feedback | 用户反馈 |
| audit_logs | 审计日志 |

## API 设计

| API | 说明 |
| --- | --- |
| `POST /api/auth/register` | 注册 |
| `POST /api/auth/login` | 登录 |
| `GET /api/me` | 当前用户 |
| `GET /api/plans` | 价格计划 |
| `POST /api/checkout` | 创建支付 |
| `POST /api/webhooks/stripe` | 支付回调 |
| `GET /api/billing` | 账单和订阅 |
| `POST /api/organizations/invite` | 邀请成员 |
| `GET /api/usage` | 用量统计 |
| `POST /api/feedback` | 用户反馈 |

## 页面设计

- 首页/价格页。
- 登录页/注册页。
- 产品 Dashboard。
- 功能使用页。
- 团队成员页。
- 账单订阅页。
- 用户设置页。
- 管理后台。
- 反馈和帮助页。

## 关键检查

- [ ] 免费、试用、付费、企业计划是否清楚。
- [ ] 支付 webhook 是否服务端验签。
- [ ] 用量限制是否在服务端校验。
- [ ] 团队数据是否多租户隔离。
- [ ] 取消订阅、退款、发票流程是否明确。
- [ ] 是否有产品分析和错误报警。
- [ ] 是否有账单 FAQ 和管理员文档。

