# AI Assessment and QA Report specification

Status: Draft; not approved for implementation

Product references: [PROD-009–014](../../product/product-spec.md)

## Goal and known requirements

For a recorded run, display overall QA assessment, failed tests, potential bugs, and generated bug-report drafts. The backend performs AI assessment using recorded results and evidence. Label AI interpretation separately from execution facts and link findings to their source run/tests/evidence where available.

## Draft acceptance criteria

| ID         | Known expected behavior                                                                                                                 |
| ---------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| REPORT-001 | A completed report displays overall assessment, failed tests, potential bugs, and generated bug-report drafts for its source run.       |
| REPORT-002 | AI findings are identified as interpretation or drafts, while actual test outcomes remain traceable to recorded execution and evidence. |
| REPORT-003 | An unavailable/failed assessment does not fabricate a report or overall pass; recorded test results remain available.                   |
| REPORT-004 | Report generation has a fully local Ollama path without a paid service requirement or frontend provider coupling.                       |

## Questions before approval

Specify assessment categories and required report/bug fields, handling of partial or all-skipped runs, generation trigger/retry behavior, and report export (OQ-007). Resolve model suitability and job/API contracts (OQ-002, OQ-003, OQ-010). See the [question register](../../product/open-questions.md).

Automatic external issue creation is excluded from the MVP.
