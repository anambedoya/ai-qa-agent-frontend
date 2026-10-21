# Documentation map

Specifications describe intended behavior. The implementation must be validated against them; code does not silently redefine requirements.

| Source                 | Owns                                           | Entry point                                                                            |
| ---------------------- | ---------------------------------------------- | -------------------------------------------------------------------------------------- |
| Product requirements   | Audience, goals, workflow, constraints         | [Product specification](product/product-spec.md)                                       |
| MVP boundaries         | Included behavior and exclusions               | [MVP scope](product/mvp-scope.md)                                                      |
| Feature specifications | Observable behavior and acceptance criteria    | Feature index below                                                                    |
| Architecture           | Technical structure and integration boundaries | [Frontend architecture](architecture/frontend-architecture.md)                         |
| Architecture decisions | Rationale, alternatives, consequences          | [Decision index](decisions/README.md)                                                  |
| Integration proposal   | Suggested backend operations and payloads      | [API contracts](architecture/api-contracts.md)                                         |
| Implementation tasks   | Ordered work and verification                  | [Bootstrap plan](features/bootstrap/plan.md)                                           |
| Engineering process    | Coding rules, review, testing                  | [Conventions](conventions/engineering.md), [SDD workflow](conventions/sdd-workflow.md) |

## Feature specifications

| Specification                                                     | Status       | Next gate                    |
| ----------------------------------------------------------------- | ------------ | ---------------------------- |
| [Bootstrap](features/bootstrap/spec.md)                           | Approved     | Validate foundation          |
| [Projects](features/projects/spec.md)                             | Review-ready | Human specification review   |
| [Features](features/features/spec.md)                             | Review-ready | Human specification review   |
| [Requirement analysis](features/requirement-analysis/spec.md)     | Draft        | Resolve questions and review |
| [QA plan and human review](features/qa-plan/spec.md)              | Draft        | Resolve questions and review |
| [Test generation, runs, and evidence](features/test-runs/spec.md) | Draft        | Resolve questions and review |
| [AI assessment and QA report](features/qa-report/spec.md)         | Draft        | Resolve questions and review |

Detailed first-slice specifications are proposals ready for review, not authorization to implement product features. Later drafts record known requirements without approving undecided behavior. The API proposal requires agreement with the future backend repository.

See [open questions](product/open-questions.md) before designing the affected capabilities. Reuse the [specification](conventions/templates/spec.md), [technical design](conventions/templates/design.md), and [implementation plan](conventions/templates/plan.md) templates.
