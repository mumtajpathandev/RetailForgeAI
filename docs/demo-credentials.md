# RetailForge AI Demo Credentials

These accounts are for **demo environments only**. They are intentionally non-production credentials for testing the password-login flow and role-aware workspace UI.

Open `/login`, choose a role account, and sign in with the matching email and temporary password.

| Role | Username | Temporary password |
|---|---|---|
| Platform owner | `owner@demo.retailforge.local` | `RF-Demo-Owner-2026!` |
| Tenant admin | `admin@demo.retailforge.local` | `RF-Demo-Admin-2026!` |
| Merchandising lead | `merchandising.lead@demo.retailforge.local` | `RF-Demo-Merchant-2026!` |
| Product developer | `product.developer@demo.retailforge.local` | `RF-Demo-Product-2026!` |
| Designer | `designer@demo.retailforge.local` | `RF-Demo-Designer-2026!` |
| Sourcing manager | `sourcing.manager@demo.retailforge.local` | `RF-Demo-Sourcing-2026!` |
| Analyst | `analyst@demo.retailforge.local` | `RF-Demo-Analyst-2026!` |
| Reviewer | `reviewer@demo.retailforge.local` | `RF-Demo-Reviewer-2026!` |
| Read-only viewer | `viewer@demo.retailforge.local` | `RF-Demo-Viewer-2026!` |

## What is active

- Password sign-in issues the same signed, HTTP-only session-cookie format used by the OAuth session flow.
- OAuth remains available as an alternate sign-in method.
- Demo accounts are recognized server-side and are never sent to the browser as a password list.
- Import commits are persisted as tenant-scoped `importRuns` records with file name, template, format, row count, status, source, and timestamp.
- Mock imports are explicitly marked `demo_upload`; they are not silently treated as live production data.

## Production hardening still required

Before production use, replace these demo accounts with managed identity or real user records and add password reset, first-login change, MFA, login rate limiting, lockout, email verification, secret rotation, and security-event monitoring. Never reuse these credentials or commit them to a production environment.
