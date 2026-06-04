# Migration Plan

## Goal

Run database changes safely across development, staging and production.

## Required Inputs

| Input | Required |
| --- | --- |
| Migration name | Yes |
| Tables changed | Yes |
| Data backfill required | Yes |
| Rollback path | Yes |
| Backup confirmation | Yes |
| Owner | Yes |

## Pre-Migration

- Confirm production backup exists.
- Run migration against local database.
- Run migration against staging.
- Run app smoke tests after migration.
- Confirm rollback SQL or compensating change exists.

## Migration

1. Pause risky background jobs when needed.
2. Apply schema migration.
3. Apply backfill in small batches if needed.
4. Run smoke tests.
5. Monitor errors, latency and database locks.

## Rollback

- Restore from backup only when data loss risk is lower than continuing.
- Prefer backward-compatible migrations.
- Keep old columns until the next release when possible.
- Record exact rollback action in the release note.

