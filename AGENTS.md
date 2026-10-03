# Working in mojulo-chatgpt

This repository supplies ChatGPT orientation and integration surfaces. Core compiler implementation belongs in `zombico/mojulo`.

- Read `README.md` and `ARCHITECTURE.md` before changing integration behavior.
- Read `docs/ORIENTATION.md` for shared operating instructions and `docs/GETTING-STARTED.md` for direct paths. Dots are optional; never gate local execution on Pro or Dot access.
- `dot/` contains portable instructions, not a Dot runtime or platform configuration schema.
- `codex/HANDOFF.md` is the source-task template.
- Keep `work-plugin/` skills-only. Bootstrap pins Mojulo 3.0.0 with workspace-local state/runtime. Add no MCP configuration or hosted compute without an explicit architecture request.
- Use Mojulo orientation, routing, and schemas; do not duplicate its tool table.
- Preserve refs for edits and include portable state/build provenance in cross-workspace handoffs.
- Keep optional bridge and Google work explicit in scope. Orientation-only edits should not change runtime behavior.
- For docs, verify relative links, commands against source, and diff scope. For runtime edits, run relevant existing checks and document blockers.
- Manual behavior scenarios live in `tests/orientation/README.md`. Document review does not establish a Dot/Work/Codex field-test pass.
