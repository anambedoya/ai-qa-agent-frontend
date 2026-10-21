# QA Plan and Human Review specification

Status: Draft; not approved for implementation

Product references: [PROD-004–006, PROD-010–014](../../product/product-spec.md)

## Goal and known requirements

Display AI-proposed test cases categorized as Happy path, Negative, Boundary, or Edge cases. Users can edit, add, remove, enable, and disable cases. Require explicit human approval of the current revision before Playwright generation and execution. Backend enforcement is mandatory.

## Draft acceptance criteria

| ID       | Known expected behavior                                                                                                                     |
| -------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| PLAN-001 | Generated test cases are displayed under the four product categories.                                                                       |
| PLAN-002 | Users can edit, add, remove, enable, and disable test cases before approving the current revision.                                          |
| PLAN-003 | Editing any plan content, including enabled flags, invalidates approval; generation and execution require approval of the current revision. |
| PLAN-004 | The backend rejects stale or unapproved generation/execution requests, even if issued outside the frontend controls.                        |
| PLAN-005 | Existing run records retain their original plan revision after the current plan changes.                                                    |

## Questions before approval

Specify test-case required fields/validation, plan regeneration and source-change behavior (OQ-009), empty/all-disabled plans, saving/concurrency behavior, and approval interactions. Resolve job and API contracts (OQ-002, OQ-010) and generated-test lifecycle interactions (OQ-008). See the [question register](../../product/open-questions.md) and [approval ADR](../../decisions/0003-human-review-and-traceability.md).

These open questions must not be silently resolved from example API payloads.
