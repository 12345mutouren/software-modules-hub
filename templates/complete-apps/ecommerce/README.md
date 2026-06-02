# 电商系统模板

适合：实物商品、数字商品、课程、服务预约、会员商品、B2B 采购。

## 产品定位

电商系统的核心是商品展示、购物决策、下单、支付、履约和售后。

典型目标：

- 让用户找到商品并完成购买。
- 支持库存、优惠、支付、退款和发票。
- 支持后台管理商品、订单和客服。
- 保证订单、支付和库存状态一致。

## 用户角色

| 角色 | 能力 |
| --- | --- |
| 游客 | 浏览商品、搜索、加入购物车 |
| 买家 | 下单、支付、查看订单、申请退款 |
| 会员 | 使用会员价、优惠券、积分 |
| 商家/运营 | 管理商品、库存、活动 |
| 客服 | 处理售后、退款、发票 |
| 管理员 | 管理系统、权限、财务配置 |

## 10 模块组合

| 模块 | 设计重点 |
| --- | --- |
| 产品层 | 商品类型、购买路径、售后规则 |
| 账号系统 | 游客购物车、用户账号、会员等级、地址 |
| 数据库层 | 商品、SKU、库存、购物车、订单、支付、退款 |
| 后端系统 | 商品 API、购物车、订单、支付 webhook、库存扣减 |
| 前端/客户端 | 商品列表、详情、购物车、结算、订单中心 |
| 安全 | 支付验签、订单权限、库存幂等、防刷 |
| 运维部署 | 高可用、缓存、搜索、支付回调监控 |
| 测试 | 下单、支付、退款、库存、优惠券、权限 |
| 商业/运营 | 优惠券、发票、客服、数据统计、推荐 |
| 文档 | 用户购物说明、售后规则、后台手册、API 文档 |

## 推荐技术和参考仓库

| 类别 | 推荐 |
| --- | --- |
| 电商平台 | `medusajs/medusa`、`saleor/saleor` |
| 支付 | `stripe-samples/accept-a-payment` |
| 搜索 | Meilisearch、Typesense、Elasticsearch |
| 后台 | React Admin、Refine、Ant Design Pro |
| 数据库 | PostgreSQL、Redis |
| 监控 | Sentry、Prometheus、Grafana |

## 核心数据表

| 表 | 作用 |
| --- | --- |
| products | 商品 |
| product_variants | SKU |
| inventory | 库存 |
| carts | 购物车 |
| cart_items | 购物车商品 |
| orders | 订单 |
| order_items | 订单商品 |
| payments | 支付 |
| refunds | 退款 |
| coupons | 优惠券 |
| addresses | 地址 |
| invoices | 发票 |
| shipments | 发货 |
| audit_logs | 审计日志 |

## API 设计

| API | 说明 |
| --- | --- |
| `GET /api/products` | 商品列表 |
| `GET /api/products/:id` | 商品详情 |
| `POST /api/cart/items` | 加入购物车 |
| `PATCH /api/cart/items/:id` | 修改数量 |
| `POST /api/checkout` | 创建结算 |
| `POST /api/orders` | 创建订单 |
| `POST /api/payments/webhook` | 支付回调 |
| `GET /api/orders` | 我的订单 |
| `POST /api/refunds` | 申请退款 |
| `GET /admin/api/orders` | 后台订单 |

## 页面设计

- 首页。
- 商品列表。
- 商品详情。
- 购物车。
- 结算页。
- 支付结果页。
- 订单中心。
- 售后/退款页。
- 商品和订单后台。

## 关键检查

- [ ] 支付回调是否幂等。
- [ ] 库存扣减是否防止超卖。
- [ ] 用户是否只能查看自己的订单。
- [ ] 优惠券是否防重复使用。
- [ ] 退款、发票、售后流程是否清楚。
- [ ] 商品搜索是否有缓存或搜索服务。
- [ ] 后台订单操作是否有审计日志。

