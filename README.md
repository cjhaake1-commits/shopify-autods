# Shopify AutoDS Bridge

Local-first bridge for connecting an authenticated AutoDS browser session with Shopify catalog analysis and product sourcing workflows.

## Goals

- Keep AutoDS credentials, cookies, browser profiles, and tokens off GitHub.
- Start read-only: catalog search, store products, supplier/source data, landed cost, shipping, stock, variants, media, and automation status where exposed by AutoDS.
- Provide structured local endpoints for downstream Shopify merchandising and margin analysis.
- Rank automotive sourcing candidates including car vacuums, tire inflators, wireless CarPlay/Android Auto adapters, jump starters, OBD-II scanners, dash cams, TPMS, and HUD products.
- Preserve a clean path to a secured remote/MCP-style endpoint later if required.

## Local development

1. Clone/open this repository in Visual Studio Code.
2. Copy `.env.example` to `.env` if local configuration is needed. Never commit `.env`.
3. Install dependencies: `npm ci`.
4. Start the loopback API: `npm run bridge` (defaults to `http://127.0.0.1:8787`).
5. Launch the dedicated persistent browser: `npm run browser:login`.
6. Sign into AutoDS manually in that browser and complete MFA yourself.
7. Check status with `npm run health`; generate local reports with `npm run reports`.
8. Verify with `npm run typecheck && npm test`.

The current reader is deliberately read-only and returns empty datasets until an authenticated AutoDS adapter is available. Unknown fields remain `null` with provenance `unknown`; no supplier data is fabricated. Browser state is stored in the ignored `browser-profile/` directory.

## Security

Do not commit passwords, API keys, cookies, browser user-data directories, Shopify secrets, AutoDS session data, or payment information. The authenticated browser state must remain local.

## Current status

Repository bootstrap complete. Application scaffold and AutoDS selectors/API discovery should be completed and tested locally because AutoDS authentication occurs on the user's machine.
