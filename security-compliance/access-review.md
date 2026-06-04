# Access Review

## Review Cadence

- Before launch.
- Monthly for production administrators.
- After team changes.
- After incidents.

## Review Table

| User | Role | Scope | Reason | Keep/Revoke | Reviewer |
| --- | --- | --- | --- | --- | --- |
|  |  |  |  |  |  |

## Required Checks

- Every admin has a named reason.
- Shared admin accounts are not allowed.
- Read-only roles cannot mutate data.
- Support roles can access only support-relevant data.
- Export permissions are separate from read permissions.
- Billing permissions are separate from product admin permissions.

## Evidence

- Permission matrix.
- Audit logs.
- Identity provider group list.
- Production user role export.

