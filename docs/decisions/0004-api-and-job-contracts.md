# ADR 0004: API and asynchronous jobs

Status: Accepted approach; wire contract proposed pending backend agreement

Date: 2026-10-20

## Context

Analysis, generation, execution, and assessment can outlast a normal request. Separate repositories need a reviewable integration boundary without provider-specific frontend coupling.

## Decision

Propose a versioned HTTP JSON API under `/api/v1`. Long-running operations return jobs that the frontend initially polls. Separate job states from test outcomes and AI interpretation. Keep backend failures explicit.

Maintain representative operations and examples in [API contracts](../architecture/api-contracts.md) during bootstrap. Agree executable schema ownership and synchronization with the backend before generating clients or implementing API services. No competing authoritative schema is created now.

## Alternatives

Holding every operation open in a synchronous request makes progress and recovery harder. WebSockets or event streams may be considered later if polling proves inadequate; they add no required bootstrap capability. Generated clients are premature before agreement on a schema.

## Consequences

Future implementation must define polling termination, teardown, timeouts, and recovery. Polling timing, cancellation, request idempotency, and concrete payload compatibility remain integration questions. Local bootstrap requires no API service or mock server.
