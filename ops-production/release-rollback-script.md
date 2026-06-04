# Release And Rollback Script

## Release Script Shape

```text
check clean release artifact
check required environment variables
run migrations
deploy web
deploy api
deploy worker
run smoke tests
record release metadata
watch metrics
```

## Rollback Script Shape

```text
identify last known good version
pause risky workers
deploy previous api
deploy previous web
verify database compatibility
run smoke tests
watch errors and latency
record rollback reason
```

## Required Smoke Tests

| Area | Test |
| --- | --- |
| Web | Home page loads |
| Auth | Login works |
| API | Health endpoint passes |
| Database | Read and write smoke test passes |
| Worker | Queue can process one test job |
| Admin | Admin route rejects normal user |

## Rollback Notes

- Rollback should be rehearsed before launch.
- Database migrations should be backward-compatible when possible.
- Rollback is not failure; hidden broken releases are worse.

