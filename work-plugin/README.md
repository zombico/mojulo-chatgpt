# Mojulo Work-native plugin — 0.3.0 release candidate

The published `mojulo-work` integration remains a **skills-only** ChatGPT Work/Codex plugin. It does not provision a compute box, register MCP, or require hosted Mojulo compute. Its runtime dependency is the separately published npm package `mojulo`.

## 3.1.0 preparation (not yet npm-validated)

| Component | Target | Release status |
| --- | --- | --- |
| ChatGPT plugin | `mojulo-work@0.3.0` | Candidate on this branch, not submitted |
| Mojulo engine | `mojulo@3.1.0` | Assumed upcoming npm release; verify before promoting |
| Existing live plugin | `mojulo-work@0.2.0` / Mojulo 3.0.0 | Unchanged by this branch |

The skill uses the upstream `1012-consolidate` runner rather than a hardcoded 3.0.0 shell bootstrap. Its default is the **exact** Mojulo 3.1.0 version; it never substitutes `@latest`, overwrites a mismatched runtime, or silently migrates the earlier plugin's stored recipes.

## Execution paths

1. If Mojulo MCP tools are already available and authorized, use that connected runtime's `forward_context` and tools. No new MCP config is bundled by this plugin.
2. Otherwise, in a shell-enabled writable Work environment, use the packaged runner:

```sh
workspace="$(pwd -P)"
runner="$workspace/work-plugin/skills/mojulo/scripts/runner.mjs" # manual checkout only
node "$runner" status --workspace "$workspace"
node "$runner" install --workspace "$workspace" --version 3.1.0
node "$runner" exec --workspace "$workspace" -- orient
node "$runner" exec --workspace "$workspace" -- call version
```

An installed plugin resolves `runner.mjs` relative to its skill directory; it must not assume it is inside the user's workspace. This checkout example assumes you are running from the repository root.

The runner requires Node.js 22.14+ and npm. It stores runtime under `.mojulo-chatgpt/runtime` and recipe/export state under `.mojulo-chatgpt/home`, overriding inherited Mojulo data paths so unrelated local installs do not mix state. The old `.mojulo-runtime` and `.mojulo` are not modified or migrated. If `status` reports `legacyWorkspace`, export recipes using the old launcher before switching to the new runtime.

Until `mojulo@3.1.0` is actually published on npm, testing must use an explicitly provided development tarball from `1012-consolidate`; see [work-box reference](skills/mojulo/references/work-box.md). Do not report success for a registry 3.1.0 install before it exists.

## Release checks

The workflow runs runner-only unit checks on every PR. Its npm smoke gate looks up `mojulo@3.1.0` and **explicitly defers** runtime integration when that version is not on the registry. After npm publication, it must actually pass all checks below:

1. Fresh Linux install with Node >=22.14; second install reuses exactly the same runtime.
2. `orient`, `version`, and a small seed-91 city mint.
3. GLB export, same-ref edit to seed 92, and changed GLB hash.
4. Bundle and portable checkpoint; restore in a second clean workspace.
5. Equality of recipe, GLB and HTML hashes in the same environment.
6. Duplicate restore refuses without overwriting the stored ref.
7. ChatGPT Work trial verifies real file delivery and (where available) visual output.

Do not equate a skipped npm smoke test with a completed release gate, or a successful artifact export with an in-client visual check.

## Release procedure

1. Publish Mojulo 3.1.0 to npm and verify `npm view mojulo@3.1.0 version`.
2. Trigger the full Work-native CI against the published npm tarball; investigate any changed schema.
3. Install the plugin candidate in a fresh Work session and complete the file and visual delivery check.
4. Package **only `work-plugin/`**, keeping manifest name `mojulo-work` and version 0.3.0, and submit the update through ChatGPT's plugin flow.
5. Do not change the already-published plugin or npm by merging this branch alone.

The optional HTTP MCP / Google bridge in the repository retains its separate 3.0.0 dependency and is **out of scope** for this skills-only 3.1.0 release.
