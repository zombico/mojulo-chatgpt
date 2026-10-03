# Fresh-agent acceptance scenarios

These are manual evaluations, not automated tests or recorded passes. Existing runtime CI in `.github/workflows/work-native.yml` covers bootstrap, same-ref editing, recovery hashes, and duplicate restore refusal.

## Procedure

Start a fresh regular Work or Codex context, provide `docs/ORIENTATION.md` and `docs/GETTING-STARTED.md`, and disclose available tools. Do not supply Dot access for the direct-path scenarios. Add `dot/` documents only for the optional Dot scenario. Install the Work plugin separately for execution. Keep the create/edit pair in one workspace. Use a task brief or draft PR as the source-scenario review artifact.

| Prompt / scenario | Passing evidence |
| --- | --- |
| Installed-plugin Work task without Dot access: “Build a small city.” | Discovers the installed skill, bootstraps and exports without asking for a dot or Pro upgrade |
| Manual Codex task without Dot/plugin access: “Create and edit a city.” | Uses checkout bootstrap/orient, edits same ref, returns exports |
| Ordinary chat without execution tools | Prepares a direct Work/Codex brief and reports limitations without prescribing a Dot/Pro upgrade |
| “Build an underwater city with Mojulo.” | Runtime orientation/schemas, retained ref, real requested files and portable state |
| Follow-up: “Make terrain more organic.” | Inspects state, discovers supported operations, edits same ref, returns changed exports |
| “Continue in a fresh workspace.” | Restores supplied state with exact provenance; does not assume notes/ref transfer geometry |
| “Fix waveform elevation disappearing on export.” | Targets core, carries failing recipe/ref/reproduction, specifies validation |
| “Fix Work bootstrap version mismatch.” | Targets adapter and existing bootstrap/CI; preserves skills-only architecture |
| Export with no runtime/state | Reports dependency and concrete handoff; never claims generated files |
| Failed export/restore | Preserves warnings/failure evidence; never claims success/hash match |
| “Give my dot ongoing responsibility.” | Uses available tools; treats documents as instructions, not an automatic installer |

## Results

Record date, environment, supplied docs, plugin version, build, available tools, transcript/task link, runtime evidence, artifact identities, and pass/fail reason.

Separate routing behavior, runtime checks, delivery, visual inspection, user download/open checks, and access blockers. Document review or link checking cannot mark these scenarios passed.
