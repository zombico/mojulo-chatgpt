# Mojulo ChatGPT

Hosted ChatGPT integration layer for **Mojulo 3.0.0**.

This repository is intentionally separate from [zombico/mojulo](https://github.com/zombico/mojulo). It consumes the published Mojulo package unchanged and exposes its existing stdio MCP server through a Streamable HTTP MCP endpoint suitable for ChatGPT Developer Mode and, after tenant isolation/authentication work, a public plugin.

## What this proves

```
ChatGPT / Codex
      |
      | Streamable HTTP MCP
      v
mojulo-chatgpt
      |
      | stdio MCP
      v
mojulo@3.0.0
```

The bridge does not maintain a second list of Mojulo tools. It asks Mojulo for `tools/list` and forwards `tools/call`, preserving Mojulo's own routing surface such as `forward_context`.

## Run locally

Requires Node **22.14+**.

```bash
npm install
MOJULO_BRIDGE_TOKEN=dev-secret npm start
```

The MCP endpoint is:

```
http://localhost:8787/mcp
```

Health check:

```bash
curl http://localhost:8787/health
```

By default the workspace is `./data/mojulo`. Override it with:

```bash
MOJULO_HOME=/absolute/workspace/path npm start
```

## Docker

```bash
docker build -t mojulo-chatgpt .
docker run --rm -p 8787:8787 \
  -e MOJULO_BRIDGE_TOKEN=dev-secret \
  -v mojulo-data:/data \
  mojulo-chatgpt
```

## ChatGPT Developer Mode milestone

Deploy this container behind HTTPS, set `MOJULO_BRIDGE_TOKEN`, and connect the resulting `https://.../mcp` endpoint privately. Use the acceptance flow:

1. Call `forward_context`.
2. Create a procedural city with seed 91.
3. Export GLB.
4. Edit the same ref to seed 92 and verify it changes.
5. Export HTML, GLB, bundle and recipe as supported by Mojulo's routing/tool contract.
6. Create/restore the supported recovery checkpoint.
7. Compare deterministic export hashes.

## Plugin package

`plugin/` contains the portable Agent Plugins skeleton:

- `plugin.json`
- `mcp.json`
- `skills/mojulo/SKILL.md`

The committed MCP URL is the intended production endpoint, `https://mcp.mojulo.ai/mcp`. Do not submit it until that endpoint exists and the public multi-user security work in [SECURITY.md](./SECURITY.md) is complete.

## Current limitation: single tenant

The first milestone intentionally maps one bridge process to one `MOJULO_HOME`. That is suitable for private testing, not for a public shared plugin.

See [ARCHITECTURE.md](./ARCHITECTURE.md) and [SECURITY.md](./SECURITY.md) for the production path.
