# Master Build Prompt — RetailForge AI Enterprise Edition

You are a coordinated, senior product-and-engineering organization building **RetailForge AI Enterprise**, an enterprise-grade, production-ready, marketing-ready agentic AI platform for retail merchandising, product development, trend intelligence, assortment planning, concept validation, sourcing optimization, and post-launch performance improvement.

You are extending the existing **RetailForge AI** application and codebase. Do not create a throwaway mock, generic dashboard, or disconnected prototype. Preserve and evolve the existing command center, tenant-aware domain model, typed server procedures, safe demo fallback, review queue concepts, integration catalog, documentation, and visual language. Every feature must be wired into the product’s actual domain contracts and must have loading, empty, error, permission, retry, and audit states.

The platform must be able to compete with and exceed the publicly described capabilities of OmniThink AI for retail merchandising, including trend intelligence, innovation copilots, visual line planning, concept validation, smart sourcing, and a unified path from trend to store. Do not copy proprietary implementation details, branding, private data, or claims. Build differentiated, explainable capabilities with stronger governance, operational depth, tenant controls, workflow execution, and measurable ROI.

## Product mission

Make every retail product decision more trend-right, commercially viable, margin-aware, sustainable, operationally feasible, and ready for execution. RetailForge AI is not an autonomous black box. It is a controlled merchandising operating system in which AI proposes, evidence supports, deterministic services calculate, rules validate, and authorized humans approve material decisions.

## Non-negotiable engineering principles

Do not promise “zero hallucinations,” “100% universal,” “flawless code,” or “100% test coverage” as product guarantees. Convert those goals into enforceable controls:

- No unvalidated model output may directly mutate an authoritative business record.
- Every AI proposal must carry source evidence, model/provider metadata, prompt and schema version, confidence, validation results, cost, latency, and a reviewer decision.
- Deterministic code, not a language model, performs currency, margin, percentage, unit, size-curve, demand, inventory, tariff, landed-cost, and allocation calculations.
- Confidence must be calibrated by task, category, season, geography, and outcome history. A model-generated confidence number is not proof.
- Any schema failure, rule failure, missing evidence, conflicting source, low-confidence proposal, sensitive action, policy exception, or material financial impact must enter human review.
- Every tenant-scoped query and mutation must be authorized server-side and covered by tenant-isolation tests.
- Every important mutation must be idempotent, auditable, replayable where applicable, and safe under retries.
- Errors must be explainable and recoverable. Never silently discard failed work or silently switch providers.
- Do not claim an integration is production-ready until it has credential handling, capability discovery, rate-limit behavior, retries, webhook verification, observability, contract tests, and a documented sandbox validation.

## Existing application and implementation constraints

Start from the existing RetailForge AI project rather than replacing it blindly. Keep the current working application usable throughout development.

The current project uses a React/Vite/TypeScript client, Tailwind CSS, shadcn-style UI components, Node/Express/tRPC server procedures, Drizzle persistence, Manus OAuth, and a managed WebDev runtime. Continue using those supported primitives for the working MVP and vertical slices. Do not introduce Next.js, FastAPI, PostgreSQL, Kafka, Kubernetes, or always-on workers merely for appearance if the active runtime cannot support them safely. Instead:

1. Preserve stable domain and API contracts.
2. Implement ports-and-adapters so persistence, AI providers, queues, object storage, and integrations can be swapped.
3. Document the production migration path to PostgreSQL with row-level security, FastAPI or equivalent services where appropriate, Redis, managed Kafka/queues, dedicated workers, SSE/WebSockets, object storage, and multi-cloud deployment.
4. Clearly label demo mode, fallback data, simulated providers, and deferred production infrastructure in the UI and documentation.

## Product surfaces

Build the platform as a coherent product with the following surfaces.

### 1. Executive command center

Extend the current dashboard into an executive and operator command center showing:

- Revenue, gross margin, sell-through, inventory health, return rate, markdown exposure, forecast accuracy, and sustainability indicators.
- Trend opportunities ranked by commercial potential, brand fit, timing, sourcing feasibility, and evidence quality.
- Product pipeline from brief to concept, sampling, approval, production, launch, and post-launch review.
- Review queue with severity, confidence, reason codes, evidence, proposed diff, owner, SLA, and action history.
- Integration health, job health, data freshness, provider incidents, and recent audit activity.
- Saved views by brand, category, region, channel, season, owner, lifecycle stage, and risk.
- Role-specific dashboards for executives, merchants, designers, sourcing teams, analysts, admins, and reviewers.

### 2. Trend intelligence

Create a configurable, evidence-first trend intelligence workspace that can combine, subject to lawful access and connector terms:

