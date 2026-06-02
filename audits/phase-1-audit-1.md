# Phase 1 Audit 1

Date: 2026-06-03

## Scope

Audit the first local version of the software modules knowledge hub.

Checked:

- 10 requested modules exist.
- Each module has a clear purpose.
- Each module has category coverage.
- Each module has common data, flows, representative GitHub repositories, and a design checklist.
- The unified GitHub repository index exists.
- Links in the repository index and module documents resolve through GitHub CLI.

## Results

| Check | Result |
| --- | --- |
| 10 module documents exist | Pass |
| Each module has representative GitHub repositories | Pass |
| Each module has a design checklist | Pass |
| User's original 10-section requirement is covered | Pass |
| GitHub repository links resolve | Pass after fixes |
| Archived repositories avoided where practical | Pass after fixes |

## Issues Found

| Issue | Fix |
| --- | --- |
| Files were initially written outside the target repository directory | Moved all generated files into `software-modules-hub/` and cleaned the outer empty directories |
| `calcom/cal.com` redirects to the current GitHub repository name | Updated links to `calcom/cal.diy` |
| `casbin/casbin` resolves to the current Apache repository | Updated links to `apache/casbin` |
| `invoice-ninja/invoiceninja` did not resolve | Updated links to `invoiceninja/invoiceninja` |
| `minio/minio` is archived | Replaced it with `supabase/storage` and `seaweedfs/seaweedfs` |
| BullMQ display name did not match its owner | Updated display text to `taskforcesh/bullmq` |

## Remaining Risks

- Repository descriptions and maintenance status can change over time.
- This phase intentionally focuses on documentation and classification, not runnable demos.
- GitHub links were validated, but individual project quality still needs deeper evaluation before production use.

## Decision

Proceed to a second audit after the fixes.

