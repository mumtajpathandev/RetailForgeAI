# Technical Architecture

## Runtime

RetailForge is a React 19 + Vite frontend with Tailwind and shadcn-style components, an Express server, tRPC 11 typed procedures, Drizzle ORM, and MySQL/TiDB-compatible persistence. The current runtime is a single Node process suitable for serverless-style web hosting and demo testing.

## Authentication

OAuth remains supported through the Manus session flow. Demo password authentication uses scrypt verification and issues the same signed JWT session cookie format with HTTP-only, secure, same-site configuration. Demo identities are resolved server-side. Production should replace them with managed users and add MFA, reset, lockout, rate limiting, and email verification.

## Data isolation

Business records include `tenantId`. Production authorization must resolve an active tenant membership from the authenticated identity on the server for every query and mutation. Never accept a tenant ID from the browser as an authorization decision.

## Import pipeline

The Import Studio supports CSV and JSON demo inputs. A future production connector follows this sequence: fetch or receive source data, validate against a versioned template, normalize fields, calculate a content hash, store an import-run record, quarantine invalid rows, then commit only accepted records. Persist provenance, source, freshness, row-level errors, and retry state.

## Connectors

Connector adapters should be isolated by provider and capability: catalog, commerce, returns, PLM, ERP, inventory, analytics, and storage. Credentials belong in a secret manager. Each adapter needs timeouts, exponential backoff, idempotency keys, rate-limit handling, structured logs, and a manual replay path.

## AI safety

AI output is a proposal, never an automatic business record mutation. Store prompt version, model, evidence references, confidence, reviewer, decision, and timestamp. High-impact actions require human review and should be reversible.
