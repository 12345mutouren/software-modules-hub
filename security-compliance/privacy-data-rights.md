# Privacy And Data Rights

## User Data Inventory

| Data Type | Stored Where | Purpose | Retention |
| --- | --- | --- | --- |
| Account profile | Database | Login and user experience | Account lifetime |
| Session metadata | Database or Redis | Security and session management | Short-lived |
| Files | Object storage | Product functionality | User-controlled |
| Audit logs | Database | Security investigation | Policy-defined |
| Billing records | Database/provider | Accounting and support | Policy-defined |

## Export Flow

1. User requests export.
2. System verifies identity.
3. Background job gathers profile, business records and files metadata.
4. Export file is stored temporarily.
5. User receives a time-limited download link.
6. Export access is logged.

## Deletion Flow

1. User requests deletion.
2. System verifies identity and account ownership.
3. Product warns about irreversible effects.
4. System deletes or anonymizes personal data.
5. Files are deleted or detached according to policy.
6. Audit record stores deletion event without raw sensitive data.

## Consent And Authorization

- Explain what data is collected.
- Ask for consent where required.
- Allow users to revoke optional processing.
- Keep admin access limited and logged.

