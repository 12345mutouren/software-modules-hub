# Changelog

## 2.1.0 - Real Web Admin App

Added:

- `apps/web-admin-app` with a dependency-light Node.js HTTP server.
- Browser admin UI for login, content creation, content review, export jobs and audit logs.
- Static HTML, CSS and JavaScript admin workspace.
- Demo admin and writer accounts seeded through the API foundation.
- HTTP tests for static assets, admin workflow and permission denial.
- Root `test:web-admin` script.

Updated:

- Root version is now `2.1.0`.
- Public registration in the API now always creates normal users instead of accepting privileged roles.
- API package now exposes `/me`, `GET /content` and `GET /exports`.
- README, Start Here, Master Index, Project Status and Final Review now describe the web admin app.
- Repository verifier now requires the web admin app and v2.1.0 release notes.
- Root `npm test` now runs web admin tests.

## 2.0.0 - Data And API Foundation

Added:

- `packages/data` with User, Session, Role, AuditLog, Content and ExportJob models.
- Repository contract and in-memory data store for the first real data layer.
- Default RBAC role seed data.
- `packages/api` with framework-neutral HTTP-style routing.
- API routes for health, registration, login, content creation, content review, export jobs and audit logs.
- Structured API validation, auth, permission and error responses.
- Root `test:data-api` script.

Updated:

- Root version is now `2.0.0`.
- Auth service can now use external user and session repositories.
- README, Start Here, Master Index, Project Status and Final Review now describe the data/API foundation.
- Repository verifier now requires the data/API packages and v2.0.0 release notes.
- Root `npm test` now runs data and API foundation tests.

## 1.9.0 - Code Foundation

Added:

- `packages/core` with typed app errors, assertions, ID factory, system clock, in-memory repository and audit log.
- `packages/security` with password policy, scrypt password hashing, verification, login rate limiting and HTML escaping.
- `packages/auth` with registration, login, sessions, RBAC permission checks and audit events.
- `apps/admin-code-foundation` showing the packages reused by a management workflow.
- Root `test:code-foundation` script.

Updated:

- Root version is now `1.9.0`.
- README, Start Here, Master Index, Project Status and Final Review now describe the code foundation.
- Repository verifier now requires the code foundation packages, admin app and v1.9.0 release notes.
- Root `npm test` now runs code foundation tests.

## 1.8.0 - AI Frontend Stack Reference

Added:

- CopilotKit/CopilotKit in the GitHub repository catalog and frontend module docs.
- AI Agent UI / Generative UI category in the frontend module.
- Stack Composer AI frontend layer selector with CopilotKit / AG-UI and custom Agent UI options.

Updated:

- Root version is now `1.8.0`.
- Home, Start Here, Master Index and docs-site copy now describe AI frontend layer selection.
- Docs-site tests now verify the generated AI frontend layer selector.
- Repository verifier now requires CopilotKit references and the v1.8.0 release notes.

## 1.7.0 - Stack Composer

Added:

- Stack Composer docs-site page.
- Interactive controls for software type, auth strategy, data layer, deployment style and optional capabilities.
- Live recommended stack output, project focus, starter command, risk review, reference repo chips and release gates.
- Stack options for password/OAuth, magic link, enterprise SSO, passkey, PostgreSQL, search, MongoDB, vector search, managed hosting, containers, serverless and private cloud.

Updated:

- Root version is now `1.7.0`.
- Home, Explore, Start Here, Master Index and docs-site navigation now include the Stack Composer.
- Docs-site tests now verify the generated composer page.
- Repository verifier now requires the v1.7.0 release notes and composer assets.

## 1.6.0 - Build Planner

Added:

- Build Planner docs-site page.
- Interactive planner controls for software type, current stage and team size.
- Live focus, delivery window and risk summary for six software directions.
- Four-stage build roadmap from map, prototype and launch to production maintenance.
- Planner links to Project Starter, Maturity Scorecard, kickoff templates, production templates and deployment materials.

Updated:

- Root version is now `1.6.0`.
- Home, Explore, Start Here, Master Index and docs-site navigation now include the Build Planner.
- Docs-site tests now verify the generated planner page.
- Repository verifier now requires the v1.6.0 release notes and planner assets.

## 1.5.0 - Maturity Scorecard

Added:

- Maturity Scorecard docs-site page.
- Interactive readiness score across the 10 software modules.
- Live checked-item count, completed-module count, readiness level and score bar.
- Module-level checklist cards for product, identity, data, API, UI, security, ops, QA, business and docs.
- Next-action panel that highlights the lowest-scoring modules.

Updated:

- Root version is now `1.5.0`.
- Home, Explore, Start Here and docs-site navigation now include the Maturity Scorecard.
- Docs-site tests now verify the generated scorecard page.
- Repository verifier now requires the v1.5.0 release notes and scorecard assets.

