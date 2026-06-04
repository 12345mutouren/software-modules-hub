# SaaS Starter App

第 25 阶段可运行 SaaS 应用模板。

## Covers

- User signup.
- Organization creation.
- Member invitation.
- Plan subscription.
- Usage tracking.
- Scoped permission checks.

## Run

```bash
npm --prefix runnable-apps/saas-starter-app test
```

## Production Upgrade Path

1. Replace in-memory store with PostgreSQL.
2. Add real auth provider and session storage.
3. Add Stripe or payment provider webhooks.
4. Add team-level audit logs.
5. Add admin dashboard and billing screens.

