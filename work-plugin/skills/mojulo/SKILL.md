---
name: mojulo
description: Build, edit and export deterministic 3D objects, walkable worlds and games by running Mojulo locally in ChatGPT Work. Use for procedural 3D modeling, cities, rooms, worlds, game levels, 3D-printable objects, or GLB, HTML, STL, 3MF and bundle exports.
---

# Mojulo for ChatGPT Work

Use the Work execution environment for Mojulo computation. Do not send geometry, renders or exports to a hosted Mojulo service.

## Bootstrap

1. Check whether `.mojulo-runtime/bin/mojulo-work` exists in the active writable workspace.
2. If it does not, run the packaged `scripts/bootstrap.sh` from this skill with the active workspace path as its first argument.
3. On first bootstrap, resolve `mojulo@latest` from npm and install that exact release. Reuse an existing workspace runtime without checking for updates. Report the actual version; `.mojulo-runtime/mojulo-version.json` records its selection. Future npm releases, including major versions, apply to new workspaces.
4. Use the generated workspace-local launcher for every Mojulo command. It sets `MOJULO_HOME` to `.mojulo` in the active workspace.
5. If Node is missing or older than 22.14, stop and report the runtime requirement rather than modifying the system globally.

## Operate Mojulo

Start each new Mojulo task with:

```sh
.mojulo-runtime/bin/mojulo-work orient
```

Then use the CLI's own routing and schemas:

- `.mojulo-runtime/bin/mojulo-work tools`
- `.mojulo-runtime/bin/mojulo-work packs`
- `.mojulo-runtime/bin/mojulo-work help <tool-or-pack>`
- `.mojulo-runtime/bin/mojulo-work call <tool> --json '<object>'`
- `.mojulo-runtime/bin/mojulo-work <pack> <tool> --json '<object>'`

Follow Mojulo's returned orientation/routing rather than inventing tool arguments. Pull detailed help only for the tool you need.

When editing an existing artifact, preserve its returned ref and mutate the same stored recipe instead of silently minting a replacement.

## Artifacts

Mojulo state belongs to the Work workspace under `.mojulo`. Keep recipes, refs, checkpoints and exports there unless Mojulo returns another workspace-local path.

When Mojulo produces a file, use ChatGPT Work's normal file/artifact handoff to give that actual file to the user. Do not upload the artifact to a Mojulo-operated service merely to hand it back.

## Recovery and fresh-workspace checks

For recovery tests, export/save the recipe or checkpoint as directed by Mojulo. In a genuinely fresh Work workspace, bootstrap Mojulo again, restore the portable state, and compare hashes when the task requires deterministic verification.

## Failure behavior

Never claim an export, restore, render or deterministic match unless the corresponding Mojulo command completed successfully and the output exists. Preserve startup warnings and distinguish runtime checks from visual/download checks that require the user.

## Upgrade and recovery

Only when the user asks to upgrade an existing workspace, export its portable recipes/checkpoints first, then run `bash scripts/bootstrap.sh <workspace> --upgrade` using this skill's packaged script. This resolves npm latest again; do not upgrade during ordinary edits.

For recovery that must reproduce a prior result, use `bash scripts/bootstrap.sh <workspace> --version X.Y.Z` with the exact version recorded in the source workspace's provenance. Do not invent a version or replace a working runtime silently. Carry the version record with exported recipes/checkpoints. If npm is unavailable, report the failure; a working existing runtime can still be reused without a registry lookup. Never claim that this establishes persistence across Work tasks.
