# Twenty Teardown

Repository: [twentyhq/twenty](https://github.com/twentyhq/twenty)

## Verified Snapshot

| Field | Value |
| --- | --- |
| Type | CRM / sales platform |
| GitHub description | Open alternative to Salesforce, designed for AI |
| Default branch | `main` |
| Archived | No |
| Topics observed | CRM, GraphQL, React, TypeScript, NestJS, PostgreSQL, monorepo |

## 10-Module Map

| Module | What to inspect |
| --- | --- |
| Product layer | CRM objects, sales workflow, customer records, views and insights |
| Account system | Workspace users, roles, profiles, organization membership |
| Database layer | CRM object records, relationships, metadata, PostgreSQL models |
| Backend system | NestJS services, GraphQL API, object operations |
| Frontend/client | React web app, tables, record pages, dashboard views |
| Security | Workspace permissions, record access, SECURITY docs |
| Operations/deployment | Package scripts, workspace setup, deployment docs |
| Testing | Jest config, package-level tests |
| Business/operations | Customer data, sales pipeline, reporting, marketing/sales workflows |
| Documentation | README, PRODUCT, DESIGN and contribution docs |

## Source Reading Entry Points

Start with:

- `README.md`
- `PRODUCT.md`
- `DESIGN.md`
- `packages/`
- `package.json`
- `nx.json`
- `jest.preset.js`

## What To Learn

- How a CRM models customers, companies, opportunities and object relationships.
- How GraphQL can expose business objects to a complex frontend.
- How metadata and object modeling make CRM systems extensible.
- How design/product docs complement code in a large application.
- How a monorepo can organize frontend, backend and shared packages.

## Risks And Caveats

- CRM object modeling can become abstract; start with one object type.
- GraphQL schemas and metadata layers may require slower reading than REST APIs.
- AI-related product positioning may evolve; inspect current docs before drawing conclusions.

## Suggested Next Exercise

Trace one CRM record:

```text
create company/contact -> store fields -> show record page -> update field -> audit or activity display
```

