# Backup Script Plan

## Backup Scope

| Asset | Backup Method | Frequency |
| --- | --- | --- |
| PostgreSQL | Dump or managed snapshot | Daily plus before migrations |
| Object storage | Bucket versioning or replication | Continuous |
| Environment config | Secret manager export or inventory | Before release |
| Audit logs | Append-only retention | Policy-defined |

## Backup Script Shape

```text
validate environment
create timestamp
run database dump
upload dump to backup bucket
verify uploaded object exists
record backup metadata
send success or failure alert
```

## Restore Drill

1. Create isolated restore environment.
2. Restore latest backup.
3. Run migrations if needed.
4. Run smoke tests.
5. Confirm important records and files are present.
6. Record duration and issues.

## Failure Rules

- Failed backup is a production alert.
- Untested restore is not a reliable backup.
- Backups must not expose raw secrets.

