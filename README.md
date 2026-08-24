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
5. On Windows, launch normal Edge with the dedicated CDP profile: `npm run edge:cdp`.
6. Sign into AutoDS manually in that browser and complete MFA yourself.
7. Check status with `npm run edge:status`; start the bridge with `npm run bridge`.
8. Generate local reports with `npm run reports` and verify with `npm run typecheck && npm test`.

Codespaces/Linux is the development and CI environment only. Live browser authentication and AutoDS extraction run on the Windows host using Microsoft Edge; `edge:login` refuses to run on Linux and never downloads Chromium.

On the Windows laptop, from a local checkout:

```powershell
npm ci
npm run edge:cdp
# complete AutoDS login manually in the opened Edge window
npm run edge:status
npm run bridge
npm run health
```

The bridge attaches with Playwright `chromium.connectOverCDP` to a normal installed Microsoft Edge process using `.local/edge-autods-profile`. It never launches an authenticated browser through Playwright, touches Chrome, or uses an ordinary Edge profile. The CDP endpoint is loopback-only. If the endpoint is unavailable, run `npm run edge:cdp`; the bridge never silently launches Chromium.

## Security

Do not commit passwords, API keys, cookies, browser user-data directories, Shopify secrets, AutoDS session data, or payment information. The authenticated browser state must remain local.

## Current status

Repository bootstrap complete. Application scaffold and AutoDS selectors/API discovery should be completed and tested locally because AutoDS authentication occurs on the user's machine.