- Social momentum, sentiment, velocity, creator-to-mainstream diffusion, and regional adoption.
- Search demand, product-intent keywords, seasonality, geography, and demographic segments.
- Competitor assortments, launches, pricing, promotions, availability, and whitespace.
- Runway, editorial, cultural, and event signals where licensed data is available.
- Historical sales, sell-through, returns, markdowns, conversion, and product attributes.
- Customer reviews, support themes, return reasons, and fit/quality feedback.
- Brand fit, category norms, sustainability constraints, material availability, supplier capabilities, landed cost, tariff exposure, and lead times.
- Agentic-commerce readiness: structured attributes, discoverability, comparison quality, and compatibility with shopping-agent selection.

For every trend, show signal-by-signal evidence, freshness, source, geography, confidence, trend lifecycle stage, commercial score, brand-fit score, timing recommendation, and known caveats. Support configurable signal weights and versioned scoring policies; do not hide the scoring logic.

### 3. Innovation copilot

Build an AI copilot for merchants, designers, and product developers that can:

- Turn a natural-language brief into a structured product brief.
- Generate alternative concepts, colorways, materials, attributes, target customer hypotheses, price bands, and channel strategies.
- Retrieve comparable internal products and external evidence.
- Explain every recommendation with citations or source references where available.
- Produce structured product data, never unbounded prose-only records.
- Generate concept boards, product visualization prompts, and copy drafts only as reviewable proposals.
- Compare concepts side by side and show trade-offs across trend relevance, margin, sustainability, complexity, and risk.
- Create a proposed change set that a user can approve, edit, reject, or send back for revision.
- Maintain conversation and artifact history with prompt/template/model versions.

### 4. Visual line planning

Create a shared line-planning canvas where teams can:

- Build seasonal assortments using products, variants, colorways, sizes, channels, regions, and price tiers.
- Drag, group, filter, compare, and annotate concepts.
- Balance aesthetic cohesion, category coverage, price architecture, margin, inventory capacity, and trend exposure.
- See gap analysis, cannibalization risk, duplicate attributes, overexposure, underrepresented segments, and assortment whitespace.
- Run scenarios such as conservative, balanced, growth, and trend-forward plans.
- Lock approved decisions while keeping draft proposals editable.
- Export and sync approved plans through integration adapters.
- Preserve version history, comments, approvals, and before/after diffs.

### 5. Concept validation

Build an explainable concept-validation workspace that supports:

- AI-simulated audience or focus-group feedback, clearly labeled as simulated.
- Structured evaluation of appeal, relevance, distinctiveness, purchase intent, price perception, fit risk, sustainability perception, and brand alignment.
- Optional connection to real survey, panel, experiment, or customer-feedback providers.
- Segment-level results by customer type, geography, channel, and price sensitivity.
- Confidence intervals, sample-size warnings, source quality, and model limitations.
- Side-by-side concept testing and decision recommendations.
- Human review before any concept is promoted into the product pipeline.

### 6. Smart sourcing and profitability

Create a sourcing intelligence module that can:

- Estimate material, labor, freight, duty, tariff, packaging, and other landed-cost components.
- Model MOQ, capacity, lead time, quality risk, supplier concentration, and nearshore/offshore trade-offs.
- Compare supplier paths and show assumptions.
- Optimize toward margin, speed, resilience, sustainability, or a weighted objective.
- Support what-if analysis for fabric, country, quantity, currency, tariff, freight, and price changes.
- Show deterministic calculations and preserve the exact input snapshot used.
- Flag sensitive or high-impact financial outputs for human approval.
- Never invent supplier facts, certifications, costs, or capacity. Unknown values must remain unknown and be flagged.

### 7. Returns, feedback, and post-launch learning

Add a complete returns-merchandising loop so RetailForge improves future products:

- Ingest return reasons, fit feedback, quality issues, customer sentiment, exchange behavior, refund outcomes, channel, region, size, variant, and supplier lot.
- Detect return-rate anomalies, fit issues, product-quality clusters, misleading content, packaging problems, and channel-specific failure modes.
- Separate customer preference returns from product defects, fulfillment errors, fraud signals, and policy-driven returns.
- Recommend product, size chart, content, packaging, sourcing, allocation, and assortment changes.
- Link post-launch evidence back to the originating brief, concept, supplier, and model recommendation.
- Measure recommendation impact on returns, sell-through, margin, markdown, exchanges, and customer satisfaction.
- Include human review for policy changes, customer-impacting decisions, and financial actions.

### 8. Workflow, jobs, and real-time progress

Implement a durable job abstraction with:

- Job type, tenant, actor, idempotency key, state, progress, stage, retries, error code, timestamps, and last checkpoint.
- Queued, running, paused, waiting for review, succeeded, failed, canceled, expired, and dead-letter states.
- Retry with bounded exponential backoff and jitter.
- Cancellation and safe resume where supported.
- Stale-job detection and operator replay tools.
- A transport-neutral event contract that can use polling or SSE in the MVP and managed WebSockets or a broker-backed gateway in production.
- Reconnect-safe UI behavior, stale-event warnings, and refresh-on-resume.

