---
name: mojulo
description: Build and export 3D objects, walkable worlds and games with Mojulo. Use when the user asks to model or 3D-print an object, compose a city, room or world, make a game or game level, or export STL, 3MF, GLB, HTML or a Godot project.
---

# Mojulo

When the Mojulo MCP tools are available:

1. Call `forward_context` first. It is Mojulo's routing index; find the row matching the user's request and call the entry tool it names.
2. Pull a drawer or vocabulary card only when the routing result or tool response points you there.
3. Iterate on the stored recipe in place instead of minting a replacement when the user is editing the same artifact.
4. Use the export tool named by Mojulo's routing context. Prefer bundle export when the user wants a portable handoff containing the recipe and generated files.
5. Treat returned refs as the identity of the artifact for later turns. Do not silently substitute a new ref during an edit.
6. Report Mojulo errors and unsupported formats accurately rather than inventing a successful export.
