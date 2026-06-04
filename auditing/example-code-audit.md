# Example Code Audit

## Scope

- `examples/full-stack-mini-app`
- `examples/module-demos`
- `starter-generator`
- Future runnable templates

## Checks

| Check | Evidence |
| --- | --- |
| Tests pass | `npm test` |
| No third-party dependency drift unless intentional | package review |
| Demo matches README | manual review |
| Security-sensitive behavior has tests | auth, permission, CSRF, rate limit tests |
| Errors are understandable | test failure and CLI review |

## Rule

New runnable code must add tests before it is linked from README.

