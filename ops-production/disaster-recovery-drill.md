# Disaster Recovery Drill

## Drill Scenarios

| Scenario | Goal |
| --- | --- |
| Database unavailable | Restore service using backup or failover |
| Bad migration | Recover data and restore app compatibility |
| Object storage failure | Confirm files can be restored or served from replica |
| Secret exposure | Rotate credentials and invalidate sessions |
| Region outage | Confirm alternate deployment plan |

## Drill Steps

1. Pick scenario.
2. Declare start time.
3. Assign incident roles.
4. Execute recovery runbook.
5. Validate app behavior.
6. Record recovery time.
7. Record missing documentation or automation.

## Success Criteria

- Recovery steps are understandable without the original author.
- Required credentials and backups are accessible to authorized responders.
- Smoke tests pass after recovery.
- Follow-up tasks are added to backlog.

