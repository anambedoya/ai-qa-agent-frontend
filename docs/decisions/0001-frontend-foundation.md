# ADR 0001: Frontend foundation

Status: Accepted

Date: 2026-10-20

## Context

The MVP requires Angular and TypeScript, local desktop web use, and a foundation small enough for a portfolio project. Features have not been implemented.

## Decision

Use Angular 22.2.3 as a standalone, zoneless, client-rendered SPA with Router, strict TypeScript/templates, and SCSS. Use Node 24.19.0, npm 11.17.0, and a committed lockfile. Organize future implementation by feature, with signals for local state, RxJS for asynchronous work, and typed reactive forms. Introduce lazy-loaded routes with actual features.

Use ESLint, Prettier, Vitest for frontend units, and Playwright Chromium for frontend browser checks. Product execution remains Playwright-only. No hosted services are required for these checks.

## Alternatives

NgModule-first organization, a global state library, SSR, a monorepo orchestrator, and a component library add structure without a current requirement. They are deferred rather than installed speculatively.

## Consequences

The shell can run without a backend. Future shared abstractions require concrete use cases. Angular and Node versions are updated deliberately with compatibility verification and the lockfile, not through global runtime changes.
