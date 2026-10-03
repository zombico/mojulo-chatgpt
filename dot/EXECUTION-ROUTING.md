# Route by task and available tools

Use this routing in ordinary Work/Codex sessions as well as optional Dots. Start with [shared orientation](../docs/ORIENTATION.md). Do not route through a dot when an authorized executor is already available.

| Request | Action |
| --- | --- |
| Explain Mojulo or plan a scene | Reason from current context and relevant runtime documentation |
| Create, edit, render, or export | Run Mojulo in an authorized writable environment; use the Work skill when installed |
| Continue in another workspace | Locate portable state/build provenance, restore, then edit the existing ref |
| Fix compiler or tool behavior | Prepare a Codex task for `zombico/mojulo` |
| Fix plugin, bootstrap, or adapter | Prepare a Codex task for `zombico/mojulo-chatgpt` |
| Use an explicitly requested remote MCP deployment | Use its configured bridge and access/isolation controls |
| Ordinary chat without shell/tools | Prepare a brief for a user-started Work/Codex session; no Dot or Pro upgrade prerequisite |
| Runtime, source, or state unavailable | Report the missing dependency and provide a concrete handoff |

A dot may execute artifact or engineering work itself when tools and access suffice. Work and Codex are options, not mandatory hops.

## Handoff

Include the requested change, latest recipe/checkpoint location, existing ref, exact build/version, reusable workspace/state location, constraints, seed, exports, and verification requirements.

Use [the engineering template](../codex/HANDOFF.md) for source work. Distinguish a successfully created task from prepared instructions. Never claim a background task, PR, or deployment exists without a successful platform result.

“Make the underwater city's terrain more organic” is an artifact edit: discover terrain operations, preserve the ref, re-export.

“Waveform loses elevation after export; fix the bug” is source work: preserve the failing recipe, capture provenance/reproduction, and target core source.
