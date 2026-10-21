# Open questions

Status: Open; none blocks the documentation and shell milestone.

Resolve each question in its affected specification or ADR before implementing the dependent behavior. Do not let example API payloads silently decide these questions.

| ID     | Question                                                                                                               | Blocks                                        | Resolution location                                   |
| ------ | ---------------------------------------------------------------------------------------------------------------------- | --------------------------------------------- | ----------------------------------------------------- |
| OQ-001 | Which backend language, framework, and local persistence approach will be used?                                        | Durable Projects/Features and all integration | Backend architecture; ADR 0002                        |
| OQ-002 | Which repository owns the executable API schema, and how will compatible contract snapshots reach the frontend?        | Real API services and contract tests          | API contracts; ADR 0004                               |
| OQ-003 | Which Ollama model, license, context limits, and minimum hardware support a credible $0 workflow?                      | Analysis, planning, generation, assessment    | Requirement Analysis specification; backend AI design |
| OQ-004 | Will product execution initially support Chromium only or additional desktop browsers?                                 | Test generation and execution                 | Test Runs specification                               |
| OQ-005 | How will target credentials, test data, destructive test actions, and target session setup be handled?                 | Testing applications requiring setup          | Test Runs specification; backend runner design        |
| OQ-006 | Which evidence types are required, and what are retention and deletion rules?                                          | Evidence collection and storage               | Test Runs specification                               |
| OQ-007 | Is report export required, and in what format?                                                                         | Report export only                            | QA Report specification                               |
| OQ-008 | Can users inspect/edit generated tests, and how do repairs, regeneration, and reruns preserve approval and provenance? | Generated test lifecycle                      | Test Runs and QA Plan specifications                  |
| OQ-009 | How are plan regeneration, stale analysis, and changes to source requirements represented?                             | Regeneration and requirement editing          | QA Plan specification                                 |
| OQ-010 | What job polling intervals, timeouts, recovery, and cancellation behavior should be agreed with the backend?           | Long-running API integration                  | API contracts; affected feature designs               |
| OQ-011 | What concrete size limits and duplicate-submission/idempotency behavior does the backend support?                      | Final Projects/Features API integration       | First-slice technical design and API contracts        |
| OQ-012 | What locator strategy and application context are needed to generate executable tests from requirements?               | Playwright generation                         | Test Runs specification; backend generation design    |

## Defaults already chosen

- The backend owns durable local data; browser offline editing is excluded.
- Angular talks to the backend, never directly to model providers or the test runner.
- HTTP with asynchronous jobs and polling is the initial architecture; concrete timing awaits backend agreement.
- Frontend repository smoke tests use Chromium. This does not choose the product runner's browser coverage.
- Use plain SCSS and lightweight Angular state management initially.
