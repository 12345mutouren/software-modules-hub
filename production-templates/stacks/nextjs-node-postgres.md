# Next.js + Node.js + PostgreSQL

## Best Fit

- SaaS subscription products.
- Admin dashboards.
- Ecommerce applications.
- Content communities.

## Services

| Service | Responsibility |
| --- | --- |
| `web` | Next.js app, routing, server components, forms and dashboard UI |
| `api` | Node.js REST or RPC API, business logic and permission checks |
| `worker` | Email, billing webhooks, file jobs, reports and background sync |
| `postgres` | Users, teams, roles, orders, subscriptions and business data |
| `redis` | Sessions, rate limits, queues and hot cache |
| `object-storage` | Images, documents, exports and attachments |

## Suggested Directory

```text
apps/web
apps/api
apps/worker
packages/auth
packages/database
packages/permissions
packages/ui
packages/config
infra
docs
```

## Default Decisions

| Area | Default |
| --- | --- |
| Auth | Email password plus OAuth provider option |
| Database | PostgreSQL with migration tool |
| Cache | Redis |
| Files | S3-compatible object storage |
| Tests | API tests, component tests, Playwright smoke tests |
| Deployment | Container or platform deployment with separate web/API/worker processes |

## Risks

- Combining all business logic into Next.js route handlers can make background jobs and permissions harder to test.
- Billing webhooks must be idempotent.
- Admin dashboard routes must not depend only on hidden frontend buttons.

