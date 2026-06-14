# Data Foundation Package

`packages/data` defines the first reusable data layer for Software Modules Hub.

It can run on the in-memory repository for fast tests or on `packages/database` adapters for durable local storage. Application code talks to repositories instead of raw arrays, maps or files. That boundary is what lets a later release add SQLite, PostgreSQL, Drizzle or Prisma without rewriting the API layer.

## Models

| Model | Purpose |
| --- | --- |
| `User` | account identity, role list, status and password material |
| `Session` | login session token, user id and expiry |
| `Role` | role name and permission list |
| `AuditLog` | actor, action, resource and metadata |
| `Content` | author-owned content awaiting review |
| `ExportJob` | queued export request and status |

## Repository Contract

Every repository exposes:

- `create(input)`
- `get(id)`
- `find(predicate)`
- `list(predicate)`
- `update(id, patchOrUpdater)`

## Storage Modes

| Mode | Use |
| --- | --- |
| In-memory | Fast unit tests and examples |
| Database adapter | Durable local data, migrations, unique indexes and restart-safe tests |

## Run

```bash
npm --prefix packages/data test
```