## 1.4.0 - Project Starter Experience

Added:

- Project Starter docs-site page for turning a software type into a starter path.
- Interactive starter selector with generated commands for six software types.
- Starter profile cards connected to blueprints, runnable references and first-release gates.
- Generated package overview for product brief, module selection, permissions, data model, API, security, tests and launch planning.

Updated:

- Root version is now `1.4.0`.
- Home, Start Here, Explore and docs-site navigation now route project builders to the Project Starter page.
- Docs-site tests now verify the generated Project Starter page.
- Repository verifier now requires the v1.4.0 release notes and version state.

## 1.3.0 - Productized Docs Site

Added:

- Productized docs-site homepage with a Three.js module network.
- GSAP motion for page reveal and filter interactions.
- Goal-based Start Here and Explore pages.
- Template selector page.
- GitHub repository browser with search and filters.
- Local docs-site CSS and JavaScript assets.
- Actual GitHub Pages deployment workflow.
- Root `build:docs-site` script.

Updated:

- Root version is now `1.3.0`.
- Docs-site tests now check generated product pages, visual assets and repository browser content.
- Repository verifier now requires docs-site assets and deployment workflow.
- Quality and deployment documentation now describe the productized docs-site workflow.

## 1.2.0 - Runnable Apps And Online Audit

Added:

- Runnable SaaS app template.
- Runnable ecommerce app template.
- Runnable AI knowledge base app template.
- Runnable admin dashboard app template.
- Docs site deployment package for GitHub Pages and Vercel.
- Online GitHub repository index audit.

Updated:

- Root version is now `1.2.0`.
- Root `npm test` now includes runnable app template tests.
- Freshness audit now requires the online audit report.
- README, Roadmap, Master Index, quality documentation and verifier coverage.

## 1.1.0 - Maintenance And Runnable Templates

Added:

- `--with-code` starter generator mode.
- Runnable Next.js + Node.js + PostgreSQL reference template.
- Runnable React + FastAPI + PostgreSQL reference template.
- Docker Compose deployment playground.
- Static docs site builder.
- Maintenance refresh plans and freshness audit.

Updated:

- Root version is now `1.1.0`.
- Root `npm test` now includes freshness audit, runnable template tests, deployment playground smoke check and docs-site tests.
- README, Roadmap, Master Index, quality documentation and verifier coverage.

## 1.0.0 - Final Release

Added:

- Production architecture templates.
- Security and compliance templates.
- Operations productionization templates.
- GitHub issue templates, pull request template, CODEOWNERS, governance, security policy and MIT license.
- Audit system and local Markdown link checker.
- Project status, final review and v1.0.0 release notes.

Updated:

- Root version is now `1.0.0`.
- Root `npm test` now includes local link checking.
- README, Roadmap, Master Index, quality documentation and verifier coverage.

## 0.12.0 - Module Demos

Added:

- Module demos for all 10 software layers.
- Product flow, account, database, backend API, frontend state, security, operations, testing, business and documentation demos.
- Module demo tests.
- Module demo map.

Updated:

- Root `npm test` now includes module demo tests.
- README, Roadmap, examples index, Master Index and quality documentation.

## 0.11.0 - Starter Generator

Added:

- Starter generator CLI.
- Six supported software starter types.
- Generated product brief, module selection, permission matrix, data model, API contract, security review, test plan, launch plan and risk register.
- Starter generator tests.

Updated:

- Root `npm test` now includes starter generator tests.
- README, Roadmap, Master Index and quality documentation.

## 0.10.0 - Publishing And Showcase Layer

Added:

- Showcase entry.
- Project one-pager.
- Repository tour.
- Release playbook.
- Maintainer handbook.
- Shareable project summaries.
- Changelog.

Updated:

- README entry points.
- Roadmap phase status.
- Automated verifier coverage.
- Quality documentation.

## 0.9.0 - Quick Reference Layer

Added:

- Master index.
- Glossary.
- Module artifact map.
- Technology comparison.
- Repository evaluation rubric.
- Common pitfalls.

## 0.8.0 - Learning Paths

Added:

- Role-based learning paths.
- 30-day plan.
- Exercises.
- Capstone projects.
- Self-assessment.

## 0.7.0 - Automated Quality Gates

Added:

- Root verification scripts.
- Example test command.
- GitHub Actions workflow.
- Automated checks documentation.

## 0.1.0 to 0.6.0 - Foundation Releases

Built the foundation:

- 10-module knowledge map.
- Runnable full-stack mini app.
- Complete app templates.
- Real project case studies.
- Architecture diagrams and operations runbooks.
- Decision guides and project kickoff templates.
