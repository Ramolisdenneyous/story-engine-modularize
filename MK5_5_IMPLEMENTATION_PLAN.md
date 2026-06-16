# Story Engine MK5.5 Modularization Plan

MK5.5 turns Story Engine from one Valaska game into a modular game-building engine. The immediate goal is to split MK5 into clear engine, content, agent, frontend, asset, and testing boundaries so future Codex/OpenAI agents can work in separate contexts without needing to understand the whole application at once.

## Core Principle

Separate modes of thinking.

- Creative story work should not share a cramped context with backend implementation details.
- RPG design should describe mechanics and balance without editing React components.
- Backend agents should receive formal rules and implement deterministic resolution.
- Frontend agents should receive UI requirements and render game state cleanly.
- Asset agents should receive asset manifests, not database models.
- Tester agents should receive playable acceptance criteria and report friction.

The codebase should make those boundaries visible.

## Target Architecture

```text
backend/app/
  content/
    registry.py
    valaska/
      assets.py
      players.py
      classes.py
      monsters.py
      adventures.py
      encounters.py
      prompts.py
      catalog.py

  engine/
    dice.py
    sessions.py
    events.py
    combat.py
    resources.py
    inventory.py
    objectives.py
    travel.py
    encounters.py
    hazards.py

  agents/
    orchestration.py
    prompt_context.py
    player_agents.py
    opposition_agents.py
    narrative_agents.py
    tool_results.py

  generation/
    contracts.py
    story_brief.py
    rpg_design_brief.py
    game_pack_spec.py
    asset_manifest.py
    test_report.py

frontend/src/
  constants/
  hooks/
  components/
  gamePack/
```

This is a direction, not a demand that every file appear immediately. Each phase should keep the app runnable.

## Phase 1: Content Pack Boundary

Status: mostly complete.

Goal: make Valaska one content pack, not the whole application.

Completed:

- Created `backend/app/content/`.
- Created `backend/app/content/valaska/`.
- Split Valaska content into assets, players, classes, monsters, adventures, encounters, and prompts.
- Added `backend/app/content/registry.py`.
- Kept `backend/app/game_data.py` as a compatibility facade.
- Added active content-pack validation at backend startup.
- Added reference checks for player/class/monster ids, adventure locations, paths, encounters, traps, hazards, and blocked travel targets.
- Added tests for valid Valaska content and readable broken-reference errors.

Next work:

- Update backend call sites to prefer `get_content_pack()` where practical.
- Keep `game_data.py` temporarily for compatibility during the transition.

Acceptance checks:

- `from app.content import get_content_pack` returns Valaska.
- Existing API behavior remains unchanged.
- Backend tests pass.

## Phase 2: Backend Engine Boundary

Goal: extract reusable game mechanics from `backend/app/services.py`.

Candidate modules:

- `engine/dice.py`: dice parsing and rolling.
- `engine/events.py`: event creation helpers and backend log payloads.
- `engine/combat.py`: combat state, initiative, turn advancement, damage application.
- `engine/resources.py`: HP, MP, rest, status effects, feature uses.
- `engine/inventory.py`: item lookup, item use, loot awards.
- `engine/objectives.py`: mission objective state and completion updates.
- `engine/travel.py`: location movement and route checks.
- `engine/encounters.py`: encounter state, combat spawn from encounter data.
- `engine/hazards.py`: traps, hazards, skill checks, hazard progress.

Approach:

- Extract leaf helpers first.
- Preserve function signatures where endpoints already depend on them.
- Leave orchestration functions in `services.py` until their dependencies are clearer.
- After extraction, `services.py` should become a coordinator instead of a rules warehouse.

Acceptance checks:

- Backend tests pass after each extracted module.
- No user-visible behavior changes unless deliberately planned.
- Mechanical logic can be tested without importing LLM provider code.

## Phase 3: Agent Orchestration Boundary

Goal: separate LLM and prompt behavior from deterministic game rules.

Candidate modules:

