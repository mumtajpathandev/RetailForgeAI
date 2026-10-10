# RetailForge AI

RetailForge AI is an enterprise retail-merchandising workspace for trend intelligence, product pipeline management, visual line planning, sourcing and margin scenarios, returns intelligence, review queues, controlled publishing, and evidence-based AI recommendations.

## Quick start

```bash
./scripts/one-click-install.sh
pnpm dev
```

Open `http://localhost:3000/login` for the demo password flow. Demo credentials are in [`docs/demo-credentials.md`](docs/demo-credentials.md). The app can run without a database in demo fallback mode.

## One-click free-cloud deployment

This repository includes [`render.yaml`](render.yaml) for Render Web Service deployment. Render supports free Node web services, but free services sleep after inactivity and local files are ephemeral. For testing, demo fallback mode is acceptable; for persistent imports and live connectors, provide a managed MySQL/TiDB `DATABASE_URL` and production secrets.

Use the published GitHub repository and the Render Blueprint deploy button with the repository URL:

```text
https://render.com/deploy?repo=https://github.com/mumtajpathandev/RetailForgeAI
```

Then add the environment values marked `sync: false`. Do not commit `.env` files or real credentials.

## Repository map

- `client/` — React application and workspace UI
- `server/` — tRPC procedures, authentication, database helpers, integration adapters
- `drizzle/` — schema and migrations
- `docs/` — PRD, technical docs, business plan, master build prompt, credentials, deployment
- `docs/sample-data/` — synthetic products, returns, and trend input files
- `marketing/` — social copy, launch messaging, promo script, and campaign plan
- `scripts/` — one-click install and deployment verification
- `.github/workflows/ci.yml` — CI checks

## Security boundary

The included password accounts are demo-only. Before production, add managed identity, password reset, MFA, login rate limiting, lockout, email verification, secret rotation, and security-event monitoring. Never reuse demo credentials in production.

## Validation

```bash
pnpm check
pnpm test
pnpm build
```

The current test suite covers OAuth logout behavior, dashboard fallback, password verification, and signed password-session issuance.

## Published repository

GitHub: https://github.com/mumtajpathandev/RetailForgeAI
