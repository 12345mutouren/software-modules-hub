# Module Demo Map

This map links each runnable demo to the 10-module software model.

| Module | Demo Function | Test Coverage |
| --- | --- | --- |
| Product Layer | `planProductFlow` | Builds a user journey and success metrics |
| Account System | `createAccountSystem` | Registers, verifies, logs in and resets password |
| Database Layer | `createInMemoryDatabase` | Inserts, queries, indexes and rolls back transactions |
| Backend System | `createApiRouter` | Applies authentication and permission checks |
| Frontend/Client | `createFrontendState` | Handles filters, loading state and subscriptions |
| Security | `createSecurityControls` | Escapes HTML, limits login failures and validates CSRF |
| Operations/Deployment | `createOperationsChecklist` | Validates environment, backups, alerting and HTTPS |
| Testing | `createTestingMatrix` | Generates unit, API, permission and regression test coverage |
| Business/Operations | `createBusinessEngine` | Applies coupons and changes order payment state |
| Documentation | `generateDocumentation` | Generates API and database markdown |

## How To Extend

When adding a new module demo:

1. Add the function to `src/module-demos.mjs`.
2. Add at least one test to `test/module-demos.test.mjs`.
3. Update this map.
4. Update `examples/module-demos/README.md`.
5. Run `npm --prefix examples/module-demos test`.

