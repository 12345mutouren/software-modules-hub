# OWASP Checklist

This checklist maps common web application risks into concrete project checks.

| Area | Check | Evidence |
| --- | --- | --- |
| Broken access control | Every list, read, update and delete path checks user scope | Permission tests |
| Cryptographic failures | Passwords and tokens are never stored in plain text | Code review |
| Injection | Queries use parameterized APIs or ORM-safe builders | API tests |
| Insecure design | Threat model exists before launch | Threat model |
| Security misconfiguration | Production secrets are not committed | Config review |
| Vulnerable components | Dependencies are reviewed before release | Dependency audit |
| Authentication failures | Login, reset and invitation flows are rate-limited | Security tests |
| Software/data integrity | Webhooks validate signatures | API tests |
| Logging failures | Sensitive admin and export actions are logged | Audit log review |
| SSRF | Server-side URL fetching is restricted | Code review |

## Release Gate

- No critical unchecked item can ship.
- High risk items need an owner and mitigation date.
- Medium risk items need explicit acceptance.

