# Architecture decisions

An ADR records technical context, a decision, alternatives, and consequences. It does not define product behavior or carry implementation task lists.

| ADR                                           | Status                               | Decision                                                |
| --------------------------------------------- | ------------------------------------ | ------------------------------------------------------- |
| [0001](0001-frontend-foundation.md)           | Accepted                             | Angular SPA and lightweight frontend organization       |
| [0002](0002-local-backend-boundary.md)        | Accepted boundary                    | Local backend owns persistence, AI adapters, and runner |
| [0003](0003-human-review-and-traceability.md) | Accepted rule                        | Revision-bound human approval and execution provenance  |
| [0004](0004-api-and-job-contracts.md)         | Accepted approach; contract proposed | Versioned HTTP and asynchronous jobs with polling       |

Number new ADRs sequentially. When replacing a decision, retain the old ADR, mark it superseded, and link its replacement. Accepted frontend decisions do not imply that the future backend implementation or API payloads have already been agreed.
