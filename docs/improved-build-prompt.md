# Improved Build Prompt — RetailForge AI

## Mission

Build **RetailForge AI**, a secure, multi-tenant product-development and merchandising workspace for retail teams. The platform helps merchants turn market signals and product briefs into structured, reviewable product records, while keeping AI suggestions traceable, deterministic calculations outside the model, and human approval in the loop for risky or low-confidence changes.

The product should feel like a calm, high-signal operating system for product teams—not a chat window. It must make the next best action obvious, preserve user control, and make every AI-generated value inspectable.

## Team perspective

Act as a coordinated team of:

- Principal product designer focused on progressive disclosure, accessibility, responsive workflows, and forgiving interactions.
- Staff full-stack engineer focused on typed contracts, modular boundaries, testability, and reliable state transitions.
- Security architect focused on tenant isolation, least privilege, auditability, secrets hygiene, and safe AI execution.
- Platform/DevOps engineer focused on observability, idempotency, durable background work, deployability, and graceful degradation.

## Important reality checks

Do not claim or implement impossible absolutes such as “100% universal,” “zero hallucinations,” “flawless code,” or “100% test coverage” as product guarantees. Convert them into measurable engineering targets:

- No unvalidated model output may mutate a business record.
- All persisted AI suggestions have provenance, schema-validation results, model metadata, and an approval status.
- Deterministic calculations run in typed application code, never in a language model.
- Critical paths have automated tests; coverage thresholds are enforced per package and raised over time.
- Every tenant-scoped query is explicitly tenant-filtered and covered by isolation tests.
- Every user-visible failure is recoverable, explainable, and never silently discarded.

If a requirement conflicts with the selected runtime or managed hosting constraints, preserve the interface and provide an adapter or documented migration path instead of pretending the unsupported infrastructure is already production-ready.

## Delivery strategy

Build in vertical slices. The first slice must be a usable web workspace with:

1. A polished RetailForge command-center dashboard.
2. Product pipeline and product brief views.
3. A human review queue with confidence and validation context.
4. An integrations catalog with explicit connection state.
5. Typed server procedures and a tenant-aware persistence model.
6. A deterministic demo data/fallback mode so the UI is usable before external credentials are configured.
7. Documentation that clearly separates the MVP implementation from the production-scale target architecture.

Then add background execution, AI routing, streaming progress, files, taxonomy rules, and external integrations as separate increments.

## Product requirements

### 1. Experience

- Use a responsive workspace shell with persistent navigation on desktop and a compact mobile navigation pattern.
- Use progressive disclosure: show outcomes first, then evidence, validation details, raw JSON, and infrastructure controls on demand.
- Use forgiving UI patterns: autosave or draft state where safe, undo or cancel for reversible actions, clear empty/loading/error states, and no destructive action without confirmation.
- Support keyboard navigation, visible focus states, reduced motion, screen-reader labels, and color-independent status communication.
- Make asynchronous work non-blocking. Long-running tasks must show status, elapsed time, current stage, retry/cancel actions, and last successful checkpoint.
- Keep density high enough for professional merchandising teams without making the interface feel cramped.

### 2. AI safety and model routing

- All model calls use typed structured-output schemas.
- Model output is treated as an untrusted proposal, never as an authoritative write command.
- Validate output with schema validation, business rules, allowed-value checks, and tenant taxonomy rules before persistence.
- Route routine extraction, cleanup, normalization, and mapping to the lowest-cost eligible model/provider.
- Escalate only when the task requires reasoning, ambiguity resolution, or an explicit user request.
- Store prompt/template version, provider, model, latency, cost estimate, input/output hashes, validation results, and reviewer decision.
- Define confidence as a calibrated, explainable score—not a blind promise. Low confidence, schema failure, rule failure, conflicting evidence, or sensitive actions must enter human review.
- Never let a language model execute arbitrary code, perform authoritative arithmetic, invent source citations, or directly write SQL/business records.
- Use deterministic code for currency, percentages, unit conversions, sizing, margin, and inventory calculations.

### 3. Multi-tenancy and access control

- Every domain entity carries a tenant identifier.
- Every server procedure requires an authenticated principal and resolves an active tenant membership before reading or writing tenant data.
- Enforce role and permission checks server-side; UI checks are only convenience.
- Include tenant-aware indexes, audit events, membership status, and a policy for cross-tenant support access.
- Use least privilege, secure cookies, CSRF protection where applicable, rate limits, input size limits, secret redaction, and structured security logs.

### 4. Domain modules

Implement clear module boundaries for:

- Workspaces and product briefs.
- Products, variants, attributes, taxonomies, and validation rules.
- Market and social signal ingestion.
- AI runs, model routing, evidence, and provenance.
- Human review queue and decisions.
- Integrations: PLM, design/artboard, ERP, object storage, and messaging.
- Notifications, activity feed, audit log, and operational health.

### 5. Integration architecture

- Use ports-and-adapters with Factory and Strategy patterns.
- Define stable interfaces for PLM, design, ERP, storage, model providers, and event transport.
- Ship a generic REST adapter and safe in-memory/SVG demo adapter first.
- Treat named vendor connectors as separately tested adapters with explicit credential, capability, rate-limit, retry, and webhook behavior.
- Configuration must be validated at startup. Unsupported providers must fail clearly and safely; never silently fall back to a different vendor.
- Keep provider credentials server-side and redact them from logs.

### 6. Async execution and realtime

- Start with a durable job abstraction and idempotency keys.
- Use the managed runtime’s supported request model for the MVP. Do not create an always-on worker or Kafka cluster inside a request-scoped server.
- Provide an event interface that can later be backed by Kafka, a managed queue, or another durable broker.
- For the production target, use ordered partition keys such as `tenant_id:product_id`, retry with bounded exponential backoff and jitter, and dead-letter events with replay tooling.
- For the UI, support reconnect, stale-event detection, and refresh-on-resume.

### 7. Data and files

- Store timestamps in UTC and render them in the user’s timezone.
- Keep file bytes in object storage and metadata/references in the database.
- Use JSON/JSONB-like extensibility for product attributes, but validate all dynamic fields with versioned taxonomy schemas.
- Preserve immutable audit records for approvals, integrations, and material product changes.
- Add retention, export, deletion, and legal-hold policies before calling the system enterprise-ready.

## Quality bar

For each vertical slice:

1. Define acceptance criteria first.
2. Implement typed domain contracts.
3. Add database/query helpers with explicit tenant filtering.
4. Add server procedures and authorization tests.
5. Add UI states for loading, empty, success, validation failure, retry, and permission denial.
6. Run type checks, unit tests, and production build checks.
7. Review from developer, architect, security, and DevOps perspectives.
8. Document every known limitation; never hide a placeholder behind production language.

## Initial acceptance criteria

- A user can inspect the command center without a configured external integration.
- The dashboard clearly distinguishes product work, review work, and system health.
- A product record displays completion, AI confidence, validation state, owner, and last updated time.
- A review item shows why it was intercepted and supports an explicit approve/reject/request-changes action.
- Integration cards show connected, needs attention, unavailable, or demo states.
- The backend exposes typed procedures and has a tenant-aware schema for the first domain slice.
- The app handles missing database data gracefully without crashing.
- The codebase has a documented path from the MVP runtime to a FastAPI/PostgreSQL/Kafka production topology.

## Output format

Deliver:

- Working application code in small, reviewable increments.
- A PRD and architecture notes.
- Environment variable documentation with safe examples only.
- Database schema and migration instructions.
- Tests for critical domain and authorization logic.
- A concise list of implemented features, intentionally deferred features, risks, and next actions.
