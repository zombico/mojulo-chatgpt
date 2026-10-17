# Mojulo Work plugin 0.3.0: npm latest

## Plan and scope

1. Replace the 3.0.0 bootstrap pin with one-time npm latest resolution.
2. Preserve existing workspace runtimes; provide explicit upgrade and exact-version recovery.
3. Record the resolved version and keep npm's lockfile for provenance.
4. Test selection/reuse/failure behaviour and the existing mint/edit/export/recovery workflow.
5. Package only work-plugin/ for the existing marketplace listing, disclose the runtime policy, and submit the update.

The optional HTTP MCP and Google bridges are unchanged. Their separate dependency pins are not the Work plugin's runtime.

## Runtime policy

New workspaces fetch the current version behind npm's mojulo@latest tag, install that exact version, and record it in .mojulo-runtime/mojulo-version.json. Future major releases are included. Existing workspaces retain their installed release without querying npm. This is not an auto-updater for existing tasks.

Explicit commands, run with the packaged bootstrap script:

```sh
bash work-plugin/skills/mojulo/scripts/bootstrap.sh /path/to/workspace
bash work-plugin/skills/mojulo/scripts/bootstrap.sh /path/to/workspace --upgrade
bash work-plugin/skills/mojulo/scripts/bootstrap.sh /path/to/recovery-workspace --version 3.1.1
```

Export portable recipes/checkpoints before upgrading. Include the version record in recovery handoffs. Exact-version installation still needs npm package access if that version is not already installed.

## Marketplace update steps

1. Review/merge the repository change and confirm the Work-native CI job passes on Linux. Local shell checks do not establish a ChatGPT field-test pass.
2. Build or use the supplied ZIP. Its root must contain plugin.json, skills/, and assets/; exclude the repository's optional plugin/ MCP package, bridge source, dependencies, and local state.
3. Open https://platform.openai.com/plugins and select the EXISTING Mojulo plugin in the correct organisation/project.
4. Upload the complete 0.3.0 ZIP as an update. Preserve existing listing/reviewer details and inspect automated findings.
5. Disclose the policy below in the reviewer notes. Complete the applicable review steps. A bundled script change requires a package update; acceptance of future runtime dependency updates is determined by OpenAI, not guaranteed by this implementation.
6. After approval, select Publish plugin. This replaces the previous published package; pushing GitHub alone does not publish the marketplace ZIP.
7. In a fresh ChatGPT Work task using the updated plugin, ask: "Use Mojulo to create a small procedural city with seed 91. Export a GLB and recipe, and report the actual Mojulo version."
8. Verify the actual version equals npm latest at that bootstrap, a real artifact is downloadable, and same-ref editing works. Continue the same workspace and verify the version stays fixed. Test explicit upgrade separately after exporting a checkpoint.

## Suggested reviewer notes

This remains a skills-only plugin running Mojulo inside the user's supported Work/Codex execution environment. No hosted Mojulo service or MCP endpoint is added. Version 0.3.0 changes the packaged bootstrap from a hardcoded mojulo@3.0.0 to resolving the public npm mojulo@latest tag once for a fresh workspace, then installing and recording that exact version. Subsequent ordinary use reuses the installed runtime without registry access. New workspace installations may therefore use newer Mojulo releases, including majors, without a bundled plugin change. Existing workspace upgrades require an explicit user request; exact-version recovery is supported. Runtime files are downloaded from npm at execution time and are not bundled in the plugin ZIP.

## Future Mojulo releases

After this policy is approved and published, publishing a Mojulo release and moving npm latest makes it the selection for fresh workspaces. There is no Work plugin version string to edit for those engine releases. Existing workspaces do not move automatically. Changes to packaged scripts, instructions, assets or metadata still require an updated ZIP. OpenAI may require further review; this is not a claim of exemption from marketplace policy.

Official publishing instructions: https://developers.openai.com/plugins/deploy/submission#update-your-published-plugin
