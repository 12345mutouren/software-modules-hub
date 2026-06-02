# Security Review Template

## Scope

What feature or release is being reviewed?

## Account And Session

- [ ] Passwords are hashed.
- [ ] Sessions expire.
- [ ] Logout invalidates session.
- [ ] Cookies use HttpOnly, Secure and SameSite where appropriate.

## Authorization

- [ ] Every API checks server-side permissions.
- [ ] Users cannot access other users' data.
- [ ] Admin operations require admin role.
- [ ] Sensitive operations write audit logs.

## Input And Output

- [ ] Inputs are validated.
- [ ] SQL queries are parameterized or ORM-backed.
- [ ] User-generated HTML is sanitized.
- [ ] File uploads restrict type and size.

## Abuse Protection

- [ ] Login has rate limiting.
- [ ] Expensive APIs have rate limiting.
- [ ] Payment webhooks verify signatures.
- [ ] API keys can be rotated.

## Privacy

- [ ] User data export path exists if needed.
- [ ] User deletion path exists if needed.
- [ ] Privacy policy is updated.

