# Cal DIY Teardown

Repository: [calcom/cal.diy](https://github.com/calcom/cal.diy)

## Verified Snapshot

| Field | Value |
| --- | --- |
| Type | Scheduling SaaS / booking infrastructure |
| GitHub description | Scheduling infrastructure for everyone |
| Default branch | `main` |
| Archived | No |
| Topics observed | TypeScript, Next.js, NextAuth, PostgreSQL, Prisma, tRPC, Tailwind CSS, Turborepo, Zod |

## 10-Module Map

| Module | What to inspect |
| --- | --- |
| Product layer | Booking flow, event types, teams, calendars, availability, routing |
| Account system | Login providers, user profiles, team membership, permissions |
| Database layer | Prisma models, PostgreSQL schema, booking and calendar entities |
| Backend system | tRPC/API routes, booking creation, calendar integrations, webhooks |
| Frontend/client | Next.js apps, booking pages, dashboard, settings |
| Security | Auth/session handling, permissions, SECURITY docs, calendar access boundaries |
| Operations/deployment | Dockerfile, docker-compose, deploy directory, environment examples |
| Testing | Playwright and Vitest configs, checks and test setup |
| Business/operations | Teams, routing, app marketplace/integrations, possible plan boundaries |
| Documentation | README, docs, SECURITY, CONTRIBUTING, permissions documentation |

## Source Reading Entry Points

Start with these top-level paths:

- `README.md`
- `apps/`
- `packages/`
- `docs/`
- `deploy/`
- `docker-compose.yml`
- `playwright.config.ts`
- `vitest.config.mts`
- `SECURITY.md`
- `PERMISSIONS.md`

## What To Learn

- How a SaaS product expresses a very specific workflow: booking.
- How TypeScript monorepos separate apps, packages, integrations and shared code.
- How database models connect user accounts, events, bookings and teams.
- How end-to-end tests protect booking flows.
- How permissions become product behavior, not just backend checks.

## Risks And Caveats

- The project is large; start from one flow such as creating a booking.
- Calendar integrations can make the architecture feel bigger than the core product.
- Repository name and product naming may evolve, so verify before linking in production docs.

## Suggested Next Exercise

Trace one flow:

```text
booking page -> availability check -> booking create API -> database write -> confirmation UI
```

