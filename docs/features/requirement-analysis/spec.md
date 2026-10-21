# Requirement Analysis specification

Status: Draft; not approved for implementation

Product references: [PROD-003, PROD-010–014](../../product/product-spec.md)

## Goal and known requirements

For a saved Feature, present provider-neutral AI analysis with a summary, missing requirements, ambiguities, and risks. AI runs through the local backend and initially Ollama. Keep the source Feature association visible and distinguish analysis from user-provided requirements.

## Draft acceptance criteria

| ID           | Known expected behavior                                                                                           |
| ------------ | ----------------------------------------------------------------------------------------------------------------- |
| ANALYSIS-001 | A completed analysis displays its summary, missing requirements, ambiguities, and risks for the correct Feature.  |
| ANALYSIS-002 | An unavailable backend/model or failed analysis is visible as a failure, not a fabricated successful analysis.    |
| ANALYSIS-003 | The operation uses the backend's provider-neutral boundary; it requires no paid service or frontend provider SDK. |

## Questions before approval

Resolve model/hardware (OQ-003), job lifecycle (OQ-010), and executable contract ownership (OQ-002). Specify trigger/retry behavior, empty-category presentation, source revision handling, and whether analysis can be regenerated. See the [question register](../../product/open-questions.md).

No implementation tasks or runtime types are defined in this draft.
