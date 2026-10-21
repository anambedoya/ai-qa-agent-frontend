# Bootstrap specification

Status: Approved

Approval: User explicitly requested implementation of the reviewed foundation plan on 2026-10-20.

Product references: [PROD-010–014](../../product/product-spec.md)

## Goal and scope

Create a reproducible Angular frontend foundation and an SDD source of truth before product feature implementation. Deliver documentation, conventions, root coding-agent instructions, and a neutral runnable shell. Exclude backend code, mock services, runtime domain models, generated API clients, and all product capabilities.

## Acceptance criteria

| ID       | Scenario and expected behavior                                                                                                                                                                                                                                                  |
| -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| BOOT-001 | In the standalone frontend repository, a documented supported Node/npm runtime and repository lockfile allow a clean `npm ci` and production build. Strict TypeScript/templates, Router, standalone components, zoneless change detection, and SCSS are configured without SSR. |
| BOOT-002 | Opening the root URL displays only the AI QA Agent title and neutral foundation message within an accessible main landmark, with a router outlet and no product forms/actions. The shell works without the backend and makes no application API or external-service requests.   |
| BOOT-003 | The documentation map distinguishes product requirements, architecture decisions, feature specifications, and implementation tasks; all repository-relative Markdown links and anchors resolve.                                                                                 |
| BOOT-004 | The product documentation records the full workflow and every MVP constraint. Projects and Features have detailed review-ready specifications; later feature specifications are marked Draft.                                                                                   |
| BOOT-005 | Architecture documents and ADRs capture provider independence, local backend ownership, human approval tied to revisions, execution provenance, versioned HTTP, and asynchronous jobs. API examples are explicitly proposed pending backend agreement.                          |
| BOOT-006 | Root AGENTS.md, conventions, and templates explain specification review, optional design, implementation planning, tests, and validation against stable acceptance IDs.                                                                                                         |
| BOOT-007 | Formatting, lint, documentation-link checks, configured Vitest tests, production build, and Playwright Chromium smoke tests pass locally. The browser test detects application errors and unexpected API/external requests without a backend.                                   |
| BOOT-008 | No product features, backend services, domain/API client implementations, or empty speculative feature scaffolds are delivered. No remote or commit is created.                                                                                                                 |

## Dependencies

Node/npm, npm registry access for initial installation, and a Playwright Chromium binary plus supported host libraries are required for initial verification. Subsequent shell operation requires no AI model or backend. The target repository must be writable.

## Design and validation

The [frontend architecture](../../architecture/frontend-architecture.md) and accepted [ADRs](../../decisions/README.md) are sufficient for this milestone; no separate technical design is needed. Tasks and validation evidence belong in the [bootstrap plan](plan.md).