## AI architecture and governance

Implement model routing as a policy engine rather than a hardcoded vendor dependency:

- Classify tasks by risk, sensitivity, latency, structured-output needs, reasoning complexity, and cost budget.
- Route routine extraction, normalization, classification, mapping, and cleanup to the lowest-cost eligible provider.
- Escalate reasoning or ambiguity only when policy allows or the user explicitly requests it.
- Support provider health, fallback policies, rate limits, timeouts, circuit breakers, and cost budgets.
- Use strict typed schemas for all model calls. Reject malformed, extra, missing, or unsafe fields.
- Add prompt-injection and data-exfiltration defenses for retrieved documents, third-party content, uploaded files, and external tools.
- Prevent models from executing arbitrary code, writing SQL, changing permissions, approving their own work, or calling unapproved tools.
- Add semantic caching only when tenant, user, policy, source freshness, and context are safe; never leak one tenant’s cached result to another.
- Store provenance and evaluation outcomes for every AI run.
- Provide model and prompt version rollbacks.
- Add offline evaluation datasets, golden cases, regression tests, red-team tests, and quality dashboards.

## Multi-tenant security and enterprise administration

Implement:

- Tenants, workspaces, brands, regions, channels, memberships, role assignments, permission scopes, and active-tenant resolution.
- Server-side authorization for every read, write, export, integration action, and review decision.
- Roles: platform owner, tenant owner, tenant admin, merchandising lead, merchant, product developer, designer, sourcing manager, analyst, reviewer, finance reviewer, integration admin, and read-only viewer.
- Optional custom roles and permission bundles.
- Secure sessions, OAuth/SSO-ready architecture, MFA-ready flows, secret rotation, rate limits, input-size limits, CSRF protection where applicable, and secure headers.
- Audit logs with actor, tenant, correlation ID, action, entity, before/after hashes, reason, timestamp, and source metadata according to policy.
- Time-bound support access with approval, reason code, visible banner, and automatic expiry.
- Data export, deletion, retention, legal hold, regional residency, backup, restore, and disaster-recovery documentation.
- Redaction of credentials, tokens, sensitive customer data, and private prompts from logs.

## Data architecture

Use explicit domain modules and repository interfaces for:

- Tenants and memberships.
- Brands, categories, seasons, channels, and taxonomy versions.
- Products, variants, attributes, briefs, concepts, line plans, and approvals.
- Trends, signals, sources, evidence, scores, and forecasts.
- Suppliers, materials, costs, tariffs, lead times, and sourcing scenarios.
- Returns, feedback, quality issues, customer segments, and post-launch outcomes.
- AI runs, proposals, validation reports, model usage, and review decisions.
- Jobs, events, notifications, integrations, webhooks, and audit logs.

Use normalized fields for high-value query dimensions and extensible JSON attributes only behind versioned schema validation. Store timestamps in UTC. Store files in object storage and metadata in the database. Use an outbox pattern when durable events are introduced.

## Integration architecture

Use ports-and-adapters with Factory and Strategy patterns. Define stable interfaces for:

- Commerce and catalog: Shopify, Salesforce Commerce Cloud, Adobe Commerce, custom REST/GraphQL.
- OMS, WMS, ERP, and inventory systems.
- PLM and product lifecycle systems.
- Design/artboard and asset systems.
- Supplier and sourcing data providers.
- Customer feedback, returns, surveys, analytics, and experimentation systems.
- Model providers, object storage, email/notifications, event buses, and search.

Start with one safe generic REST adapter, one deterministic demo adapter, and one file/export adapter. Add vendor-specific adapters only with capability discovery, credential validation, sandbox tests, rate-limit behavior, retry policy, webhook signature verification, observability, and a clear unsupported-provider error.

## Marketing-ready experience

Create a polished public marketing site that is separate from the authenticated workspace but shares the brand system. It must include:

- Clear positioning: “From signal to shelf, make every product decision with evidence.”
- Product pages for Trend Intelligence, Innovation Copilot, Visual Line Planning, Concept Validation, Smart Sourcing, Returns Intelligence, and Enterprise Governance.
- Role-specific sections for executives, merchants, designers, sourcing leaders, analysts, and IT/security teams.
- Interactive product tours using truthful demo data.
- Architecture and security overview without exposing secrets or unsupported claims.
- ROI calculator with transparent assumptions.
- Pilot assessment and 90-day implementation pathway.
- Case-study structure that uses placeholders until verified customer evidence exists.
- Strong accessibility, SEO metadata, responsive layouts, performance budgets, cookie/privacy controls, and clear calls to action.
- Never invent customer logos, testimonials, measured ROI, certifications, or compliance attestations.

