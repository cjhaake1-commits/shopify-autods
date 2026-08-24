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

## MCP / ChatGPT

The read-only MCP server uses the official TypeScript MCP SDK and Streamable HTTP at `http://127.0.0.1:8788/mcp`. Start it with:

```powershell
npm run edge:cdp
# complete AutoDS login manually if prompted
npm run mcp
npm run social:reports
```

The MCP smoke-tested tools include `list_stores`, `get_store_products`, `get_product`, `search_autods`, `search_automotive_products`, `calculate_product_economics`, `rank_candidates`, `get_product_audit`, `get_store_strategy`, `health`, `search`, and `fetch`. No write or browser-control tools are registered. Set `MCP_REQUIRE_AUTH=true` and provide `MCP_SHARED_SECRET` through local environment/OS secret storage before any tunnel use.

For private ChatGPT developer-mode access, current OpenAI documentation recommends Secure MCP Tunnel: create/manage a tunnel in Platform tunnel settings, run the downloaded `tunnel-client` on this Windows host pointing only at `http://127.0.0.1:8788/mcp`, then in ChatGPT developer-mode app creation choose Tunnel. The tunnel requires a user-created tunnel ID and runtime API key; those are intentionally not requested, stored, or committed by this repository. See the official [MCP server guidance](https://developers.openai.com/plugins/build/mcp-server) and [Secure MCP Tunnel guidance](https://developers.openai.com/api/docs/guides/secure-mcp-tunnels).

The social layer is adapter-first and review-only. `src/social/` contains platform-neutral models, brand/account registry, official-API adapter boundaries, draft generation, and capability reports. No social account is marked connected until OAuth and an authenticated official API read succeed; no social publishing or autonomous replies are enabled.
