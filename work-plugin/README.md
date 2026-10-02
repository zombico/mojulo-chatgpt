# Mojulo Work-native plugin

Mojulo's Work-native plugin is a skills-only distribution path for running Mojulo inside the agent's writable execution environment. It contains no MCP configuration and does not require hosted Mojulo compute.

## Verified architecture

The local/personal marketplace field test verified this path end to end:

```text
ChatGPT / Codex
      |
 installed Mojulo skill
      |
 Work execution environment
      |
 packaged bootstrap.sh
      |
 pinned mojulo@3.0.0
      |
 workspace-local Mojulo CLI + state
      |
 generated 3D artifact
```

GitHub CI separately verifies clean Linux bootstrap, pinned-version reuse, `orient`, deterministic city minting, GLB export, and in-place editing of the same ref.

The HTTP MCP bridge in this repository remains an optional transport for clients that need remote MCP. It is not required by the Work-native plugin.

## Runtime behavior

The skill runs the packaged bootstrap script in the active writable workspace. The script:

1. requires Node >=22.14 and npm;
2. installs exactly `mojulo@3.0.0` under `.mojulo-runtime`;
3. reuses a correct existing install and replaces a mismatched workspace-local version;
4. creates workspace-local `.mojulo` state;
5. creates `.mojulo-runtime/bin/mojulo-work`, binding `MOJULO_HOME` to that workspace.

No geometry, render or export needs to be sent to a Mojulo-operated service for this path.

## Release acceptance test

For a release candidate, test from a fresh Work task with the plugin installed:

1. Ask Mojulo to create a small procedural city with seed 91 without giving installation or CLI instructions.
2. Confirm the skill bootstraps the pinned Mojulo version and returns a real GLB artifact.
3. Edit the same ref to seed 92 and verify the GLB changes.
4. Export HTML, GLB, bundle and recipe.
5. Save a portable recovery checkpoint.
6. Restore it in a second fresh workspace.
7. Compare export hashes and verify duplicate restore refusal.
8. Record startup warnings and distinguish runtime checks from visual/download checks.

The first marketplace field test has already verified autonomous skill discovery/bootstrap and artifact minting. The recovery sequence remains the portability/reproducibility release gate.

A successful recovery test does not imply persistence of an underlying Work VM across separate tasks. Portable Mojulo recipes/checkpoints are the intended recovery boundary.
