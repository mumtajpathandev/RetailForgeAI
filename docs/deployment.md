# Deployment and Operations

## Recommended free test deployment

Render is the recommended free test host for this full-stack Node/Express application because it supports Git-connected Node web services and provides a `render.yaml` Blueprint. The free tier is appropriate for demos, not production: services can spin down after 15 minutes of inactivity, the filesystem is ephemeral, and free Postgres databases have a 30-day lifetime.

RetailForge uses MySQL/TiDB through Drizzle. Therefore, the free demo path deliberately works without `DATABASE_URL` and uses clearly labeled fallback data. To test persistence, provide a compatible hosted MySQL/TiDB connection string. Do not point the application at a production database until migrations, backups, tenant isolation, and access controls are reviewed.

## Render steps

1. Push this repository to GitHub.
2. In Render, choose **New → Blueprint** and select the repository.
3. Review `render.yaml` and create the free web service.
4. Set `DATABASE_URL` only if using a compatible MySQL/TiDB provider.
5. Set `VITE_APP_ID`, `VITE_OAUTH_PORTAL_URL`, and owner values for OAuth.
6. Deploy and run `scripts/verify-deploy.sh https://your-service.onrender.com`.

## Local production-like run

```bash
cp .env.example .env
# edit JWT_SECRET and optional provider variables
pnpm install --frozen-lockfile
pnpm check && pnpm test && pnpm build
pnpm start
```

## Rollback and monitoring

Use Render deploy history for rollback. Add application logs for authentication failures, connector retries, imports, publisher link creation, and AI-review decisions. Do not log passwords, access tokens, raw customer notes, or full connector payloads.
