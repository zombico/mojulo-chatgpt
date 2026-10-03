# Mojulo for ChatGPT, Dots, Work, and Codex

Mojulo's ChatGPT integration and orientation package. It helps agents understand Mojulo, use native operations, preserve editable 3D recipes, and hand tasks to an environment with the required tools.

Mojulo is a 3D compiler for coding agents. Core implementation lives in [zombico/mojulo](https://github.com/zombico/mojulo).

## Choose a starting point

| Goal | Start here |
| --- | --- |
| Give a dot ongoing responsibility for a Mojulo project | [Dot orientation](dot/ORIENTATION.md) |
| Build, edit, or export a 3D artifact in Work | [Work-native plugin](work-plugin/README.md) |
| Fix core or adapter source with Codex | [Engineering handoff](codex/HANDOFF.md) |
| Choose an execution environment | [Execution routing](dot/EXECUTION-ROUTING.md) |
| Understand integration boundaries | [Architecture](ARCHITECTURE.md) |

## Dots and Mojulo

OpenAI describes dots as always-on agents that continue work between conversations and can create Work or Codex tasks. They can also execute with available tools. See [Meet dots](https://learn.chatgpt.com/docs/dots) and [Tasks and memory](https://learn.chatgpt.com/docs/dots/tasks-and-memory).

Our integration design gives that agent Mojulo orientation and portable task context, while Mojulo supplies the scene model and operations. Routing depends on tools, permissions, and runtime access.

The Markdown files in `dot/` are instructions to read or provide to an agent. They are not an automatically installed Dot API, runtime, or configuration format. Dot notes support continuity; recipes and checkpoints carry recoverable scene state.

## Run artifact work locally

The plugin root is `work-plugin/`. It remains a skills-only package with no MCP configuration or hosted Mojulo compute requirement.

With the plugin installed, ask:

> Use Mojulo to build a small procedural city with seed 91. Export its GLB and recipe, retain the returned ref, and report startup warnings.

For a manual checkout, from the repository root:

```sh
bash work-plugin/skills/mojulo/scripts/bootstrap.sh "$PWD"
.mojulo-runtime/bin/mojulo-work orient
```

Bootstrap requires Node >=22.14 and npm, installs exactly `mojulo@3.0.0`, and creates workspace-local runtime and state. Follow the CLI's orientation, routing, and tool schemas before issuing operations. Top-level Google bridge dependencies are not needed for this path.

For iteration, edit the same ref. Return actual exports together with portable state for continuation in another workspace.

## Other integration surfaces

- `plugin/` and the JavaScript HTTP bridge remain the optional MCP path, documented in [Architecture](ARCHITECTURE.md).
- Existing Genkit, Vertex/Gemini, Drive, and Cloud Run material is described in [Google bridge](docs/GOOGLE-BRIDGE.md). Source and package configuration are retained.
- [Acceptance scenarios](tests/orientation/README.md) cover routing, same-ref edits, recovery handoffs, and truthful reporting. They complement existing runtime CI.

This orientation change adds no Dot runtime, MCP server, or replacement agent harness.
