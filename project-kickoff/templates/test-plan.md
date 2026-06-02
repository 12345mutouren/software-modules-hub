# Test Plan Template

## Scope

What is being tested?

## Unit Tests

| Area | Test |
| --- | --- |
| Validation |  |
| Business logic |  |

## API Tests

| Endpoint | Expected |
| --- | --- |
| `POST /auth/login` | Valid user logs in |
| `GET /me` | Unauthenticated user is rejected |

## E2E Tests

| Flow | Steps |
| --- | --- |
| Signup | Register -> verify session -> visit dashboard |
| Core task |  |

## Permission Tests

| Role | Should allow | Should deny |
| --- | --- | --- |
| Visitor | Public pages | Private data |
| User | Own data | Other users' data |
| Admin | Admin dashboard | Bypass audit logs |

## Performance And Security

- [ ] Critical API latency checked.
- [ ] Login brute force protection checked.
- [ ] File upload limits checked.

