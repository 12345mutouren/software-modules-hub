# Admin Manual

## Becoming Admin

The first registered user automatically receives the `admin` role.

## Admin Capabilities

- View the user list through `GET /api/admin/users`.
- Inspect JSON data and audit logs in the configured data file.

## Risky Operations

This mini app intentionally avoids destructive admin operations.

Production systems should document:

- Disabling users.
- Resetting passwords.
- Changing roles.
- Reviewing audit logs.
- Handling privacy deletion requests.