- `agents/prompt_context.py`: build current state context for agents.
- `agents/player_agents.py`: player prompt payloads and response handling.
- `agents/opposition_agents.py`: opposition prompts and behavior constraints.
- `agents/narrative_agents.py`: narration, summary, celebration draft prompts.
- `agents/tool_results.py`: parse/normalize model tool-call style outputs.
- `agents/orchestration.py`: bounded AI-to-AI prompt flow.

Approach:

- Move prompt construction and response parsing out of `services.py`.
- Keep backend rule resolution in `engine/`.
- Treat model prose as a consumer of resolved state, not as source of truth.

Acceptance checks:

- Combat/item/objective rules do not need to import LLM provider code.
- Agent modules can be tested with mock providers.
- Existing prompt tests remain green.

## Phase 4: Game Pack Contracts

Goal: define the shape future swarm agents must produce.

Add formal schemas for:

- Game pack metadata.
- Player/archetype definitions.
- Class/role/ability definitions.
- Monster/opposition definitions.
- Adventure, chapter, location, and path definitions.
- Encounter, trap, hazard, and objective definitions.
- Item and loot definitions.
- Asset manifest entries.
- Prompt/persona/lens references.

Likely home:

```text
backend/app/generation/contracts.py
backend/app/content/contracts.py
shared/gamePack.ts
```

Acceptance checks:

- Valaska can be validated against the contracts.
- Contract errors are readable enough for future agents to fix their output.
- The contracts describe data, not implementation details.

## Phase 5: Frontend Constants And Hooks

Status: in progress.

Goal: reduce `frontend/src/App.tsx` into a coordinator.

Candidate extractions:

- `constants/music.ts`
- `constants/audio.ts`
- `constants/encounterVisuals.ts`
- `constants/adventureTitles.ts`
- `hooks/useCatalogBoot.ts`
- `hooks/useSessionDetail.ts`
- `hooks/usePromptFlow.ts`
- `hooks/useMusicController.ts`
- `hooks/useTtsPlayback.ts`
- `hooks/useEncounterAudio.ts`
- `hooks/useAttackAnimations.ts`
- `hooks/useOnboardingGuide.ts`
- `hooks/useCelebrationSong.ts`

Approach:

- Move constants first.
- Then extract hooks with minimal behavior changes.
- Keep component props stable during the first pass.

Acceptance checks:

- Frontend build passes.
- No visible layout or behavior regressions.
- `App.tsx` becomes easier for a frontend agent to reason about.

Completed:

- Moved audio, onboarding, and game-pack constants out of `App.tsx`.
- Moved transcript/turn-selection view helpers into `frontend/src/sessionView.ts`.
- Moved media URL helpers into `frontend/src/gamePack/media.ts`.
- Moved background music state/effects into `frontend/src/hooks/useBackgroundMusic.ts`.
- Moved TTS playback, preload, autoplay queue, and gain-chain behavior into `frontend/src/hooks/useTtsPlayback.ts`.
- Moved encounter notice audio playback and event detection into `frontend/src/hooks/useEncounterNoticeAudio.ts`.
- Moved catalog/session boot, refresh, lazy adventure loading, and Tab 1 selection mirror state into `frontend/src/hooks/useSessionWorkspace.ts`.
- Moved prompt submission, transcript event merging, narration polling, and party followup polling into `frontend/src/hooks/usePromptFlow.ts`.
- Moved preparation/chapter actions into `frontend/src/hooks/usePreparationActions.ts`.
- Moved travel, rest, opposition, search, and item-use actions into `frontend/src/hooks/useAdventureActions.ts`.
- Moved feedback form state and submission into `frontend/src/hooks/useFeedbackActions.ts`.
- Moved victory song state/generation into `frontend/src/hooks/useCelebrationSong.ts`.
- Moved encounter monster selection/cycling into `frontend/src/hooks/useEncounterSelection.ts`.
- Moved intro audio lifecycle and autoplay guard into `frontend/src/hooks/useIntroAudio.ts`.
- Moved party selection/class assignment/start-readiness helpers into `frontend/src/hooks/usePartySetup.ts`.

