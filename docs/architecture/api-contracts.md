# API contracts

Status: **Proposal pending agreement with the backend repository.** Examples are design discussion material, not implemented endpoints, generated TypeScript models, or a finalized executable schema. Bootstrap has no API client.

## Boundary and ownership

Propose a local HTTP JSON API under `/api/v1`. The backend owns identifiers, persistence, revisions, approvals, jobs, runner artifacts, evidence, and AI provider adapters. The frontend receives provider-neutral resources; no model SDK or provider response envelope crosses into components.

Use opaque string IDs and UTC timestamp strings in examples. Finalize executable schema ownership, compatible contract distribution, field constraints, pagination if needed, and idempotency with the backend before integrating. Until then, this document owns only the frontend's integration proposal. Record agreement in ADR 0004 rather than independently maintaining conflicting schemas.

## Resources

| Resource             | Proposed information                                                                                   |
| -------------------- | ------------------------------------------------------------------------------------------------------ |
| Project              | ID, name, application URL                                                                              |
| Feature              | ID, parent Project ID, description, acceptance criteria as a string list                               |
| Requirement analysis | ID, Feature ID, source revision, summary, missing requirements, ambiguities, risks                     |
| QA plan              | ID, Feature ID, revision, test cases, approval for that revision                                       |
| Test case            | ID, category, title, steps, expected result, enabled flag                                              |
| Generation artifact  | ID, Feature ID, plan ID/revision, source analysis reference, backend-owned generated test reference    |
| Job                  | ID, operation kind, state, result reference or error                                                   |
| Test run             | ID, Feature ID, plan revision, generation reference, execution state and results                       |
| Test result          | Test case ID, PASS/FAIL/SKIPPED outcome, error if relevant, evidence references                        |
| Evidence             | ID, run/test association, media type, backend-served URL; no raw filesystem path                       |
| Assessment/report    | Run ID, assessment status/text, failed-test references, potential bugs and generated bug-report drafts |

Test categories are proposed wire values `HAPPY_PATH`, `NEGATIVE`, `BOUNDARY`, `EDGE_CASE`; the UI labels follow the product wording. Approval metadata must identify the approved revision without requiring an authenticated user account.

## Proposed operations

| Operation                          | Method and path                                                             | Expected behavior                                                             |
| ---------------------------------- | --------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| List/create Projects               | `GET /projects`, `POST /projects`                                           | Return saved Projects / create one                                            |
| Read Project                       | `GET /projects/{projectId}`                                                 | Return saved Project or missing-resource error                                |
| List/create Features               | `GET /projects/{projectId}/features`, `POST /projects/{projectId}/features` | Preserve parent ownership                                                     |
| Read Feature                       | `GET /features/{featureId}`                                                 | Return description, criteria, parent ID                                       |
| Analyze requirements               | `POST /features/{featureId}/analyses`                                       | Start analysis job                                                            |
| Read analysis                      | `GET /analyses/{analysisId}`                                                | Retrieve completed analysis                                                   |
| Generate QA plan                   | `POST /features/{featureId}/qa-plans`                                       | Start plan-generation job from analysis                                       |
| Read/update plan                   | `GET /qa-plans/{planId}`, `PUT /qa-plans/{planId}`                          | Save cases with revision conflict checks; edits invalidate approval           |
| Approve plan                       | `POST /qa-plans/{planId}/approvals`                                         | Explicitly approve submitted current revision                                 |
| Generate Playwright tests          | `POST /qa-plans/{planId}/generations`                                       | Start job referencing approved revision                                       |
| Read generation                    | `GET /generations/{generationId}`                                           | Retrieve provenance and artifact metadata                                     |
| Start/read run                     | `POST /runs`, `GET /runs/{runId}`                                           | Execute generated artifacts for approved revision / read progress and results |
| Read job                           | `GET /jobs/{jobId}`                                                         | Poll long-running operation                                                   |
| Read evidence                      | `GET /evidence/{evidenceId}`                                                | Serve backend-managed evidence content                                        |
| Request/read assessment and report | `POST /runs/{runId}/reports`, `GET /runs/{runId}/report`                    | Start assessment/report job / retrieve report                                 |

