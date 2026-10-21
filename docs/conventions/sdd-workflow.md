# Specification-driven development

Status: Accepted.

Specification → Technical design if necessary → Implementation plan → Implementation → Tests → Validation against specification

## 1. Specification

Start with [the specification template](templates/spec.md). Record the user goal, scope, observable behavior, stable acceptance IDs, failure scenarios, dependencies, and open questions. Reference product requirement IDs rather than duplicating the product document. Keep implementation tasks out of the specification.

Statuses are `Draft`, `Review-ready`, `Approved`, and `Superseded`. A Draft may contain unresolved product decisions. Review-ready means the author proposes it for human review; it does not authorize implementation. Record explicit user approval before starting feature implementation. Approval of bootstrap does not approve later product specifications.

## 2. Technical design when necessary

Use [the design template](templates/design.md) when a change introduces a cross-feature dependency, API integration, data ownership change, asynchronous workflow, or significant alternative approaches. A small feature can rely on existing architecture and state why no additional design is needed in its plan.

Resolve affected open questions and agree integration contracts before dependent implementation. Record enduring architectural decisions in ADRs, with context, decision, alternatives, and consequences. An ADR cannot silently change a product requirement.

## 3. Implementation plan

Use [the plan template](templates/plan.md). Break the approved behavior into ordered, reviewable tasks with acceptance IDs and test/validation commands. Make dependencies and exclusions explicit. Keep tasks in this plan, not in the specification or ADR.

## 4. Implementation and tests

Implement only the approved scope, adding behavior tests alongside code. If a requirement changes, update the specification and obtain review for the change before implementing it. Update design and tasks as necessary. Preserve existing IDs; add new IDs instead of renumbering historical criteria.

## 5. Validation

Check each acceptance criterion against automated evidence or a recorded manual review. Record passed, failed, and unverified criteria in the implementation plan with the commands/results and any limitations. Do not mark a milestone complete while required criteria remain failed or unverified.

Specifications remain the source of truth for behavior. A discovered mismatch requires either correcting code to the approved specification or an explicit requirements change; a test snapshot alone cannot approve a behavior change.

## Current gate

[Bootstrap](../features/bootstrap/spec.md) is approved. Projects and Features are review-ready proposals. Review them and resolve their integration dependencies before creating their implementation plans. Later workflow specifications remain drafts.
