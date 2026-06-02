# Dub Teardown

Repository: [dubinc/dub](https://github.com/dubinc/dub)

## Verified Snapshot

| Field | Value |
| --- | --- |
| Type | Link attribution platform |
| GitHub description | Modern link attribution platform for marketing teams |
| Default branch | `main` |
| Archived | No |
| Topics observed | Next.js, Vercel, Upstash, Tinybird, ClickHouse, MySQL, Prisma, Tailwind CSS, TypeScript |

## 10-Module Map

| Module | What to inspect |
| --- | --- |
| Product layer | Short links, attribution, analytics, teams, campaigns |
| Account system | Workspace/team accounts, authentication, roles |
| Database layer | Links, domains, workspaces, events, analytics stores |
| Backend system | Link creation, redirects, analytics ingestion, API routes |
| Frontend/client | Dashboard, link management, analytics views |
| Security | Domain ownership, API keys, auth/session, SECURITY docs |
| Operations/deployment | Vercel-oriented setup, monorepo packages, infrastructure integrations |
| Testing | Package-level tests and CI config |
| Business/operations | Attribution, analytics, plans, team usage, marketing workflows |
| Documentation | README, SECURITY, package docs |

## Source Reading Entry Points

Start with:

- `README.md`
- `apps/`
- `packages/`
- `package.json`
- `pnpm-workspace.yaml`
- `turbo.json`
- `SECURITY.md`

## What To Learn

- How a small product surface can still require serious backend and analytics design.
- How redirects, event tracking and attribution differ from ordinary CRUD.
- How modern SaaS uses multiple data systems for transactional data and analytics.
- How Next.js and monorepo packages support a focused product.
- How marketing workflows become product features.

## Risks And Caveats

- Analytics pipelines may rely on external services; read integration boundaries carefully.
- Link attribution has abuse and spam risks that may not be obvious from UI pages.
- Production performance depends on redirect speed and event ingestion reliability.

## Suggested Next Exercise

Trace one link event:

```text
create link -> visit short URL -> redirect -> record event -> show analytics chart
```