## Demo users and credentials

Create a clearly labeled **demo mode** with seeded, non-production users at each role level. Do not seed these users into a production tenant, do not use real email addresses, and never store plaintext passwords in source code or logs. Store only strong password hashes. Force password reset on first login when a real password-auth system is enabled. The current RetailForge foundation uses OAuth, so if password login is not yet implemented, show these as planned demo accounts in documentation and use the supported OAuth flow for actual access.

Use the following demo account matrix only in local/demo environments:

| Role | Username | Temporary password |
|---|---|---|
| Platform owner | owner@demo.retailforge.local | RF-Demo-Owner-2026! |
| Tenant admin | admin@demo.retailforge.local | RF-Demo-Admin-2026! |
| Merchandising lead | merchant.lead@demo.retailforge.local | RF-Demo-Merchant-2026! |
| Product developer | product.dev@demo.retailforge.local | RF-Demo-Product-2026! |
| Designer | designer@demo.retailforge.local | RF-Demo-Designer-2026! |
| Sourcing manager | sourcing@demo.retailforge.local | RF-Demo-Sourcing-2026! |
| Analyst | analyst@demo.retailforge.local | RF-Demo-Analyst-2026! |
| Reviewer | reviewer@demo.retailforge.local | RF-Demo-Reviewer-2026! |
| Read-only viewer | viewer@demo.retailforge.local | RF-Demo-Viewer-2026! |

Add a visible “Demo environment — no production data” banner, a role switcher only in demo mode, permission-aware navigation, and a credentials page accessible only to demo administrators. Never reuse these passwords in staging or production.

## Quality and delivery gates

For every vertical slice:

1. Define acceptance criteria and threat model first.
2. Add typed domain contracts and schema versions.
3. Add explicit tenant-aware repositories and authorization checks.
4. Add unit, integration, contract, failure-injection, and UI-state tests.
5. Test duplicate commands, retries, provider timeouts, malformed model output, stale jobs, partial failures, permission denial, and tenant isolation.
6. Run formatting, type checks, tests, production build, migration validation, dependency checks, and accessibility checks.
7. Review code from developer, architect, security, data/AI governance, UX, and DevOps perspectives.
8. Verify desktop, tablet, and mobile rendering.
9. Maintain a changelog, migration notes, runbooks, known limitations, and rollback plan.
10. Do not call a feature production-ready until its observability, security, failure behavior, documentation, and test coverage are present.

## Required delivery order

Build in these increments while keeping the app runnable:

### Increment 1 — Product foundation

Expand the current RetailForge command center, domain schema, product pipeline, review queue, integration health, activity feed, role-aware navigation, and demo-mode labeling.

### Increment 2 — Briefs and product workspace

Add product brief creation, structured attributes, versioning, evidence, validation, proposed diffs, approvals, and audit events.

### Increment 3 — Trend intelligence

Add source connectors or deterministic demo feeds, signal normalization, evidence cards, configurable scoring, trend lifecycle, saved views, and alerting.

### Increment 4 — Line planning and concept validation

Add the collaborative line-planning canvas, scenario comparison, concept evaluation, simulated-vs-real research labeling, and approval workflows.

### Increment 5 — Sourcing and profitability

Add landed-cost calculations, supplier scenarios, tariff sensitivity, lead-time risk, sustainability factors, and deterministic what-if analysis.

### Increment 6 — Returns intelligence

Add return ingestion, reason normalization, anomaly detection, root-cause analysis, product feedback loops, and post-launch recommendations.

### Increment 7 — Enterprise hardening

Add SSO/MFA-ready architecture, custom roles, support access, retention/export/deletion, observability, background workers, managed queues, production connectors, and disaster recovery.

### Increment 8 — Marketing launch

Build the public marketing site, truthful demo flows, ROI calculator, product pages, pilot funnel, documentation, analytics, performance budget, and release checklist.

## Final output

Deliver a working, reviewable RetailForge AI Enterprise application, not a static concept. Include:

- Working product UI and marketing site.
- Updated product requirements and architecture documentation.
- Domain schema and migrations.
- Safe demo data and demo-user setup instructions.
- Role and permission matrix.
- Environment variable documentation with safe examples only.
- AI governance and model-routing policy.
- Integration contracts and adapter status.
- Test suite and quality reports.
- Security threat model and operational runbooks.
- Implemented features, deferred features, risks, assumptions, and next actions.

When a dependency, provider, infrastructure component, credential, or data source is unavailable, implement a safe adapter boundary and an explicit demo or unavailable state. Never fabricate connectivity, data, compliance, customer proof, or production readiness.
