# Mojulo engineering handoff

Use this template for source changes. This is a task brief, not automatically loaded Codex configuration.

## Task brief

- **Goal:** Concrete resulting behavior.
- **Target repository:** `zombico/mojulo` for core; `zombico/mojulo-chatgpt` for integration.
- **Base branch/commit:** Target and requested branch restrictions.
- **Runtime/build:** Exact version, source SHA or tarball/hash, Node version, environment.
- **Inputs:** Current recipe/checkpoint path or durable identity, ref, seed, constraints, fixture.
- **Reproduction:** Commands, warnings, actual versus expected behavior.
- **Scope:** Components implicated and user-authorized changes.
- **Acceptance:** Required behavior, meaningful checks, requested exports.
- **Delivery:** PR if requested; test results and limitations.

## Execution contract

Read the target repository's applicable `AGENTS.md` first. Use a branch and inspect current source.

For artifact reproduction, follow pinned bootstrap and runtime orientation. A supplied branch build takes precedence over registry installation for a branch-build test; record provenance and never silently substitute versions. Preserve refs and restore portable state in fresh workspaces.

Keep compiler changes in core. Keep the adapter thin and use Mojulo schemas/routing. Installing this integration is not a reason to add MCP, hosted compute, or another agent harness.

Report performed checks separately from pending delivery, visual, download, or fresh-context checks.
