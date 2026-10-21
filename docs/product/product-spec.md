# Product specification

Status: Baseline vision approved for bootstrap documentation; individual feature implementation requires its own approval.

## Audience and goal

Developers working on desktop web applications need help turning requirements into a repeatable, inspectable QA cycle. This portfolio project provides a local-first AI assistant that proposes analysis and tests, preserves human control, and connects execution outcomes to evidence and reports.

## Core workflow

Project → Feature → Requirement Analysis → QA Plan → Human Review → Playwright Test Generation → Test Execution → Evidence Collection → AI Assessment → QA Report

A Project identifies the application under test by name and application URL. A Feature belongs to one Project and records a description and acceptance criteria. Requirement Analysis summarizes the feature and identifies missing requirements, ambiguities, and risks. A QA Plan contains categorized test cases. Human Review edits the plan and explicitly approves a particular revision. Generated Playwright tests and subsequent runs reference that revision. Evidence supports recorded results; AI Assessment interprets those results and contributes to a QA Report and bug-report drafts.

## Product requirements

| ID       | Requirement                                                                                                                                            |
| -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| PROD-001 | Support creating Projects with a name and application URL.                                                                                             |
| PROD-002 | Support creating Features within a Project, with a description and acceptance criteria.                                                                |
| PROD-003 | Display AI-generated requirement summaries, missing requirements, ambiguities, and risks.                                                              |
| PROD-004 | Display QA test cases categorized as Happy path, Negative, Boundary, or Edge cases.                                                                    |
| PROD-005 | Allow users to edit, add, remove, enable, and disable test cases before approving a plan.                                                              |
| PROD-006 | Require human approval of the current QA plan revision before generation and execution; any plan edit invalidates approval.                            |
| PROD-007 | Generate and execute Playwright tests through the backend. Playwright is the only product test engine in the MVP.                                      |
| PROD-008 | Display per-test PASS, FAIL, or SKIPPED outcomes, errors, and available evidence. Distinguish operation failures from test outcomes.                   |
| PROD-009 | Display overall QA assessment, failed tests, potential bugs, and generated bug-report drafts. Label AI interpretation separately from execution facts. |
| PROD-010 | Make the complete core workflow usable without paid services or AI API keys, using local Ollama initially.                                             |
| PROD-011 | Keep AI integration provider-agnostic behind the backend, allowing future paid-provider adapters without changing frontend components.                 |
| PROD-012 | Run locally, without authentication, for a single user working on desktop web applications. The backend owns durable local data and evidence.          |
| PROD-013 | Use Angular and TypeScript in this frontend repository, separate from the backend repository.                                                          |
| PROD-014 | Preserve traceability from a Feature and approved plan revision to generated tests, runs, evidence, and assessments.                                   |

## Human control and evidence

An AI proposal is not an approved plan. Approval must be explicit and tied to a revision, including enabled/disabled test-case choices. Previous execution records remain associated with their original revision after a plan changes. The backend must reject generation or execution requests that do not meet the approval rule.

An unavailable model, incomplete run, missing report, or infrastructure error must not be represented as successful QA. Potential bugs and generated reports are AI-assisted drafts, not confirmed defects solely because the model proposed them.

## Local-first and cost interpretation

The browser, backend, Ollama, and Playwright run on the developer's machine. Project data, plans, runs, and evidence persist in backend-managed local storage. Restarting the frontend does not erase them. Browser offline editing and synchronization are not required.

The $0 requirement means no mandatory paid services, subscriptions, or metered AI APIs for any core step. It assumes existing hardware and allows initial downloads of dependencies, models, and browser binaries. Hardware suitability and the default model remain [open questions](open-questions.md).

## Success criteria

With the local services running, a developer can create a project and feature, inspect analysis, revise and approve a plan, generate and run Playwright tests, inspect evidence, and read a traceable assessment and report without a paid account. This is the eventual MVP acceptance journey, not a bootstrap deliverable.
