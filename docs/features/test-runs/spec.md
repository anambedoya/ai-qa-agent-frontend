# Playwright Generation, Test Runs, and Evidence specification

Status: Draft; not approved for implementation

Product references: [PROD-006–008, PROD-010–014](../../product/product-spec.md)

## Goal and known requirements

Request Playwright test generation and execution through the backend for an approved QA plan revision. Show execution progress, per-test PASS/FAIL/SKIPPED results, errors, and available evidence. The browser frontend never executes generated scripts. Retain provenance and keep job failure distinct from test assertion failure.

## Draft acceptance criteria

| ID      | Known expected behavior                                                                                                                                                               |
| ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| RUN-001 | Generation and execution reference the approved plan revision and corresponding generated artifact; the backend rejects unmet approval/provenance requirements.                       |
| RUN-002 | The backend uses Playwright as the only product test engine.                                                                                                                          |
| RUN-003 | Completed per-test results display PASS, FAIL, or SKIPPED, with errors and available evidence associated with the correct test/run.                                                   |
| RUN-004 | Backend, generation, or runner infrastructure errors remain distinct from assertion failures and cannot appear as passing QA. Missing/incomplete results are not synthesized as PASS. |
| RUN-005 | Run and evidence references preserve the original Feature, plan revision, and generation association.                                                                                 |

## Questions before approval

Resolve product browser coverage (OQ-004), target setup/credentials/data (OQ-005), evidence/retention (OQ-006), generated-test inspection/repair/reruns (OQ-008), locators/context (OQ-012), and asynchronous recovery (OQ-010). Specify disabled-case to SKIPPED mapping, concurrency, retry limits, timeouts, partial results, and runner execution boundaries. See the [question register](../../product/open-questions.md).

Frontend repository Chromium smoke tests validate the shell only and do not implement this workflow.
