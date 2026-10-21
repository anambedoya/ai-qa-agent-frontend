# AI QA Agent frontend

An Angular frontend foundation for a local-first AI QA assistant. This milestone contains SDD documentation, engineering tools, and a minimal shell. Product features and backend integrations are not implemented.

The eventual workflow is Project → Feature → Requirement Analysis → QA Plan → Human Review → Playwright Test Generation → Test Execution → Evidence Collection → AI Assessment → QA Report. Every step must have a local path requiring no paid service, initially using Ollama through a separate backend.

## Start here

- [Documentation map and specification statuses](docs/README.md)
- [Product specification](docs/product/product-spec.md) and [MVP scope](docs/product/mvp-scope.md)
- [Frontend architecture](docs/architecture/frontend-architecture.md) and [proposed API contracts](docs/architecture/api-contracts.md)
- [SDD workflow](docs/conventions/sdd-workflow.md), [engineering conventions](docs/conventions/engineering.md), and [agent instructions](AGENTS.md)
- [Bootstrap specification](docs/features/bootstrap/spec.md) and [validation record](docs/features/bootstrap/plan.md)

## Local setup

Use Node **24.19.0** (`.nvmrc`) and npm **11.17.0**. With nvm installed:

```bash
nvm install
nvm use
npm ci
npm start
```

Open `http://127.0.0.1:4200`. The shell does not require a backend, Ollama, credentials, or any external runtime service. Initial dependency and browser downloads require internet access. Runtime defaults in other repositories need not change.

## Verification

```bash
npm run check
npm run build
npx playwright install chromium --only-shell
npm run test:e2e
```

Playwright starts its own development server on port 4200; stop a manually started server on that port first. On Linux, if Playwright reports missing host libraries, use its documented `npx playwright install-deps chromium` setup for your machine. Browser reports and test artifacts are ignored by Git.

For headed browser tests or the interactive runner, install the full browser with `npx playwright install chromium`.

Additional commands: `npm run test:watch`, `npm run test:e2e:ui`, `npm run format`, `npm run format:check`, `npm run lint`, and `npm run docs:check`. The production browser build is under `dist/ai-qa-agent-frontend/browser/`.

Vitest tests frontend unit behavior; Playwright tests frontend browser behavior. The product's eventual generated QA tests use Playwright exclusively. The Chromium shell smoke test does not decide the backend runner's browser coverage.

## Repository boundaries

This repository owns Angular presentation and frontend state. The separate local backend will own durable resources, AI provider adapters, Playwright generation/execution, evidence, and reports. Frontend components never connect directly to Ollama or paid providers. Browser offline editing is outside the MVP.

The API document is a proposal requiring backend agreement. There is no mock backend, generated API client, persistence layer, or feature scaffold in this foundation.

## Next milestone

Review the [Projects](docs/features/projects/spec.md) and [Features](docs/features/features/spec.md) specifications. They are review-ready, not approved for implementation. Resolve their [backend integration questions](docs/product/open-questions.md), agree a contract, and create a technical design and implementation plan before coding the first product slice. Later workflow specifications remain drafts.
