# RetailForge AI Demo Credentials

These accounts are for **local/demo environments only**. They are not active production accounts, and the current RetailForge AI foundation uses Manus OAuth rather than username/password authentication.

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
| Read-only viewer | `read-only.viewer@demo.retailforge.local` | `RF-Demo-Viewer-2026!` |

## Safety rules

Do not seed these accounts into production, do not use real email addresses, and do not commit plaintext passwords into application code. A password-auth implementation must store only strong password hashes, rate-limit login attempts, support secure reset flows, and force a password change at first login. The current demo uses a role simulator in the workspace sidebar and the `/access` screen; OAuth remains the actual sign-in path until password authentication is explicitly implemented.
