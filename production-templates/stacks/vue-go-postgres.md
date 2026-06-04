# Vue + Go + PostgreSQL

## Best Fit

- Enterprise internal tools.
- Operational dashboards.
- High-throughput APIs.
- Systems that need small deployable services.

## Services

| Service | Responsibility |
| --- | --- |
| `web` | Vue frontend, forms, tables, filters and admin screens |
| `api` | Go HTTP API, business services, permission checks and integrations |
| `worker` | Async jobs, exports, notifications and scheduled sync |
| `postgres` | Core data and audit logs |
| `redis` | Cache, queues, rate limits and distributed locks |
| `object-storage` | Attachments, exports and import files |

## Suggested Directory

```text
apps/web
apps/api
apps/worker
packages/contracts
infra
docs
```

## Default Decisions

| Area | Default |
| --- | --- |
| API style | REST with OpenAPI contract |
| Database | PostgreSQL |
| Permissions | Role and scope checks in API middleware and service layer |
| Observability | Structured logs, metrics and health endpoints |
| Tests | Go unit/API tests plus frontend route tests |

## Risks

- Internal tools often need stricter audit logs than expected.
- Permission scope should be modeled early, not bolted onto handlers.
- CSV import/export work should move to workers before launch.