## Phase 6: Frontend Game-Pack Awareness

Status: started.

Goal: make the UI render active game-pack metadata instead of hardcoded Valaska assumptions.

Work areas:

- Adventure title overrides.
- Music and audio cue manifests.
- Encounter visual mappings.
- Default/world/adventure selection images.
- Player/class/adventure catalogs.
- Future genre labels and theme hints.

Approach:

- Keep Valaska as the only pack.
- Move hardcoded mappings toward backend-provided metadata or a frontend game-pack manifest.
- Avoid redesigning UI during this phase.

Acceptance checks:

- Valaska still renders the same.
- A future content pack has a clear path to provide its own labels, images, and audio.

Completed:

- Added `frontend/src/gamePack/valaskaManifest.ts` as the active frontend game-pack UI manifest.
- Routed adventure title overrides, starter prompts, encounter visuals, encounter notices, music tracks, and victory songs through the active Valaska UI manifest.
- Moved mission map pip positions and adventure preview images into the active Valaska UI manifest.
- Moved Valaska-specific intro audio, encounter notice audio, encounter notice types, music tracks, and victory songs into the active UI manifest.
- Routed visible Valaska labels in the splash/header, world-map alt text, and home-base UI copy through the active UI manifest.
- Added generic `/session/{session_id}/return-home-base` API usage while preserving `/return-to-moosehearth` as a compatibility alias.
- Added backend `GAME_OVER` session state so full-party defeats clear combat/opposition and persist as explicit API state.
- Removed stale generated frontend `.js` siblings now that TypeScript `noEmit` is enabled.
- Added a typed frontend `GamePackUiManifest` contract and matching shared `GamePackUiManifest` type.
- Documented required UI manifest fields in the GamePackSpec handoff.

## Phase 7: Swarm Handoff Documents

Status: mostly complete.

Goal: create documents and schemas that let agents pass work cleanly.

Artifacts:

- `StoryBrief`: genre, tone, world, characters, arc, emotional beats.
- `RpgDesignBrief`: core loop, roles, resource systems, conflict types.
- `GamePackSpec`: structured content that can become a content pack.
- `ImplementationContract`: backend/frontend/data changes required.
- `AssetManifest`: images, music, sound, voice needs.
- `TestReport`: bugs, balance issues, UX friction, suggested fixes.

Likely home:

```text
docs/mk5_5/contracts/
backend/app/generation/
```

Acceptance checks:

- Each handoff has one owner agent and one consumer agent.
- Creative handoffs avoid code details.
- Technical handoffs avoid open-ended lore invention.

Completed:

- Expanded all handoff documents with required fields and boundary rules.
- Added the end-to-end swarm handoff flow to `docs/mk5_5/contracts/README.md`.
- Expanded backend generation contracts for story, design, pack spec, implementation, assets, and test reports.
- Added an `implementation_contract.py` generation export wrapper.
- Exported generation contract classes from `app.generation` and added instantiation tests.

## Phase 8: First Swarm Prototype

Goal: prototype the creative/design loop before full autonomous implementation.

Initial chain:

```text
User Seed
  -> Conductor
  -> Story Writer
  -> RPG Design
  -> GamePackSpec
```

Do not start with full autonomous app generation.

Acceptance checks:

- Given a seed, the chain produces a structured `GamePackSpec`.
- The spec can be validated.
- The spec is clear enough for backend, frontend, and asset agents to estimate work.

## Working Rules

- Keep MK5 playable after each slice.
- Prefer small mechanical moves over large rewrites.
- Do not remove compatibility facades until callers have moved.
- Tests must pass after backend slices.
- Frontend build must pass after frontend slices.
- Avoid UI redesign while doing architecture extraction.
- Preserve `story-engine-MK5` as the untouched reference build.

## Current Verification Commands

```powershell
$env:PYTHONPATH='backend'
python -m pytest backend/tests/test_mvp.py -q

cd frontend
npm run build
```