Paths in this table are relative to `/api/v1`. Project/Feature update and deletion are intentionally absent. Plan updates include additions/removals and enabled flags; they are not executed at bootstrap.

## First-slice examples

`POST /api/v1/projects` → `201 Created`

```json
{ "name": "Demo shop", "applicationUrl": "http://localhost:3000" }
```

```json
{ "id": "project-1", "name": "Demo shop", "applicationUrl": "http://localhost:3000" }
```

`POST /api/v1/projects/project-1/features` → `201 Created`

```json
{
  "description": "A visitor can search the product catalog.",
  "acceptanceCriteria": ["Searching for an existing product displays matching results."]
}
```

```json
{
  "id": "feature-1",
  "projectId": "project-1",
  "description": "A visitor can search the product catalog.",
  "acceptanceCriteria": ["Searching for an existing product displays matching results."]
}
```

Proposed list responses are `{ "items": [...] }`. Settle server validation/limits and lost-response/idempotency behavior before implementing real creation services.

## Approval and asynchronous examples

An approval request includes `{ "revision": 3 }`. A generation request includes `{ "planRevision": 3 }`. A run request includes `{ "planId": "plan-1", "planRevision": 3, "generationId": "generation-1" }`. The backend verifies current approval and matching generation provenance; it must not trust a frontend boolean.

A long-running operation returns `202 Accepted`, a `Location` for its job, and:

```json
{ "jobId": "job-1", "state": "QUEUED" }
```

Poll `GET /api/v1/jobs/job-1`. Proposed job states are `QUEUED`, `RUNNING`, `SUCCEEDED`, and `FAILED`. Successful jobs provide a typed result reference; failed jobs provide an error. Whether terminal state can be recovered after interruption, and the poll interval/timeouts/cancellation policy, require agreement before implementation.

```json
{
  "id": "job-1",
  "kind": "REQUIREMENT_ANALYSIS",
  "state": "SUCCEEDED",
  "result": { "resourceType": "analysis", "id": "analysis-1" }
}
```

A runner job can succeed in completing execution while tests fail. Conversely, an infrastructure failure does not mean the application's assertions failed. A result may look like:

```json
{
  "id": "run-1",
  "featureId": "feature-1",
  "planId": "plan-1",
  "planRevision": 3,
  "generationId": "generation-1",
  "state": "SUCCEEDED",
  "results": [
    {
      "testCaseId": "case-1",
      "outcome": "FAIL",
      "error": "Expected search results to be visible.",
      "evidence": [
        {
          "id": "evidence-1",
          "mediaType": "image/png",
          "url": "/api/v1/evidence/evidence-1"
        }
      ]
    }
  ]
}
```

This screenshot is illustrative; required evidence types remain open. Disabled cases retain their relationship to the plan; precise skipped-result representation is settled in the Test Runs specification. Never synthesize PASS for missing or unfinished results.

Reports retain run references and distinguish recorded execution results from an AI assessment and potential-bug drafts. A failed assessment job leaves the recorded run results available; it cannot fabricate an assessment or an overall pass.

## Errors and compatibility

Propose `400` for invalid input, `404` for missing resources, `409` for stale revisions or unmet approval/provenance requirements, and `503` for unavailable dependencies. Agree exact codes with the backend. Responses use a provider-neutral envelope:

```json
{
  "error": {
    "code": "PLAN_APPROVAL_REQUIRED",
    "message": "Approve the current QA plan revision before generating tests."
  }
}
```

Input errors may include field-level messages. Network failure, validation rejection, resource absence, and operation failure must remain distinguishable in presentation. Do not silently retry state-changing calls, expose provider secrets, or replace unavailable data with success states.

Changes to these proposed interfaces require review before frontend integration. Open questions are tracked in the [question register](../product/open-questions.md).
