# Monitoring And Alerting Template

## Core Signals

| Signal | Alert When |
| --- | --- |
| Availability | Health check fails repeatedly |
| Latency | p95 API latency exceeds threshold |
| Error rate | 5xx rate rises above threshold |
| Database | Connection pool saturation or slow queries |
| Queue | Job backlog grows or retries spike |
| Auth | Login failures spike |
| Billing | Payment webhook failures occur |
| Backups | Backup job fails |

## Dashboard Sections

- Request volume.
- Error rate.
- API latency.
- Database health.
- Queue health.
- Worker failures.
- Business events.
- Backup status.

## Alert Rules

- Page humans only for user-impacting or data-risk issues.
- Send lower-priority alerts to async channels.
- Every alert needs owner, runbook and severity.
- Remove noisy alerts instead of training people to ignore them.

