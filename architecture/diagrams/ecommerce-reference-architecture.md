# Ecommerce Reference Architecture

适合：商品销售、课程、数字产品、预约服务。

```mermaid
flowchart LR
  buyer["买家"]
  admin["运营/客服/管理员"]
  storefront["Storefront<br/>商品、购物车、结算"]
  adminui["Admin UI<br/>商品、订单、售后"]
  api["Commerce API"]
  search["Search<br/>Meilisearch/Typesense"]
  db["PostgreSQL<br/>商品、SKU、库存、订单"]
  payment["Payment Provider"]
  webhook["Payment Webhook"]
  inventory["Inventory Service"]
  fulfillment["Fulfillment<br/>发货、数字交付"]
  support["Support<br/>客服、退款、发票"]
  monitor["Monitoring"]

  buyer --> storefront
  admin --> adminui
  storefront --> api
  adminui --> api
  storefront --> search
  api --> db
  api --> inventory
  api --> payment
  webhook --> api
  api --> fulfillment
  api --> support
  api --> monitor
  db --> monitor
```

## Key Decisions

| Decision | Default |
| --- | --- |
| Product model | Product + variant/SKU |
| Inventory | Server-side stock reservation |
| Payment | Provider checkout + signed webhook |
| Search | Dedicated search service for catalog |
| Admin | Separate protected admin dashboard |
| Refunds | State machine with audit log |

## Production Notes

- 下单、支付和库存扣减要幂等。
- 买家只能查看自己的订单。
- 后台危险操作要二次确认和审计。
- 售后、退款、发票流程要写进用户文档。

