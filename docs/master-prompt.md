# Master Prompt: Build RetailForge AI from Scratch

Build an enterprise-grade, production-ready, marketing-ready multi-tenant SaaS application called **RetailForge AI**, a retail-merchandising operating system for fashion, activewear, footwear, and lifestyle brands. The product must combine trend intelligence, product development, concept creation, visual line planning, sourcing and margin planning, returns intelligence, review workflows, connector integrations, AI-assisted analysis, and controlled publisher views.

## Product outcomes

Help merchandising teams move from noisy market signals and disconnected operational data to explainable decisions about what to make, how much to buy, where margin is moving, why products are returned, and which proposals need human approval. Never present AI guesses as facts. Every recommendation must show evidence, confidence, assumptions, source freshness, model/prompt version, and reviewer state.

## Users and access

Implement platform owner, tenant admin, merchandising lead, product developer, designer, sourcing manager, analyst, reviewer, and read-only viewer roles. Use tenant membership and server-side authorization for every query and mutation. Support OAuth and password authentication. Passwords must be strongly hashed; add reset, first-login change, MFA, rate limiting, lockout, email verification, secret rotation, and security-event monitoring before production. Provide demo accounts only in non-production mode.

## Core modules

1. Command center with product, review, signal, readiness, margin, and import freshness KPIs.
2. Trend intelligence with signal sources, confidence, lifecycle, evidence, brand fit, timing, and opportunity scoring.
3. Product pipeline with briefs, stages, owners, completion, confidence, dependencies, and audit history.
4. Concept studio with concept briefs, references, color/material directions, variants, and human approval.
5. Visual line planning with assortment grids, scenario comparison, category coverage, margin, units, and buy-plan export.
6. Sourcing and margin with supplier scenarios, landed cost, MOQ, lead time, duty, currency, risk, and sensitivity analysis.
7. Returns intelligence with return-rate trends, reason clusters, customer-note themes, root causes, financial impact, and corrective actions.
8. Review queue with evidence cards, severity, confidence, reviewer assignment, approve/reject/request-changes, and reversible decisions.
9. Import Studio with CSV/JSON upload, template selection, header mapping, schema validation, row-level errors, duplicate checks, quarantine, import-run persistence, provenance, commit, rollback, and replay.
10. Integrations with isolated adapters for commerce, returns, PLM, ERP, inventory, analytics, storage, and social/trend providers. Use secrets, scoped credentials, retries, backoff, idempotency, rate-limit handling, health checks, and manual replay.
11. Publisher with scoped read-only views, expiration, revocation, password protection, audience permissions, access logs, and no admin or raw customer data exposure.

## Technology

Use React, TypeScript, Tailwind, accessible component primitives, Express, tRPC, Drizzle, and MySQL/TiDB-compatible persistence. Store times in UTC. Store files in object storage and metadata in the database. Use migrations, typed procedures, server-side authorization, optimistic updates only for safe reversible interactions, and explicit loading/empty/error states.

## AI requirements

AI is an assistant, not an autonomous business actor. Use structured outputs with schemas. Attach evidence references. Persist model name, prompt version, input provenance, confidence, and decision history. Require human approval for recommendations that affect assortment, price, supplier, purchase quantity, customer policy, or published output. Prevent prompt injection from imported customer or web content from changing system behavior.

## Security and resilience

Use HTTP-only secure cookies, CSRF protection where applicable, input validation, output encoding, secret management, rate limits, request timeouts, retries, circuit breakers, tenant isolation, audit events, dependency scanning, backup/restore procedures, and least privilege. Do not log credentials, tokens, raw customer notes, or sensitive connector payloads.

## Demo and deployment

Include synthetic products, returns, and trend-signal files. Include demo credentials with a clear non-production warning. Provide a one-click local installer, `.env.example`, Dockerfile, Render free-tier Blueprint, CI workflow, deployment verification script, README, PRD, technical docs, business plan, marketing content, and a promo-video script. The app must run in a clearly labeled fallback mode when no database is present, while documenting that free hosting is for testing and that persistent production use requires compatible durable storage.

## Quality gates

Before delivery, run type checking, all unit tests, production build, migration review/application, route screenshots, authentication tests, import validation tests, publisher access tests, and a deployment smoke test. Fix all errors before reporting completion. Deliver source, deployment instructions, credentials documentation, sample input files, and a clear list of production-hardening items.
