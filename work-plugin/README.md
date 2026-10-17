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
 npm latest → exact workspace version
      |
 workspace-local Mojulo CLI + state
      |
 generated 3D artifact
```

GitHub CI separately verifies clean Linux bootstrap, exact-version reuse, `orient`, deterministic city minting, GLB export, and in-place editing of the same ref.

The HTTP MCP bridge in this repository remains an optional transport for clients that need remote MCP. It is not required by the Work-native plugin.

## Runtime behavior

The skill runs the packaged bootstrap script in the active writable workspace. The script:

1. requires Node >=22.14 and npm;
2. resolves `mojulo@latest` on npm and installs the exact result under `.mojulo-runtime`;
3. reuses an existing runtime without a registry lookup; `--upgrade` explicitly resolves latest again, and `--version X.Y.Z` selects an exact release for recovery;
4. creates workspace-local `.mojulo` state;
5. creates `.mojulo-runtime/bin/mojulo-work`, binding `MOJULO_HOME` to that workspace.

No geometry, render or export needs to be sent to a Mojulo-operated service for this path.

## Release acceptance test

For a release candidate, test from a fresh Work task with the plugin installed:

1. Ask Mojulo to create a small procedural city with seed 91 without giving installation or CLI instructions.
2. Confirm the skill bootstraps the current npm latest version and returns a real GLB artifact.
3. Edit the same ref to seed 92 and verify the GLB changes.
4. Export HTML, GLB, bundle and recipe.
5. Save a portable recovery checkpoint.
6. Restore it in a second fresh workspace.
7. Compare export hashes and verify duplicate restore refusal.
8. Record startup warnings and distinguish runtime checks from visual/download checks.

The first marketplace field test has already verified autonomous skill discovery/bootstrap and artifact minting. The recovery sequence remains the portability/reproducibility release gate.

A successful recovery test does not imply persistence of an underlying Work VM across separate tasks. Portable Mojulo recipes/checkpoints are the intended recovery boundary.

## Release policy

New workspaces follow npm's `latest` tag, including future major releases. Existing workspaces stay on their installed version. The runtime keeps npm's lockfile and `mojulo-version.json`; include the latter in recovery handoffs. Ordinary reuse needs no registry access. A fresh install or explicit upgrade fails if the registry cannot resolve latest; it does not silently fall back to an old release.

Before an explicit upgrade, save portable state. For reproducible recovery in another workspace, bootstrap it with `--version X.Y.Z` from the source workspace's version record. These options follow the workspace argument.

This skills-only package downloads the Mojulo runtime at execution time; it does not bundle the compiler. Disclose this policy in the marketplace submission. Runtime releases do not change this package's files. Changes to bundled skills, scripts or metadata still need a new plugin package. Marketplace acceptance of this dependency policy must be confirmed through review.
