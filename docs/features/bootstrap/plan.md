# Bootstrap implementation plan

Status: Complete

Specification: [Approved bootstrap specification](spec.md)

Design: [Frontend architecture](../../architecture/frontend-architecture.md) and [ADRs](../../decisions/README.md); no additional design needed.

## Tasks

| Order | Task                                                                                                  | Acceptance IDs               | Verification                                    |
| ----- | ----------------------------------------------------------------------------------------------------- | ---------------------------- | ----------------------------------------------- |
| 1     | Select pinned Node/npm and initialize an independent local Git repository without a remote or commit. | BOOT-001, BOOT-008           | Runtime versions and Git inspection             |
| 2     | Write product requirements, scope, question register, first-slice specifications, and later drafts.   | BOOT-003, BOOT-004           | Documentation review and link check             |
| 3     | Document architecture, API proposal, ADRs, conventions, templates, and agent instructions.            | BOOT-003, BOOT-005, BOOT-006 | Documentation review and link check             |
| 4     | Scaffold and simplify the standalone Angular shell without feature implementations.                   | BOOT-001, BOOT-002, BOOT-008 | Build, unit smoke, browser smoke, source review |
| 5     | Configure ESLint, Prettier, Vitest, Playwright, and documented commands.                              | BOOT-007                     | Clean install and local checks                  |
| 6     | Record criterion-level validation evidence and any remaining gaps.                                    | BOOT-001–008                 | Validation table below                          |

## Validation record

Validated on 2026-10-20 in `~/Documents/Personal/Programming/Projects/ai-qa-agent-frontend` with Node 24.19.0 and npm 11.17.0. Dependencies were reinstalled from the lockfile into a clean `node_modules` using the temporary download cache (`npm ci --offline --no-audit --no-fund`). No backend was running or required.

| Acceptance IDs | Result | Evidence and limitations                                                                                                                                                                                                                      |
| -------------- | ------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| BOOT-001       | Passed | Clean `npm ci` installed 385 packages. `npm run build` succeeded with an initial bundle of 190.01 kB. Source/config inspection confirmed strict TypeScript/templates, standalone Router shell, explicit zoneless providers, SCSS, and no SSR. |
| BOOT-002       | Passed | One Vitest shell test and one Chromium browser test passed with the real application providers. The browser asserted the title, neutral message, absence of product controls, and no API/external requests or browser errors.                 |
| BOOT-003       | Passed | `npm run docs:check` validated 76 repository-relative links across 26 Markdown files. Reviewed documentation responsibilities and specification/task separation.                                                                              |
| BOOT-004       | Passed | Reviewed PROD-001–014 against scope and the full workflow. Verified Projects/Features are Review-ready and the four later workflow specifications are Draft.                                                                                  |
| BOOT-005       | Passed | Reviewed architecture and all four ADRs. Verified the API document explicitly marks its operations and examples as a proposal pending backend agreement.                                                                                      |
| BOOT-006       | Passed | Reviewed AGENTS.md, engineering conventions, SDD workflow, and three templates for scope, review gates, stable acceptance IDs, and validation requirements.                                                                                   |
| BOOT-007       | Passed | `npm run check` passed formatting, ESLint 10, documentation links, and Vitest (1 test). `npm run build` passed. `npm run test:e2e` passed (1 Chromium test) using the standard local browser cache.                                           |
| BOOT-008       | Passed | Source/tree inspection confirmed shell-only implementation, no feature directories/services/domain models/backend calls/persistence, and no AI SDK or runner integration. Git is initialized on `main` with no commits or remotes.            |

## Remaining work

No required bootstrap work remains. Projects and Features await human specification review, backend decisions, contract agreement, and their own technical design/implementation plan. Later workflow specifications remain drafts; product end-to-end validation is deferred until those approved capabilities exist.

## Environment notes

The shell uses the pinned installed runtime rather than the machine's Node 12 default. Initial downloads required network access; Chromium verification used the headless package to fit available disk space. The browser binary is installed in the standard local Playwright cache. Sandbox restrictions required elevated execution for the target folder, downloads, and loopback browser test. No system runtime defaults, remote services, or unrelated repository files were changed.
