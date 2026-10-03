# Capability boundaries

The installed Mojulo runtime is authoritative for tools, arguments, formats, and operations.

| Layer | Responsibility | Evidence needed |
| --- | --- | --- |
| Dot / ChatGPT orientation | Understand goals, maintain notes, choose an executor | Current instructions, state, available tools |
| Work-native plugin | Bootstrap and call Mojulo in a writable workspace | Node >=22.14, npm, pinned 3.0.0, successful commands |
| Mojulo | Store recipes, compile geometry, apply edits, produce exports | Runtime orientation and tool schemas |
| Codex source task | Modify core or adapter and validate changes | Correct repository/ref, reproduction, checks |
| Optional MCP bridge | Forward discovery and calls to Mojulo | Configured transport, isolated state, authorized access |

## Discover before promising

The Work skill covers procedural objects, rooms, cities, worlds, and exports. Check GLB, HTML, STL, 3MF, and bundle support against the actual object and runtime. Discover terrain/waveform routing for terrain edits. Successful operations alone do not prove print readiness, visual quality, or byte-identical output.

Start with `orient`, then use `tools`, `packs`, and `help <tool-or-pack>` for the needed operation. Preserve Mojulo's routing model.

## Portable state

Work bootstrap isolates state under workspace-local `.mojulo` and runtime under `.mojulo-runtime`. Another task may have a fresh filesystem. Preserve recipe/checkpoint files, exact version/build provenance, refs, and hashes where required.

Report computation, file existence, delivery, visual inspection, and user download/open checks separately.
