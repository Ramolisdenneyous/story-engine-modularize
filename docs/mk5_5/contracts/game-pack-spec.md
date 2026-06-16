# GamePackSpec

Owner: RPG Maker Agent

Consumers: Backend Agent, Frontend Agent, Asset Agents, Tester Agent

Purpose: formalize the agreed story and RPG design into structured game content that can become a content pack.

## Required Frontend UI Manifest

A playable game pack should include UI-facing metadata in addition to backend content:

- `packId`
- `title`
- `consoleTitle`
- `homeBaseName`
- `prompts.starter`
- `prompts.oppositionStarter`
- `introAudioUrl`
- `missionPipPositions`
- `adventurePreviewImages`
- `adventureTitleOverrides`
- `encounterVisuals`
- `encounterNoticeTypes`
- `encounterNoticeAudio`
- `musicTracks`
- `victorySongs`

This data lets a frontend agent swap game packs without searching through React components for hardcoded world names, map positions, preview images, encounter art, notice audio, music, intro narration, victory songs, or starter prompt text.

Type reference: `shared/gamePack.ts` exports `GamePackUiManifest`.

## Required Content Sections

- `pack_id`: stable lowercase id for code and assets.
- `name`: user-facing pack name.
- `genre`: broad category inherited from `StoryBrief`.
- `story_brief`: embedded or referenced creative brief.
- `rpg_design_brief`: embedded or referenced design brief.
- `players`: available player characters.
- `classes`: available roles/classes and starting resources.
- `opposition`: reusable monsters, NPC threats, hazards, and traps.
- `adventures`: selectable adventure entries, objectives, locations, paths, and encounter hooks.
- `items`: usable items and rewards.
- `prompts`: pack-specific system or starter prompt fragments.
- `ui_manifest`: frontend-facing labels, images, map pips, music, and audio tables.
- `asset_manifest`: concrete assets required to make the pack playable.
- `validation_notes`: assumptions, known gaps, or rules that validators should enforce.

## Handoff Rules

This is the first handoff where structured implementation data is allowed. Keep lore prose brief and put usable data in stable ids, arrays, and maps.

Backend, frontend, and asset agents should be able to estimate their work from this file without rereading the original brainstorming conversation.
