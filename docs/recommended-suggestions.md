# Recommended Suggestions and Gap Closure

## Highest-priority corrections

1. **Replace absolute guarantees with measurable controls.** “Zero hallucinations,” “100% universal,” and “flawless code” are not testable product requirements. Use a no-unvalidated-write rule, provenance, calibration, auditability, and bounded failure behavior.
2. **Separate MVP from target architecture.** A managed single-process web runtime cannot safely host Kafka, Kubernetes workers, or an always-on WebSocket fleet. Start with durable job/event interfaces, then deploy those adapters on a worker-capable platform.
3. **Align the database choice with the actual runtime.** The starter project uses MySQL/TiDB with Drizzle. Keep the MVP schema compatible with that runtime and document a PostgreSQL/RLS migration path rather than claiming PostgreSQL is already active.
4. **Make tenant context a first-class object.** `tenant_id` in a table is insufficient without membership, role, active-tenant resolution, explicit filters, and isolation tests.
5. **Define the approval state machine.** Use explicit states such as `proposed → needs_review → approved | rejected | changes_requested | expired`; do not rely on a boolean approval flag.
6. **Add provenance before adding more models.** Store source references, prompt/template version, provider/model, schema version, validation report, and reviewer decision for each AI proposal.
7. **Treat confidence as calibrated evidence.** A model saying “95%” is not enough. Measure precision/recall by task type and use different thresholds for extraction, enrichment, pricing, and sensitive actions.
8. **Use policy-driven model routing.** The 75% local-model target should be a monitored budget objective, not a hardcoded promise. Route by task risk, latency, data sensitivity, and provider availability.
9. **Add idempotency and replay.** Every mutation and async job should have an idempotency key, retry policy, deduplication behavior, and an operator-visible replay path.
10. **Add deletion, export, retention, and legal-hold rules.** These are essential before enterprise claims, especially when market signals and uploaded product files are stored.

## Product improvements

- Add a “Why is this here?” drawer for every AI-generated suggestion.
- Add a “safe preview” mode showing proposed diffs before approval.
- Add a product readiness score with a breakdown by data completeness, rule compliance, evidence quality, and approval status.
- Add a command palette for quick navigation and actions.
- Add saved views for category, owner, stage, and review severity.
- Add explicit demo-mode labeling so sample values are never mistaken for tenant data.
- Add an integration health timeline rather than only a green/red status badge.
- Add bulk review only after per-item approval semantics are proven.

## Security improvements

- Add authorization tests for every tenant-scoped procedure.
- Add rate limits and payload-size limits for imports and AI prompts.
- Redact API keys, access tokens, PII, and uploaded content from logs.
- Record actor, tenant, correlation ID, source IP/device metadata where policy allows, and before/after hashes for sensitive changes.
- Add support-access workflow with time-bound grants, reason codes, and visible banners.
- Use webhook signatures, replay protection, and secret rotation for integrations.

## Operations improvements

- Define SLOs for dashboard availability, job completion, review queue latency, and provider failure recovery.
- Add correlation IDs across UI action → tRPC procedure → job → provider → review decision.
- Add health checks that distinguish database, cache, provider, queue, and integration failures.
- Add structured logs and metrics for model cost, latency, retries, cache hit rate, schema failures, and review outcomes.
- Add runbooks for provider outage, replay, tenant export, data deletion, and rollback.
- Use feature flags for risky provider and taxonomy changes.

## Architecture improvements

- Keep domain logic independent of Drizzle, Kafka, Redis, and vendor SDKs.
- Implement ports and adapters: `ModelProvider`, `EventBus`, `JobRunner`, `ProductSystem`, `DesignSystem`, `ErpSystem`, and `ObjectStore`.
- Use versioned event schemas and an outbox pattern when publishing events from database transactions.
- Prefer SSE or managed realtime transport for the first release if full WebSocket infrastructure is not available; preserve a transport-neutral client event contract.
- Use a schema registry or versioned JSON schemas before adding ten hypothetical connectors.
- Build one production-quality generic REST adapter and one deterministic demo adapter before building multiple vendor-specific connectors.

## Testing improvements

- Test state transitions, not only UI snapshots.
- Add property-based tests for deterministic calculations and taxonomy rules.
- Add tenant isolation tests with two tenants and identical resource IDs.
- Add contract tests for each adapter.
- Add failure-injection tests for timeouts, duplicate events, malformed model output, expired credentials, and partial writes.
- Track coverage by critical package and branch, but do not treat a numeric percentage as proof of quality.
