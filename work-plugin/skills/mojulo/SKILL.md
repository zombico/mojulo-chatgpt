---
name: mojulo
description: Build, edit, export and resume deterministic 3D objects, worlds, games and printable models with Mojulo in ChatGPT Work. Use for procedural scenes, GLB/HTML/STL/3MF exports, recipes and same-ref iteration.
---

# Mojulo for ChatGPT Work

This is a skills-only plugin. It does not provision a Work box, register an MCP server, or host geometry. Mojulo owns rendering, the recipe, tool schemas and exports.

## Choose the real execution path

1. If Mojulo MCP tools are already connected and authorized in this session, start with `forward_context` and `get_adapter` for `chatgpt` if supported. Work with that server's refs; do **not** bootstrap a second copy. A server-side path is not a Work-box download.
2. Otherwise, when the session has a shell-enabled writable Work box, locate this skill's packaged `scripts/runner.mjs` and read `references/work-box.md`. Check Node >=22.14, npm, and `node "$runner" status --workspace "$workspace"` first.
3. If neither execution path exists, report the limitation; this skill cannot create a compute environment.

## Version policy

The default tested target for this plugin release is **mojulo@3.1.0**. The runner pins exactly that version and does not silently upgrade, downgrade, or reinstall over a mismatched managed runtime. Do not replace it with `@latest`. Until 3.1.0 is published on npm, use an explicitly supplied 3.1.0 development tarball (and report its provenance); do not substitute registry 3.0.0 while claiming 3.1 capabilities.

If `status` reports `legacyWorkspace`, the previous plugin's `.mojulo` state may contain existing recipes. Preserve it and export portable recipes/checkpoints before adopting the new workspace. Never silently mint a replacement when the user asked to edit an existing ref.

## Operate and iterate

After installation or suitable runtime reuse, start a fresh Work context with:

```sh
node "$runner" exec --workspace "$workspace" -- orient
node "$runner" exec --workspace "$workspace" -- call version
```

Discover operations from `orient`, `tools`, `packs` and `help <tool>`; use `exec -- call <tool> --json '<object>'` for invocation. Do not hardcode a separate tool registry in this skill. Preserve the existing ref for edits, read schema errors, and inspect real output before declaring success.

## Delivery, provenance and recovery

Keep runtime and state workspace-local under `.mojulo-chatgpt`. When exporting, return the actual artifact through a file-delivery mechanism available in the current session, with the recipe and the runtime version. Do not invent download links, promise an inline viewer, or upload models to a Mojulo service merely for handoff.

The runner's `checkpoint` and `restore` commands preserve version and recipe provenance. Restoring a manifest is not a complete backup: external assets, code-bearing recipes, and dependent sketches need their own inspection/transfer. Prefer fresh-workspace recovery checks and compare actual outputs when reproducibility matters.

Never claim that renders, file delivery, restoration or hashes passed without checking. Report startup warnings, CLI failures and visual checks requiring the user.
