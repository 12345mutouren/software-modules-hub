# SaaS Kickoff Example

This example shows how the kickoff templates might be filled for a small SaaS analytics product.

## Product Brief

| Field | Value |
| --- | --- |
| Product | Simple Analytics SaaS |
| Problem | Small teams need a lightweight dashboard for tracking product events |
| Users | Founder, product manager, developer, admin |
| Core workflow | Sign up -> create project -> send event -> view dashboard -> upgrade |

## Module Selection

| Module | Choice |
| --- | --- |
| Product layer | SaaS subscription |
| Account system | Email/password + Google OAuth + team invitations |
| Database layer | PostgreSQL + Redis |
| Backend system | REST API + webhook/event ingestion |
| Frontend/client | Next.js dashboard |
| Security | Cookie session, CSRF, RBAC, rate limiting |
| Operations/deployment | Vercel + managed PostgreSQL + Sentry |
| Testing | Unit + API + Playwright signup/dashboard |
| Business/operations | Stripe subscription + usage events |
| Documentation | User docs, API docs, billing FAQ |

## Initial ADRs

| ADR | Decision |
| --- | --- |
| ADR-001 | Use PostgreSQL as the primary database |
| ADR-002 | Use hosted deployment for the first launch |
| ADR-003 | Use RBAC before introducing relationship permissions |

## First Milestone

- Register and log in.
- Create project.
- Send event through API.
- Show event count dashboard.
- Upgrade to Pro plan simulation.
- Run API and E2E tests.

