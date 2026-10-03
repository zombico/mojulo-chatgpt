# Start Mojulo without Dots

Dots are an optional coordination layer. Mojulo's local runner has no Pro-plan or Dot dependency. Access to Work, Codex, plugins, models, cloud features, and usage allowance remains controlled by the platform. Check [current pricing and access](https://learn.chatgpt.com/docs/pricing); do not infer every feature is available on every plan.

## Choose a direct path

| Available environment | Start here |
| --- | --- |
| Work with the Mojulo plugin installed | Ask for an artifact; the installed skill bootstraps the pinned runtime |
| Work or Codex with a shell and repository files | Read [shared orientation](ORIENTATION.md) and use the manual bootstrap below |
| Codex with source-repository access | Read applicable AGENTS.md and use [the source handoff](../codex/HANDOFF.md) |
| Ordinary chat without execution tools | Plan using shared orientation, then give the brief to a user-started Work/Codex session |
| Optional dot | Add [ongoing coordination](../dot/ORIENTATION.md) to the same direct paths |

## Installed Work plugin

Start a regular Work task with the skills-only Mojulo plugin installed. Send:

> Use Mojulo to create a small city with seed 91. Export GLB and its recipe. Keep the returned ref, report warnings, and then edit that same ref to seed 92 and export the updated model.

The installed skill provides its own bootstrap and operating instructions. No dot or separate Dot documents are needed. See [Work plugin](../work-plugin/README.md) for runtime requirements and acceptance checks.

## Manual Work or Codex checkout

Use a writable workspace containing this repository, Node >=22.14, npm, and network access to the npm registry. From the repository root:

```sh
bash work-plugin/skills/mojulo/scripts/bootstrap.sh "$PWD"
.mojulo-runtime/bin/mojulo-work orient
.mojulo-runtime/bin/mojulo-work tools
```

Use the returned routing and relevant tool help before calling operations. Bootstrap installs exactly Mojulo 3.0.0 with workspace-local runtime/state. This path does not need the top-level Google bridge dependencies or a Mojulo API key.

## Source work in Codex

Open the repository to change: core behavior in `zombico/mojulo`, adapter behavior here. Read applicable `AGENTS.md`, reproduce the problem, make the requested change, run relevant checks, and prepare a PR when authorized. Read orientation directly; no Dot-created task is required.

## Continue in another session

Return the current recipe/checkpoint, ref, exact build, seed, constraints, exports, and next requested change. Supply those files and the brief to the next Work/Codex task. Restore portable state before editing. Do not assume private notes, a ref string, or a previous VM transfers scene state.
