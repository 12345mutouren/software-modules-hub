# Environment Variable Standard

## Naming

| Prefix | Purpose |
| --- | --- |
| `PUBLIC_` | Safe for browser-visible configuration |
| `DATABASE_` | Database connection and pool settings |
| `REDIS_` | Cache, session and queue settings |
| `AUTH_` | Authentication providers and session settings |
| `OBJECT_STORAGE_` | File storage settings |
| `PAYMENT_` | Payment provider settings |
| `ALERT_` | Alerting destinations |

## Required Production Variables

| Variable | Purpose |
| --- | --- |
| `NODE_ENV` | Runtime environment |
| `PUBLIC_URL` | Canonical application URL |
| `DATABASE_URL` | Primary database |
| `REDIS_URL` | Cache and queues |
| `SESSION_SECRET` | Session signing secret |
| `BACKUP_BUCKET` | Backup storage |
| `ALERT_EMAIL` | Alert recipient |

## Rules

- Do not commit real secrets.
- Keep `.env.example` complete but non-sensitive.
- Rotate secrets after incidents.
- Separate staging and production credentials.
- Prefer managed secret stores for production.

