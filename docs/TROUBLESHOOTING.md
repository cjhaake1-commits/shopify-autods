# Troubleshooting

- CDP unavailable: run `npm.cmd run edge:cdp`, leave Edge open, and check `npm.cmd run edge:status`.
- MCP unavailable: run `npm.cmd run mcp` and check `npm.cmd run command-center:status`.
- Tunnel unavailable: verify the OpenAI tunnel client is healthy and associated with the target ChatGPT workspace.
- Social account unavailable: verify official OAuth consent and an authenticated identity/read test; never paste tokens into chat or files.
