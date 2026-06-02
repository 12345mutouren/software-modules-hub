# Appwrite Teardown

Repository: [appwrite/appwrite](https://github.com/appwrite/appwrite)

## Verified Snapshot

| Field | Value |
| --- | --- |
| Type | Backend-as-a-Service platform |
| GitHub description | Complete cloud infrastructure for web, mobile and AI apps |
| Default branch | `1.9.x` |
| Archived | No |
| Topics observed | Docker, backend-as-a-service, auth, databases, storage, functions, messaging, hosting, realtime |

## 10-Module Map

| Module | What to inspect |
| --- | --- |
| Product layer | Developer platform for Auth, Databases, Storage, Functions, Messaging, Hosting, Realtime |
| Account system | Auth products, users, teams, sessions, API keys |
| Database layer | Database service, collections, documents, indexes |
| Backend system | API services, SDK-facing routes, functions runtime |
| Frontend/client | Console/public UI and SDK-driven usage |
| Security | API keys, auth/session rules, project isolation, SECURITY docs |
| Operations/deployment | Dockerfile, docker-compose, self-hosting setup |
| Testing | tests, PHPUnit config, static analysis |
| Business/operations | Project infrastructure, messaging, hosting, developer workflows |
| Documentation | README, README-CN, docs, CHANGES, SECURITY |

## Source Reading Entry Points

Start with:

- `README.md`
- `README-CN.md`
- `app/`
- `src/`
- `public/`
- `docs/`
- `tests/`
- `Dockerfile`
- `docker-compose.yml`
- `phpunit.xml`
- `SECURITY.md`

## What To Learn

- How a BaaS product organizes many backend capabilities behind APIs.
- How self-hosting changes product design and documentation.
- How auth, databases, storage and functions are exposed as platform modules.
- How tests and static analysis appear in a mature backend platform.
- How multilingual docs and changelogs support a broad developer audience.

## Risks And Caveats

- Default branch is versioned, so verify branch before reading or linking.
- Platform code can be harder to map than app code; focus on one service first.
- API behavior may be easier to understand through docs and SDK examples before source.

## Suggested Next Exercise

Trace one Auth flow:

```text
create user -> create session -> call protected endpoint -> inspect project/user boundaries
```

