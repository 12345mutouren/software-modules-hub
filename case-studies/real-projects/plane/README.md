# Plane Teardown

Repository: [makeplane/plane](https://github.com/makeplane/plane)

## Verified Snapshot

| Field | Value |
| --- | --- |
| Type | Project management / issue tracking platform |
| GitHub description | Open-source alternative to Jira, Linear, Monday and ClickUp |
| Default branch | `preview` |
| Archived | No |
| Topics observed | Django, Python, React, PostgreSQL, Redis, Docker, Kanban, project management |

## 10-Module Map

| Module | What to inspect |
| --- | --- |
| Product layer | Workspaces, projects, issues, cycles, modules, docs and triage |
| Account system | Workspace users, roles, invitations, team access |
| Database layer | Project, issue, label, member and workflow state models |
| Backend system | Django APIs, business logic, project workflows, task state changes |
| Frontend/client | React apps, boards, issue lists, project dashboards |
| Security | Workspace boundaries, role-based permissions, SECURITY docs |
| Operations/deployment | Docker Compose files, deployment directory, environment examples |
| Testing | Test compose files, CI config, backend/frontend tests |
| Business/operations | Work management, triage, reporting, project planning |
| Documentation | README, docs, contribution and security docs |

## Source Reading Entry Points

Start with:

- `README.md`
- `apps/`
- `packages/`
- `docs/`
- `deployments/`
- `docker-compose.yml`
- `docker-compose-local.yml`
- `docker-compose-test.yml`
- `SECURITY.md`
- `CODEOWNERS`

## What To Learn

- How project management products model issues, states and workspace membership.
- How a Python backend and React frontend can live in one product repository.
- How Redis and PostgreSQL appear in collaborative work-management systems.
- How Docker Compose supports local development and testing.
- How product complexity grows from workflow states, not just UI pages.

## Risks And Caveats

- The default branch is `preview`, so branch choice matters when reading source.
- Project-management products have many domain objects; start with issues before reading everything.
- Some enterprise or cloud features may not map directly to the open-source distribution.

## Suggested Next Exercise

Trace one issue lifecycle:

```text
create issue -> assign user -> move status -> comment/update -> project board refresh
```

