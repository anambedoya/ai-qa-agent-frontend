# MVP scope

Status: Baseline approved; feature details require specification review.

## Included

- Single-user, local-first Angular desktop web frontend and a separately maintained local backend.
- Project creation and selection with a name and application URL.
- Feature creation and selection within a Project, with description and acceptance criteria.
- AI requirement analysis, including summary, missing requirements, ambiguities, and risks.
- Categorized QA plans with editable, addable, removable, enabled/disabled test cases and explicit human approval.
- Backend-driven Playwright test generation and execution, results, errors, and evidence.
- AI assessment and a QA report with failed tests, potential bugs, and generated bug-report drafts.
- A fully local, no-paid-service path using Ollama.

## Excluded

- Authentication, accounts, teams, collaboration, and cloud synchronization.
- Mobile applications, native applications, and mobile browser emulation.
- Browser offline editing and conflict resolution.
- Product test engines other than Playwright.
- Required paid AI providers, hosted databases, cloud storage, or paid CI.
- Autonomous execution of unapproved plans, automatic bug filing, and production deployment.
- Project/Feature deletion, general editing, and broader lifecycle management until separately specified.

Target applications requiring credentials or special test data need a later decision; absence of authentication in this tool does not settle how target application sessions work.

## Current milestone

Bootstrap delivers documentation, agent instructions, engineering tooling, and a neutral Angular shell. It implements none of the product capabilities above. No mock backend or simulated AI workflow is part of this milestone.

## Eventual MVP completion

Validate the complete [product workflow](product-spec.md) locally without paid services. Demonstrate persistence, the approval/revision gate, a successful run, a failing test with evidence, a skipped result, and honest handling of backend/model/execution failures. Resolve applicable [open questions](open-questions.md) and validate every approved feature criterion before claiming completion.
