# Threat Model Template

## System

| Field | Value |
| --- | --- |
| Product |  |
| Owner |  |
| Date |  |
| Scope |  |

## Assets

| Asset | Why It Matters | Data Sensitivity |
| --- | --- | --- |
| User accounts | Login and identity | High |
| Business records | Core product value | Medium or High |
| Files | User-generated or imported content | Medium or High |
| Billing records | Payment and invoices | High |
| Audit logs | Investigation trail | Medium |

## Entry Points

- Public web pages.
- Login and registration.
- API endpoints.
- File uploads.
- Webhooks.
- Admin dashboard.
- Background jobs.

## Threats

| Threat | Example | Mitigation |
| --- | --- | --- |
| Spoofing | Stolen session token | Session expiry, rotation, device review |
| Tampering | Modified request body | Server-side validation and authorization |
| Repudiation | Admin denies destructive action | Append-only audit logs |
| Information disclosure | User reads another user's data | Scoped queries and permission tests |
| Denial of service | Login or search endpoint abuse | Rate limits and queue isolation |
| Elevation of privilege | Normal user calls admin API | Server-side role and scope checks |

## Sign-Off

| Role | Name | Decision |
| --- | --- | --- |
| Engineering |  |  |
| Product |  |  |
| Security |  |  |

