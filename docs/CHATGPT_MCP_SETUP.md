# ChatGPT MCP setup

Run `npm.cmd run edge:cdp`, complete AutoDS login if prompted, then `npm.cmd run mcp`. The local endpoint is `http://127.0.0.1:8788/mcp`.

For private ChatGPT access, use the current OpenAI Secure MCP Tunnel. Create/manage the tunnel in OpenAI Platform tunnel settings, run the downloaded `tunnel-client` on this Windows host forwarding only to `http://127.0.0.1:8788/mcp`, and connect it from ChatGPT developer-mode app creation using **Tunnel**. Tunnel ID, runtime API key, organization permissions, and ChatGPT workspace developer mode are account-owner actions and are not stored here.

Validate locally with `npm.cmd run command-center:status`, `npm.cmd run mcp:inspect`, and the MCP smoke calls in `tests/`/README.
