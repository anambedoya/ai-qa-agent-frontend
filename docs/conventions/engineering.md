# Engineering conventions

Status: Accepted for bootstrap and subsequent work unless superseded by an ADR.

## Runtime and commands

Use Node 24.19.0 from `.nvmrc` and npm 11.17.0. Install reproducibly with `npm ci` and include lockfile changes with dependency changes. Do not use global Angular CLI installations or change other repositories' runtime defaults.

| Command                | Purpose                                                          |
| ---------------------- | ---------------------------------------------------------------- |
| `npm start`            | Start the local development server                               |
| `npm run build`        | Production build with Angular budgets and type/template checking |
| `npm test`             | Run Vitest unit tests once                                       |
| `npm run test:watch`   | Watch unit tests                                                 |
| `npm run test:e2e`     | Run Playwright Chromium smoke/browser tests                      |
| `npm run test:e2e:ui`  | Open Playwright's interactive runner                             |
| `npm run lint`         | Check TypeScript and Angular templates                           |
| `npm run format:check` | Check formatting without writing                                 |
| `npm run format`       | Intentionally format source and documentation                    |
| `npm run docs:check`   | Check repository-relative Markdown links and anchors             |
| `npm run check`        | Formatting, lint, documentation links, and unit tests            |

## Angular and TypeScript

- Use standalone components and Angular's concise file naming (`app.ts`, `project-list.ts`). Use kebab-case paths and descriptive symbols.
- Keep TypeScript strictness and strict template checking enabled. Avoid `any`, unexplained non-null assertions, and disabled lint rules.
- Use `inject()` for dependencies, signals for local synchronous state, and RxJS for HTTP/async composition. Use Angular cleanup utilities for subscriptions.
- Prefer `OnPush` components, semantic HTML, explicit button types, labels, keyboard access, and readable validation feedback.
- Use typed reactive forms for future editable data. Keep validation requirements in the applicable specification.
- Lazy-load feature routes when introduced. Keep feature API and state services within the feature; shared presentation code must not import features.
- Do not create global stores, generic repositories, base components, or provider abstractions without a demonstrated frontend need.
- Use scoped SCSS and global styles only for app-wide foundations. Do not introduce a UI framework without a reviewed decision.

## Integration boundaries

Components call feature services. Feature services use Angular HTTP infrastructure and explicit DTOs once the backend contract is agreed. Mapping between transport shapes and presentation state belongs in services, not templates. Never import provider SDKs or runner logic into the frontend.

Treat backend/model/execution errors as explicit UI states. Do not turn failed requests into successful empty data or automatically retry state-changing operations. API configuration and development proxying will be added with the first approved integration; bootstrap has no backend dependency.

Do not store credentials, test evidence, generated scripts, or model output in source control. The app is intended for local use; unauthenticated public hosting is outside the MVP.

## Tests and review

Vitest covers meaningful component/service behavior with Angular TestBed as needed. Playwright covers browser journeys. Co-locate unit tests as `*.spec.ts`; place browser tests under `e2e/`. This tooling distinction does not add another product test engine.

Link tests and implementation tasks to acceptance-criterion IDs. Test failures, unavailable services, disabled cases, and revision approval where applicable. Prefer accessible locators over CSS implementation details. Avoid arbitrary sleeps, external services, and brittle styling assertions.

For foundation changes run `npm run check`, `npm run build`, and `npm run test:e2e`. Future feature plans specify their relevant checks. No percentage coverage target or hosted CI is required initially.

Review behavior against the specification, architecture against ADRs, and tests against acceptance criteria. Update the feature plan with validation evidence and remaining gaps. A green build alone does not establish product acceptance.
