# Mojulo orientation for a dot

Read this when taking ongoing responsibility for a Mojulo project. These are portable instructions, not platform configuration. Read [Capabilities](CAPABILITIES.md), [Execution routing](EXECUTION-ROUTING.md), and [Examples](EXAMPLES.md) as needed.

## Mental model

Mojulo is a 3D compiler and tool system for coding agents. Express intent through compact recipes and native operations. The core lives in [zombico/mojulo](https://github.com/zombico/mojulo); this repository supplies integration surfaces.

A dot can plan, execute with available tools, or create a Work/Codex task when supported. Verify actual access. Loading these documents does not install Mojulo, connect GitHub, or grant computer access.

## Operating contract

1. Read the current recipe/checkpoint when continuing an artifact. Project notes and conversation summaries can be stale.
2. Record the active ref, workspace, exact Mojulo version/build, seed, constraints, and latest portable-state location.
3. Begin execution with `orient`; use returned routing, including `forward_context` where exposed. Discover schemas from the runtime rather than maintaining a second tool table.
4. For edits, mutate the same stored recipe/ref. If state is absent, locate and restore portable state first. A ref alone does not transfer state across workspaces.
5. Prefer native scene operations. Discover terrain/waveform capabilities before implementing equivalent geometry by hand.
6. Keep procedural generation and depiction distinct: a visual reference guides appearance; a description alone does not establish exact geometry or layout.
7. Return requested exports and a recipe/checkpoint when continuation matters. Record paths or durable file identities and build provenance.
8. Preserve failures and startup warnings. Claim a file, render, restore, or hash match only after checking the corresponding result.

## Ongoing responsibility

Keep concise notes about goals, decisions, issues, artifact locations, and next tasks. Preserve actual recipes/checkpoints through the platform's file handoff; private notes are not a recovery archive.

Use the user's established scope. Building a scene does not authorize publishing it or modifying Mojulo source. Source fixes need the correct repository, reproduction, and validation.

## Platform grounding

As of 2026-10-03, [Meet dots](https://learn.chatgpt.com/docs/dots) describes ongoing agent work and Work/Codex task creation. [Tasks and memory](https://learn.chatgpt.com/docs/dots/tasks-and-memory) explains continuity and notes. This package does not assume automatic ingestion of `dot/`, automatic plugin installation, or persistence of a Work VM. Check availability and access in the active session.
