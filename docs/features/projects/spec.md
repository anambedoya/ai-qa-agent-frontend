# Projects specification

Status: Review-ready; implementation not approved

Product references: [PROD-001, PROD-010, PROD-012–014](../../product/product-spec.md)

## Goal and scope

A developer creates and selects a saved Project identifying a desktop web application. Support listing Projects, creating one, and selecting it as the context for Features. Do not add editing, deletion, accounts, project membership, connectivity scanning, or automatic application discovery.

## Inputs and behavior

A Project has a required name and application URL. Trim surrounding whitespace. A blank/whitespace-only name is invalid. The URL must be an absolute HTTP or HTTPS URL with a host; localhost, ports, and application paths are supported. Do not require internet availability or probe the URL during creation. Do not invent name uniqueness or length restrictions; agree server limits before integration.

Present clearly labeled fields and field-level validation on interaction/submission. Invalid submission preserves the entered values and sends no creation request. While saving, indicate progress and prevent repeated submission. Successful creation uses the backend-returned Project ID, shows the saved Project, and makes its Features context available.

The backend owns persistence. Show loading while fetching saved Projects, an explicit empty state with a creation action when none exist, and an error with a retry action if loading fails. Do not show unavailable data as an empty successful collection. Creation failures preserve inputs and never display a saved Project before backend confirmation.

Selecting a Project shows its name and application URL and its own Features context. A missing Project must produce a missing-resource state rather than another Project's data. Returning or reloading loads persisted backend data. Duplicate names and application URLs are allowed unless a later reviewed requirement changes this.

## Acceptance criteria

| ID       | Scenario and expected behavior                                                                                                                                                                           |
| -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| PROJ-001 | When the developer opens Projects, fetching shows loading; a successful fetch shows the saved Projects, or an explicit empty state with a create action when no Projects exist.                          |
| PROJ-002 | Given a nonblank name and valid HTTP(S) application URL, submitting once creates one Project; after backend confirmation its returned name, URL, and ID are available for selection.                     |
| PROJ-003 | Given missing/whitespace-only name, missing URL, relative URL, or a non-HTTP(S) scheme, submission shows associated validation feedback, preserves inputs, and sends no creation request.                |
| PROJ-004 | Local URLs such as `http://localhost:3000/app` and valid HTTPS URLs are accepted without a connectivity probe. Surrounding whitespace is trimmed.                                                        |
| PROJ-005 | While creation is pending, repeated form submission is prevented and progress is visible. A validation/server/network rejection preserves inputs, shows an actionable error, and does not claim success. |
| PROJ-006 | A Projects load failure displays an error and retry action; successful retry displays backend data. Failure is not represented as an empty saved collection.                                             |
| PROJ-007 | Selecting a saved Project establishes that Project's context and exposes only its Features. A missing Project displays a missing-resource state.                                                         |
| PROJ-008 | After successful creation, reloading the frontend retrieves the Project from the backend; the browser is not the persistence authority.                                                                  |
| PROJ-009 | Creating another Project with an existing name or application URL is permitted; no uniqueness rule is inferred.                                                                                          |

## Failure cases and dependencies

Backend unavailability is visible, with no offline queue or local substitute. Do not automatically retry creation: a lost response can leave persistence uncertain. Show the failure, preserve inputs, and allow reloading saved Projects before manual resubmission. Finalize idempotency behavior and server limits in OQ-011 before implementing integration.

Requires [OQ-001, OQ-002, OQ-011](../../product/open-questions.md) and agreement on the [proposed API](../../architecture/api-contracts.md). After human review, create an implementation plan referencing PROJ IDs; a technical design is appropriate for the first backend integration.

## Review

Prepared for human specification review. Bootstrap approval does not authorize Projects implementation.
