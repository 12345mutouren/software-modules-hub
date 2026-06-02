# Supabase Teardown

Repository: [supabase/supabase](https://github.com/supabase/supabase)

## Verified Snapshot

| Field | Value |
| --- | --- |
| Type | Postgres development platform |
| GitHub description | Dedicated Postgres platform for web, mobile and AI apps |
| Default branch | `master` |
| Archived | No |
| Topics observed | Postgres, Auth, Realtime, PostgREST, WebSockets, Deno, pgvector, AI |

## 10-Module Map

| Module | What to inspect |
| --- | --- |
| Product layer | Backend platform for developers: database, auth, storage, realtime, functions |
| Account system | Auth service, OAuth, user management, project/team access |
| Database layer | Postgres, migrations, extensions, storage metadata, vectors |
| Backend system | API gateway patterns, PostgREST, realtime, edge/runtime services |
| Frontend/client | Dashboard apps and examples |
| Security | Auth, API keys, database policies, SECURITY docs |
| Operations/deployment | Docker, local stack, CLI/dev setup, infrastructure docs |
| Testing | e2e directory, package tests, examples |
| Business/operations | Developer projects, usage, hosted platform concepts |
| Documentation | README, DEVELOPERS, docs, examples |

## Source Reading Entry Points

Start with:

- `README.md`
- `DEVELOPERS.md`
- `apps/`
- `packages/`
- `supabase/`
- `docker/`
- `examples/`
- `e2e/`
- `SECURITY.md`

## What To Learn

- How a platform product bundles many infrastructure modules into one developer experience.
- How Postgres can be the center of auth, APIs, storage metadata and vectors.
- How examples and developer docs support a platform product.
- How local development stacks differ from simple app templates.
- How security and access policies are product features.

## Risks And Caveats

- Supabase is a platform, not a normal single web app; read by service area.
- The repository has many packages, so choose one capability first.
- Hosted product behavior may include services not obvious from the monorepo alone.

## Suggested Next Exercise

Trace one platform capability:

```text
create project -> configure database/auth -> call generated API -> observe dashboard state
```

