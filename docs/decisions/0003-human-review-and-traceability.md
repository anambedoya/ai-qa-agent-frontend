# ADR 0003: Human review and traceability

Status: Accepted rule

Date: 2026-10-20

## Context

AI-generated QA plans must be reviewable before execution. A plan may change after approval, and old results must remain explainable.

## Decision

Approval identifies an exact backend-owned QA plan revision. Editing, adding, removing, enabling, or disabling a case invalidates approval. Generation and execution identify the approved revision. The backend enforces approval, revision, and generated-artifact provenance rather than trusting frontend state.

Preserve lineage from Feature and analysis to plan revision, generated test artifacts, run, evidence, and report. Existing run records retain their original provenance when a plan changes. Display AI interpretation separately from recorded results.

## Alternatives

A frontend-only approval flag cannot prevent stale or direct execution requests. Approval without revision identity cannot demonstrate what the user reviewed. Updating old run records to match a new plan would lose execution provenance.

## Consequences

Future contract and tests must cover stale approvals and plan edits. Generated test editing/repair and source requirement changes need additional specification before implementation; this ADR does not approve those workflows.
