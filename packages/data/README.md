# Data Foundation Package

`packages/data` defines the first reusable data layer for Software Modules Hub.

It keeps the storage implementation in memory for now, but the application code talks to repositories instead of raw arrays or maps. That boundary is what lets a later release add SQLite, PostgreSQL or Prisma without rewriting the API layer.

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

## Run

```bash
npm --prefix packages/data test
```
