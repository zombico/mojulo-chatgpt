# Architecture

## Purpose

`mojulo-chatgpt` is Mojulo's ChatGPT integration and orientation package. It does not fork, modify, or reimplement Mojulo.

## Integration layers

- `dot/`: portable instructions for ongoing agent work, scene continuity, and capability-based execution routing. These files are not automatically installed platform configuration.
- `work-plugin/`: skills-only local execution with pinned Mojulo 3.0.0, workspace-local state, and ordinary artifact handoff. No MCP configuration is required.
- `codex/HANDOFF.md`: source-task brief targeting the core or adapter repository with reproduction and acceptance criteria.
- `plugin/` and JavaScript HTTP bridge: optional MCP transport described below.
- Google TypeScript adapters: retained separately; see [Google bridge](docs/GOOGLE-BRIDGE.md).

Dots can execute with available tools or create Work/Codex tasks. This package supplies domain orientation; it adds no Dot runtime or replacement harness. Saved recipes/checkpoints, rather than agent notes or VM persistence, carry portable artifact state.

## Optional JavaScript HTTP bridge

The remaining sections describe the existing JavaScript bridge (`src/server.js`), not the Work-native plugin or the separate TypeScript Google bridge.

```
ChatGPT / Codex
      |
Streamable HTTP MCP
      |
mojulo-chatgpt
      |
MCP client over stdio
      |
mojulo@3.0.0
      |
MOJULO_HOME
```

## Contract boundary

The bridge pins `mojulo@3.0.0` and starts its published `scripts/mcp-stdio.mjs` entrypoint. Tool discovery and tool calls are forwarded through MCP. The bridge intentionally does not duplicate Mojulo's tool table.

This preserves Mojulo's own routing model, including `forward_context`, and makes schema changes visible at the MCP boundary instead of requiring a second hand-maintained API.

## Workspace model

The initial implementation is deliberately single-tenant: one bridge process owns one `MOJULO_HOME`. This is appropriate for ChatGPT Developer Mode and private evaluation.

Do not expose one unauthenticated instance as a public multi-user service.

Before directory submission, add an authenticated caller identity and map each identity to an isolated Mojulo home, or run one isolated bridge instance per tenant. The isolation boundary must cover SQLite, storage, outcomes, exports, model caches that contain user state, and any checkpoint material.

## HTTP surface

- `POST/GET/DELETE /mcp`: MCP handler supplied by the official TypeScript SDK.
- `GET /health`: process health and pinned Mojulo version.
- Optional `MOJULO_BRIDGE_TOKEN`: developer-mode bearer protection.

The SDK handler serves modern MCP and its legacy stateless compatibility path. Mojulo itself remains behind its existing stdio MCP process.

## Artifact handoff

Mojulo remains responsible for recipe compilation and export creation. The first bridge milestone returns Mojulo's tool results unchanged.

A later production milestone should turn local export paths into authenticated, short-lived downloadable artifacts. That handoff service must preserve the original export hash and provenance.

## Non-goals for the first milestone

- No change to `zombico/mojulo`.
- No Mojulo npm release.
- No permanent user accounts.
- No public multi-user deployment.
- No custom ChatGPT UI.
- No rewritten/simplified Mojulo tool vocabulary.
