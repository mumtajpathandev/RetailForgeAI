# Architecture Notes

## Current MVP runtime

RetailForge AI currently runs as a Vite/React client plus a Node/Express/tRPC server with Drizzle persistence. This is deliberate: it provides a fast, typed vertical slice and works within the managed runtime.

## Target production topology

The production target can split the same contracts into:

- Web application and API gateway.
- Async application workers for AI, imports, and integration sync.
- PostgreSQL with tenant policies and JSONB product attributes.
- Redis for short-lived cache, idempotency, rate limiting, and presence.
- Managed Kafka or queue service for ordered events and DLQs.
- Object storage for files and generated artifacts.
- OpenTelemetry-compatible traces, metrics, and structured logs.

## Boundary rules

- UI talks to typed server procedures; it never talks directly to vendor APIs.
- Domain services accept interfaces, not SDK clients.
- AI returns proposals; validation and authorization decide whether a proposal can be persisted.
- Events are emitted only after the source transaction is durable, preferably through an outbox.
- Any unsupported provider is an explicit configuration error, not a silent fallback.

## Migration notes

1. Preserve domain types and procedure contracts while replacing MySQL/TiDB persistence with PostgreSQL repositories.
2. Move background work into a worker service and replace the in-process event adapter with managed queue/Kafka.
3. Add RLS policies and membership tables before onboarding sensitive enterprise tenants.
4. Add SSE/WebSocket gateway once job events need multi-instance fan-out.
5. Run adapter contract tests against each vendor sandbox before enabling a connector in a tenant.
