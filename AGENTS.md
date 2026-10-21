# Instructions for coding agents

This repository contains the Angular frontend of a local-first AI QA assistant. The backend is a separate repository. Specifications are the source of truth for observable behavior.

## Before changing code

1. Read [the documentation map](docs/README.md), [MVP scope](docs/product/mvp-scope.md), and the applicable feature specification.
2. Read [frontend architecture](docs/architecture/frontend-architecture.md), applicable [decisions](docs/decisions/README.md), and [engineering conventions](docs/conventions/engineering.md).
3. Follow [the SDD workflow](docs/conventions/sdd-workflow.md): specification, optional technical design, implementation plan, implementation, tests, validation.

## Scope and change rules

- Implement only approved specifications and the user's authorized task. `Draft` and `Review-ready` do not mean approved. Explicit user approval can approve a specification; record that approval in its status before implementation.
- Update specifications before changing observable behavior. Do not silently resolve product questions in application code.
- Keep requirements in specifications, technical choices in architecture/ADRs, and execution tasks in implementation plans. Use stable acceptance-criterion IDs to connect plans and tests.
- The approved bootstrap includes documentation, tooling, and a minimal shell only. Do not implement Projects, Features, AI orchestration, QA planning, test execution, or reports as part of bootstrap.
- Keep changes focused. Avoid speculative abstractions, empty feature scaffolds, and unrelated refactors.

## Boundaries to preserve

- Angular components use feature services. Never connect the browser directly to Ollama, paid AI providers, or Playwright execution.
- The local backend owns durable data, AI provider adapters, generated tests, execution, and evidence. Do not add browser persistence or synchronization without a reviewed requirement.
- Every core workflow step must remain possible without paid services. Do not add API keys or paid dependencies as prerequisites.
- A QA plan revision requires explicit human approval before generation and execution. Any plan edit invalidates approval. The backend must enforce this; a disabled button is insufficient.
- Preserve run provenance and distinguish AI interpretation from actual execution evidence. Job failure is not a passing test result.
- No authentication, mobile applications, SSR, or additional product test engines belong to the MVP.

## Verification and handoff

- Use Node from `.nvmrc` and `npm ci`; preserve `package-lock.json`.
- Run `npm run check`, `npm run build`, and `npm run test:e2e` for foundation changes. For later work, run relevant checks and tests linked to the changed acceptance criteria.
- Unit tests use Vitest; frontend browser tests use Playwright. The product generates Playwright tests only.
- Add meaningful behavior tests, rather than assertions that copy implementation details. Keep browser tests under `e2e/` and unit tests next to their source.
- Report changed behavior, checks run, failed or unverified acceptance criteria, and unresolved requirements. Never report unrun checks as passing.
- Do not create commits, remotes, deployments, or external communications unless explicitly requested.
