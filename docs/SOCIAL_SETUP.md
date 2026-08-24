# Social account setup

The social layer is adapter-first and defaults to `NOT_CONNECTED`. It never stores platform passwords. OAuth client IDs, client secrets, refresh tokens, and token stores must remain in environment/OS secret storage and are intentionally absent from this repository.

Before enabling a platform adapter, create the official developer app, configure its documented OAuth redirect, obtain consent for the intended business account, perform one authenticated identity/read test, and record only non-secret account IDs in the local registry. Publishing remains disabled until readback and review-mode approval are verified.

Platform status is reported as `NOT_CONNECTED` until official API authentication and a read succeeds. The bridge does not use browser automation for publishing.
