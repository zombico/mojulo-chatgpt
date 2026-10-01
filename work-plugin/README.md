# Work-native experiment

This package is a skills-only ChatGPT Work experiment. It deliberately contains no MCP configuration and no lifecycle hooks.

The Mojulo skill instructs Work to run the packaged bootstrap script in its own writable workspace. The script:

1. requires Node >=22.14 and npm;
2. installs exactly `mojulo@3.0.0` under `.mojulo-runtime`;
3. creates workspace-local `.mojulo` state;
4. creates `.mojulo-runtime/bin/mojulo-work`, which invokes Mojulo locally with `MOJULO_HOME` bound to that workspace.

This tests whether the public skills-only plugin path can act as distribution/orchestration for Mojulo while Work supplies the execution compute.

## Acceptance test

In a fresh ChatGPT Work task with this plugin installed:

1. Ask Mojulo to create a small procedural city with seed 91.
2. Confirm the skill bootstraps `mojulo@3.0.0` locally.
3. Export GLB.
4. Edit the same ref to seed 92 and verify the model changed.
5. Export HTML, GLB, ZIP/bundle and recipe.
6. Save a recovery checkpoint.
7. Restore it in a second fresh Work workspace.
8. Compare export hashes and verify duplicate restore refusal.
9. Record startup warnings and distinguish runtime checks from visual/download checks.

A successful result proves the Work-native path. It does not prove persistence of an underlying Work VM across separate tasks; portable Mojulo recipes/checkpoints remain the recovery boundary.
