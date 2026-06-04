# Security Test Plan

## Authentication

- Invalid password is rejected.
- Password reset token is single-use.
- Session can be revoked.
- Repeated login failures are rate-limited.

## Authorization

- User cannot read another user's scoped resource.
- User cannot update another user's scoped resource.
- Normal user cannot call admin API.
- Read-only user cannot create, update or delete.

## Input And Output

- HTML input is escaped or sanitized.
- SQL injection payload does not change query behavior.
- File upload checks size and type.
- API rejects unexpected fields.

## Operations

- Secrets are not logged.
- Audit logs are written for admin changes.
- Webhook signature validation fails closed.
- Backup restore procedure is tested.

## Evidence

| Test | Owner | Result | Link |
| --- | --- | --- | --- |
|  |  |  |  |

