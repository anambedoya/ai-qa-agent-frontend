# ADR 0002: Local backend boundary

Status: Accepted boundary; backend implementation choices remain open

Date: 2026-10-20

## Context

The complete workflow must operate without paid services. AI initially uses local Ollama, while Playwright execution requires capabilities outside a browser frontend. Frontend and backend must remain separate repositories.

## Decision

The local backend owns durable resources, provider-neutral AI adapters, generated tests, execution, and evidence. Angular uses the backend API only. Ollama supplies the initial local AI path; future optional OpenAI, Anthropic, or Gemini adapters belong behind the same backend boundary.

The backend is the local persistence authority. Offline browser editing and synchronization are excluded. AI credentials, model responses in provider-specific wire formats, runner access, and evidence filesystem paths do not belong in frontend components.

## Alternatives

Calling model providers directly from Angular couples UI behavior to providers and cannot own local runner execution. Browser-owned durable state would require synchronization not requested for the MVP. A mandatory hosted backend would violate the no-paid-service path.

## Consequences

Product functionality requires the local backend; bootstrap does not. Backend storage/framework/model details are unresolved and must be agreed before dependent implementation. The backend runner design must define execution boundaries and target access before running generated code.
