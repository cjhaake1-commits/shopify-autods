# Codex implementation brief

Build this repository into a secure, local-first AutoDS-to-Shopify sourcing bridge.

## Non-negotiable requirements

- Inspect the repository before editing.
- Do not request, print, log, commit, or transmit AutoDS passwords, MFA codes, cookies, session tokens, Shopify credentials, payment information, or browser-profile data.
- Authentication must occur manually by the user in a dedicated persistent Chrome/Edge profile stored in a gitignored local directory.
- Begin READ-ONLY. Do not import, order, purchase, change supplier settings, change store settings, or modify AutoDS data until a later explicit phase.
- Prefer documented/stable AutoDS interfaces if discoverable from the authenticated session. If browser automation is required, isolate selectors/adapters and fail safely when the UI changes.
- Bind the local service to 127.0.0.1 by default. Do not expose it publicly and do not create tunnels automatically.

## Target stack

Use a maintainable TypeScript/Node implementation unless the existing repository establishes another stack. Prefer Playwright for browser/session access and a small Fastify or Express API for local structured endpoints. Add strong runtime validation and useful structured logs without secrets.

## Required local capabilities

Create commands/endpoints for:

- health/status
- launch/open authenticated AutoDS browser profile
- detect whether AutoDS is authenticated without exposing session material
- list AutoDS-managed stores where available
- list/search AutoDS catalog products where available
- list/search products already managed/imported for the selected store
- retrieve product ID, title, source/supplier metadata, source cost, shipping cost, estimated delivery, stock, variants, ratings/order indicators when AutoDS exposes them, images/video references, and automation/monitoring state
- calculate landed cost and margin at a supplied retail price
- rank candidate products against configurable merchandising rules

## Automotive sourcing profile

Add a configuration/profile for MOTORYN that prioritizes:

1. cordless car vacuum
2. portable digital tire inflator
3. wireless CarPlay / Android Auto adapter
4. portable jump starter
5. OBD-II diagnostic scanner
6. dash cam / digital rearview mirror
7. wireless TPMS
8. heads-up display / GPS speedometer
9. other visually demonstrable automotive technology

Initial economics: target approximately 60% gross margin before advertising. Make this configurable, not hard-coded business logic. Prefer products with strong absolute contribution dollars, useful product media, reliable stock, reasonable US delivery, and automation compatibility.

## Deliverables

- package manifest and lockfile
- typed source tree
- `.env.example` containing only non-secret placeholders
- secure `.gitignore`
- README with Windows/VS Code setup and exact run commands
- browser-profile launcher
- local API/CLI
- schemas/types for normalized AutoDS product data
- margin/ranking module
- unit tests for calculations and normalization
- smoke test that does not require credentials
- optional authenticated smoke test that clearly waits for manual login
- GitHub Actions workflow for lint/typecheck/tests that never requires AutoDS credentials

## Acceptance criteria

- Fresh clone installs successfully.
- CI passes without secrets.
- Local service binds only to loopback by default.
- User can launch the dedicated browser, manually authenticate, and retain the session locally.
- Health endpoint clearly reports unauthenticated/authenticated state.
- Read-only product extraction returns normalized JSON when AutoDS is available.
- MOTORYN candidate ranking produces landed-cost and gross-margin calculations.
- No secrets/session data appear in git status or logs.

Continue autonomously through implementation, tests, documentation, and fixes until the repository meets these acceptance criteria or a genuine blocker requires the user's manual AutoDS login. At that blocker, leave the project runnable and print only the exact manual login/run step required; do not ask for credentials.
