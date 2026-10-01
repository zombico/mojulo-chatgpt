# Security posture

This repository begins as a developer-mode bridge.

## Current boundary

One running process owns one Mojulo workspace. If `MOJULO_BRIDGE_TOKEN` is set, requests to `/mcp` require that bearer token. If it is unset, the service is intentionally unauthenticated for local/private testing.

**Do not deploy the unauthenticated or single-workspace configuration as a public multi-user plugin.**

## Required before public directory submission

1. Authenticate every caller with an identity issued or verified by the deployment.
2. Derive an isolated workspace from that authenticated identity; never from an arbitrary user-supplied path.
3. Prevent path traversal and cross-workspace refs.
4. Put exports behind authenticated, expiring handoff URLs.
5. Apply request-size, rate, concurrency and export-size limits.
6. Record only operational metadata by default; do not log recipe contents or exported user files.
7. Run the five positive and three negative plugin review cases against the deployed endpoint.
8. Include explicit cross-tenant negative tests.

Please report vulnerabilities privately through the security contact used by the main Mojulo project until this repository has its own disclosure channel.
