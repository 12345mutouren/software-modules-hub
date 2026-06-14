# Database Foundation Package

`packages/database` is the first durable persistence layer for Software Modules Hub.

It keeps the public contract small and explicit:

- database adapters own storage, migrations and transactions
- repositories own record IDs, timestamps and validation hooks
- higher packages can switch between memory, JSON file and SQLite storage without changing business logic

## Included Adapters

| Adapter | Purpose |
| --- | --- |
| `createMemoryDatabase` | Fast test database with the same migration contract |
| `createJsonFileDatabase` | Local durable database stored as a JSON file |
| `createSqliteDatabase` | SQL-backed durable database using Node's built-in SQLite runtime |

## Professional Patterns Represented

- Migration ledger with applied migration IDs.
- Explicit table registry for account, session, role, content, export and audit data.
- SQLite expression indexes over JSON-backed records.
- Transaction wrapper for rollback on failed writes.
- Generic repository factory used by the data package.
- Storage contract that can later receive PostgreSQL, Drizzle or Prisma adapters.

## SQLite Example

```js
import { createSqliteDatabase, runMigrations } from "./src/index.mjs";

const database = createSqliteDatabase({ filePath: ".local/app.sqlite" });
runMigrations(database);
```

## Run

```bash
npm --prefix packages/database test
```
