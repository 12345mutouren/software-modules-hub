# 09 商业/运营功能

商业/运营功能回答：软件如何收费、服务用户、增长、统计、审核和推荐。

并不是所有软件都需要完整商业模块，但如果软件要面向真实用户长期运行，这一层通常迟早会出现。

## 核心能力

- 会员系统。
- 支付系统。
- 订单系统。
- 优惠券。
- 发票。
- 数据统计。
- 用户行为分析。
- 客服系统。
- 反馈系统。
- 内容审核。
- 推荐系统。

## 商业能力类别

| 类别 | 说明 | 常见数据 |
| --- | --- | --- |
| 会员系统 | 免费、付费、试用、订阅、权益 | plans、subscriptions、entitlements |
| 支付系统 | 一次性支付、订阅、退款 | payments、refunds、webhooks |
| 订单系统 | 下单、支付、发货、取消 | orders、order_items、order_status |
| 优惠券 | 折扣码、活动、满减 | coupons、promotions、redemptions |
| 发票 | 开票、税务、账单下载 | invoices、tax_profiles |
| 数据统计 | 业务指标和报表 | metrics、reports |
| 用户行为分析 | 事件埋点、漏斗、留存 | events、funnels、cohorts |
| 客服系统 | 工单、会话、用户查询 | tickets、conversations |
| 反馈系统 | 建议、问题、投票 | feedback、votes |
| 内容审核 | 人工审核、自动审核、申诉 | moderation_cases |
| 推荐系统 | 推荐内容、商品、用户或功能 | recommendations |

## 支付和会员类别

| 类别 | 说明 |
| --- | --- |
| 一次性支付 | 用户买一个商品或服务 |
| 订阅支付 | 周期性扣费 |
| 试用期 | 先试用，再付费 |
| 按量计费 | 根据用量收费 |
| 企业合同 | 线下合同和发票 |
| 退款 | 全额或部分退款 |
| 账单门户 | 用户自助管理订阅和账单 |

## 运营数据类别

| 类别 | 说明 |
| --- | --- |
| 注册指标 | 注册数、激活率、邀请转化 |
| 使用指标 | 活跃用户、使用次数、任务完成率 |
| 商业指标 | 付费率、收入、续费、流失 |
| 内容指标 | 发布数、审核通过率、举报数 |
| 客服指标 | 工单量、响应时间、解决率 |
| 产品指标 | 漏斗、留存、功能使用率 |

## 常见流程

1. 用户选择会员计划或商品。
2. 系统创建订单或订阅。
3. 支付平台完成支付并回调后端。
4. 后端更新订单、会员权益和账单。
5. 系统发送邮件、站内信或发票。
6. 运营通过后台查看数据、处理客服和审核。
7. 系统根据用户行为生成统计、分群和推荐。

## 代表 GitHub 仓库

| 仓库 | 类型 | 适合学习 |
| --- | --- | --- |
| [stripe-samples/accept-a-payment](https://github.com/stripe-samples/accept-a-payment) | sample | Stripe 一次性支付 |
| [stripe-samples/checkout-single-subscription](https://github.com/stripe-samples/checkout-single-subscription) | sample | Stripe 订阅支付 |
| [medusajs/medusa](https://github.com/medusajs/medusa) | platform | 电商后端、订单和商品 |
| [saleor/saleor](https://github.com/saleor/saleor) | platform | GraphQL 电商平台 |
| [invoiceninja/invoiceninja](https://github.com/invoiceninja/invoiceninja) | product-source | 发票和账单 |
| [posthog/posthog](https://github.com/PostHog/posthog) | platform | 产品分析和事件埋点 |
| [chatwoot/chatwoot](https://github.com/chatwoot/chatwoot) | platform | 客服和用户会话 |
| [zammad/zammad](https://github.com/zammad/zammad) | platform | 工单系统 |
| [usefider/fider](https://github.com/getfider/fider) | platform | 用户反馈和投票 |
| [n8n-io/n8n](https://github.com/n8n-io/n8n) | platform | 运营自动化工作流 |
| [tensorflow/recommenders](https://github.com/tensorflow/recommenders) | library | 推荐系统学习 |

## 设计检查清单

- [ ] 是否明确免费、会员、企业等权益。
- [ ] 是否有订单、支付、退款和订阅状态。
- [ ] 是否处理支付 webhook。
- [ ] 是否有优惠券和活动边界。
- [ ] 是否有发票或账单下载需求。
- [ ] 是否有业务统计指标。
- [ ] 是否有用户行为埋点。
- [ ] 是否有客服和反馈入口。
- [ ] 是否有内容审核和申诉流程。
- [ ] 是否有推荐或个性化策略。
