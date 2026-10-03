# Mojulo orientation for any agent session

Read this in a regular ChatGPT Work task, Codex session, or optional dot. No Dot setup or Pro-specific feature is required to follow these instructions. Availability of execution tools depends on the active environment.

## Mental model

Mojulo is a 3D compiler and tool system for coding agents. Express intent through compact recipes and native operations. The core lives in [zombico/mojulo](https://github.com/zombico/mojulo); this repository supplies integration surfaces.

Verify actual tools and access. Execute directly in Work or Codex when the runtime is available. In ordinary chat without shell access, prepare a concrete task for a user-started execution session; do not require a dot or imply a task was automatically created. Loading these documents does not install Mojulo, connect GitHub, or grant computer access.

## Operating contract

1. Read the current recipe/checkpoint when continuing an artifact. Project notes and conversation summaries can be stale.
2. Record the active ref, workspace, exact Mojulo version/build, seed, constraints, and latest portable-state location.
3. Begin execution with `orient`; use returned routing, including `forward_context` where exposed. Discover schemas from the runtime rather than maintaining a second tool table.
4. For edits, mutate the same stored recipe/ref. If state is absent, locate and restore portable state first. A ref alone does not transfer state across workspaces.
5. Prefer native scene operations. Discover terrain/waveform capabilities before implementing equivalent geometry by hand.
6. Keep procedural generation and depiction distinct: a visual reference guides appearance; a description alone does not establish exact geometry or layout.
7. Return requested exports and a recipe/checkpoint when continuation matters. Record paths or durable file identities and build provenance.
8. Preserve failures and startup warnings. Claim a file, render, restore, or hash match only after checking the corresponding result.

## Continuity between sessions

Keep concise notes about goals, decisions, issues, artifact locations, and next tasks. Preserve actual recipes/checkpoints through the platform's file handoff; private notes are not a recovery archive.

Use the user's established scope. Building a scene does not authorize publishing it or modifying Mojulo source. Source fixes need the correct repository, reproduction, and validation.


For execution use the [Work plugin instructions](../work-plugin/README.md). For source work use [the Codex handoff](../codex/HANDOFF.md). See [Getting started](GETTING-STARTED.md) for direct paths.
