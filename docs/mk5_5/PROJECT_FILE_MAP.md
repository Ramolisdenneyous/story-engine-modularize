# MK5.5 Project File Map

This map lists the current MK5.5 project files, gives each file a one-sentence purpose, and names the swarm agent roles that would own or co-author that file in a future generated game.

Agent labels used here: Conductor Agent, Story Writer, RPG Design Agent, Game Pack Architect, Backend Agent, Frontend Agent, Prompt Engineer, Asset Coordinator, Image Agent, Music/Sound Agent, Voice/Dialog Agent, Tester Agent, and DevOps Agent.

| File | Purpose | Future Swarm Owner(s) |
| --- | --- | --- |
| `backend/app/__init__.py` | Marks the backend application as an importable package. | Backend Agent, Game Pack Architect |
| `backend/app/agents/__init__.py` | Marks backend agent helpers as an importable package. | Story Writer, Game Pack Architect, Prompt Engineer, Backend Agent |
| `backend/app/agents/narrative_agents.py` | Builds payloads and helpers for narrative agent generation. | Story Writer, Game Pack Architect, Prompt Engineer, Backend Agent |
| `backend/app/agents/opposition_agents.py` | Builds payloads and helpers for opposition agent turns. | Story Writer, Game Pack Architect, Prompt Engineer, Backend Agent |
| `backend/app/agents/orchestration.py` | Contains helper logic for coordinating agent prompt flow. | Story Writer, Game Pack Architect, Prompt Engineer, Backend Agent |
| `backend/app/agents/player_agents.py` | Builds player-agent payloads and role context. | Story Writer, Game Pack Architect, Prompt Engineer, Backend Agent |
| `backend/app/agents/prompt_context.py` | Builds compact prompt context from session and encounter state. | Story Writer, Game Pack Architect, Prompt Engineer, Backend Agent |
| `backend/app/agents/tool_results.py` | Normalizes and validates structured tool/action results from agents. | Story Writer, Game Pack Architect, Prompt Engineer, Backend Agent |
| `backend/app/config.py` | Loads backend configuration and environment settings. | Backend Agent, Game Pack Architect |
| `backend/app/content/__init__.py` | Exports content pack registry helpers for backend callers. | Game Pack Architect, Backend Agent |
| `backend/app/content/contracts.py` | Validates content pack structure and cross-reference integrity. | Game Pack Architect, Backend Agent |
| `backend/app/content/registry.py` | Registers available content packs and selects the active pack. | Game Pack Architect, Backend Agent |
| `backend/app/content/valaska/__init__.py` | Exports the Valaska content pack modules as one package. | Story Writer, RPG Design Agent, Game Pack Architect, Backend Agent |
| `backend/app/content/valaska/adventures.py` | Defines the Valaska adventure catalog, maps, objectives, locations, and travel paths. | Story Writer, RPG Design Agent, Game Pack Architect, Backend Agent |
| `backend/app/content/valaska/assets.py` | Defines Valaska asset filenames and asset URL helpers. | Story Writer, RPG Design Agent, Game Pack Architect, Backend Agent |
| `backend/app/content/valaska/catalog.py` | Aggregates Valaska content exports for the active content pack. | Story Writer, RPG Design Agent, Game Pack Architect, Backend Agent |
| `backend/app/content/valaska/classes.py` | Defines Valaska class mechanics, roles, resources, and starting equipment. | Story Writer, RPG Design Agent, Game Pack Architect, Backend Agent |
| `backend/app/content/valaska/encounters.py` | Defines Valaska encounter tables, hazards, traps, NPC events, and opposition placements. | Story Writer, RPG Design Agent, Game Pack Architect, Backend Agent |
| `backend/app/content/valaska/monsters.py` | Defines Valaska monster statistics and combat reference data. | Story Writer, RPG Design Agent, Game Pack Architect, Backend Agent |
| `backend/app/content/valaska/players.py` | Defines Valaska player character catalog data and character metadata. | Story Writer, RPG Design Agent, Game Pack Architect, Backend Agent |
| `backend/app/content/valaska/prompts.py` | Defines Valaska prompt filenames and setting prompt references. | Story Writer, RPG Design Agent, Game Pack Architect, Backend Agent |
| `backend/app/db.py` | Configures the database engine, sessions, and declarative base. | Backend Agent, Game Pack Architect |
| `backend/app/engine/__init__.py` | Marks the backend engine helpers as an importable package. | RPG Design Agent, Backend Agent |
| `backend/app/engine/combat.py` | Provides reusable combat state, initiative, and turn-advance helpers. | RPG Design Agent, Backend Agent |
| `backend/app/engine/constants.py` | Stores engine-level constants such as slot colors and opposition ids. | RPG Design Agent, Backend Agent |
| `backend/app/engine/dice.py` | Implements dice parsing and dice roll utilities. | RPG Design Agent, Backend Agent |
| `backend/app/engine/encounters.py` | Provides generic encounter and opposition state helpers. | RPG Design Agent, Backend Agent |
| `backend/app/engine/events.py` | Provides reusable event payload and event serialization helpers. | RPG Design Agent, Backend Agent |
| `backend/app/engine/hazards.py` | Implements reusable hazard and trap resolution helpers. | RPG Design Agent, Backend Agent |
| `backend/app/engine/inventory.py` | Implements stackable inventory add, remove, and matching helpers. | RPG Design Agent, Backend Agent |
| `backend/app/engine/objectives.py` | Implements objective-state helpers and reusable objective text. | RPG Design Agent, Backend Agent |
| `backend/app/engine/resources.py` | Implements class resource and feature-use helper logic. | RPG Design Agent, Backend Agent |
| `backend/app/engine/serialization.py` | Serializes content pack data into API-facing response shapes. | RPG Design Agent, Backend Agent |
| `backend/app/engine/sessions.py` | Derives party state from event history and session setup. | RPG Design Agent, Backend Agent |
| `backend/app/engine/travel.py` | Provides travel path and location-unlock helper logic. | RPG Design Agent, Backend Agent |
| `backend/app/game_data.py` | Provides compatibility exports for active content pack data. | Backend Agent, Game Pack Architect |
| `backend/app/generation/__init__.py` | Exports the __init__ generation handoff contract type. | Conductor Agent, Story Writer, RPG Design Agent, Game Pack Architect |
| `backend/app/generation/asset_manifest.py` | Exports the asset_manifest generation handoff contract type. | Conductor Agent, Story Writer, RPG Design Agent, Game Pack Architect |
| `backend/app/generation/contracts.py` | Defines Pydantic schemas for swarm handoff contracts. | Conductor Agent, Story Writer, RPG Design Agent, Game Pack Architect |
| `backend/app/generation/game_pack_spec.py` | Exports the game_pack_spec generation handoff contract type. | Conductor Agent, Story Writer, RPG Design Agent, Game Pack Architect |
| `backend/app/generation/implementation_contract.py` | Exports the implementation_contract generation handoff contract type. | Conductor Agent, Story Writer, RPG Design Agent, Game Pack Architect |
| `backend/app/generation/rpg_design_brief.py` | Exports the rpg_design_brief generation handoff contract type. | Conductor Agent, Story Writer, RPG Design Agent, Game Pack Architect |
| `backend/app/generation/story_brief.py` | Exports the story_brief generation handoff contract type. | Conductor Agent, Story Writer, RPG Design Agent, Game Pack Architect |
| `backend/app/generation/test_report.py` | Exports the test_report generation handoff contract type. | Conductor Agent, Story Writer, RPG Design Agent, Game Pack Architect |
| `backend/app/llm.py` | Wraps LLM provider calls and fake/testing provider behavior. | Backend Agent, Game Pack Architect |
| `backend/app/main.py` | Defines the FastAPI app, routes, startup validation, static mounts, and response assembly. | Backend Agent, Game Pack Architect |
| `backend/app/models.py` | Defines SQLAlchemy database models and enum types. | Backend Agent, Game Pack Architect |
| `backend/app/prompt_loader.py` | Loads prompt text files from disk for agent use. | Backend Agent, Game Pack Architect |
| `backend/app/prompts/narrative_lenses/Lens-Annie.md` | Provides the narrative lens prompt for Lens-Annie. | Story Writer, Game Pack Architect, Prompt Engineer, Backend Agent |
| `backend/app/prompts/narrative_lenses/Lens-Beau.md` | Provides the narrative lens prompt for Lens-Beau. | Story Writer, Game Pack Architect, Prompt Engineer, Backend Agent |
| `backend/app/prompts/narrative_lenses/Lens-Jannet.md` | Provides the narrative lens prompt for Lens-Jannet. | Story Writer, Game Pack Architect, Prompt Engineer, Backend Agent |
| `backend/app/prompts/narrative_lenses/Lens-Joe.md` | Provides the narrative lens prompt for Lens-Joe. | Story Writer, Game Pack Architect, Prompt Engineer, Backend Agent |
| `backend/app/prompts/narrative_lenses/Lens-Rick.md` | Provides the narrative lens prompt for Lens-Rick. | Story Writer, Game Pack Architect, Prompt Engineer, Backend Agent |
| `backend/app/prompts/narrative_lenses/Lens-Sam.md` | Provides the narrative lens prompt for Lens-Sam. | Story Writer, Game Pack Architect, Prompt Engineer, Backend Agent |
| `backend/app/prompts/narrative_lenses/Lens-Tammey.md` | Provides the narrative lens prompt for Lens-Tammey. | Story Writer, Game Pack Architect, Prompt Engineer, Backend Agent |
| `backend/app/prompts/narrative_lenses/Lens-Tom.md` | Provides the narrative lens prompt for Lens-Tom. | Story Writer, Game Pack Architect, Prompt Engineer, Backend Agent |
| `backend/app/prompts/players/Player-Annie.md` | Provides the creative and behavioral prompt profile for Player-Annie. | Story Writer, Game Pack Architect, Prompt Engineer, Backend Agent |
| `backend/app/prompts/players/Player-Beau.md` | Provides the creative and behavioral prompt profile for Player-Beau. | Story Writer, Game Pack Architect, Prompt Engineer, Backend Agent |
| `backend/app/prompts/players/Player-Jannet.md` | Provides the creative and behavioral prompt profile for Player-Jannet. | Story Writer, Game Pack Architect, Prompt Engineer, Backend Agent |
| `backend/app/prompts/players/Player-Joe.md` | Provides the creative and behavioral prompt profile for Player-Joe. | Story Writer, Game Pack Architect, Prompt Engineer, Backend Agent |
| `backend/app/prompts/players/Player-Rick.md` | Provides the creative and behavioral prompt profile for Player-Rick. | Story Writer, Game Pack Architect, Prompt Engineer, Backend Agent |
| `backend/app/prompts/players/Player-Sam.md` | Provides the creative and behavioral prompt profile for Player-Sam. | Story Writer, Game Pack Architect, Prompt Engineer, Backend Agent |
| `backend/app/prompts/players/Player-Tammey.md` | Provides the creative and behavioral prompt profile for Player-Tammey. | Story Writer, Game Pack Architect, Prompt Engineer, Backend Agent |
| `backend/app/prompts/players/Player-Tom.md` | Provides the creative and behavioral prompt profile for Player-Tom. | Story Writer, Game Pack Architect, Prompt Engineer, Backend Agent |
| `backend/app/prompts/system/image_agent.md` | Provides the system prompt text for image_agent. | Story Writer, Game Pack Architect, Prompt Engineer, Backend Agent |
| `backend/app/prompts/system/narrative_base.md` | Provides the system prompt text for narrative_base. | Story Writer, Game Pack Architect, Prompt Engineer, Backend Agent |
| `backend/app/prompts/system/opposition_agent.md` | Provides the system prompt text for opposition_agent. | Story Writer, Game Pack Architect, Prompt Engineer, Backend Agent |
| `backend/app/prompts/system/player_base.md` | Provides the system prompt text for player_base. | Story Writer, Game Pack Architect, Prompt Engineer, Backend Agent |
| `backend/app/prompts/system/summary_agent.md` | Provides the system prompt text for summary_agent. | Story Writer, Game Pack Architect, Prompt Engineer, Backend Agent |
| `backend/app/prompts/system/valaska_setting.md` | Provides the system prompt text for valaska_setting. | Story Writer, Game Pack Architect, Prompt Engineer, Backend Agent |
| `backend/app/prompts/system/world_lock_agent.md` | Provides the system prompt text for world_lock_agent. | Story Writer, Game Pack Architect, Prompt Engineer, Backend Agent |
| `backend/app/schemas.py` | Defines backend API request and response schemas. | Backend Agent, Game Pack Architect |
| `backend/app/services.py` | Coordinates core game services including session flow, prompts, combat, objectives, travel, items, and game-over state. | Backend Agent, Game Pack Architect |
| `backend/Dockerfile` | Builds the backend Docker image. | Backend Agent, DevOps Agent |
| `backend/migrations/001_init.sql` | Defines the initial database schema for sessions, events, memory, narratives, and artifacts. | Backend Agent, DevOps Agent |
| `backend/requirements.txt` | Lists backend Python dependencies. | Backend Agent, DevOps Agent |
| `backend/tests/test_mvp.py` | Tests MVP backend flows, combat mechanics, content validation, and modularization regressions. | Tester Agent, Backend Agent |
| `CHANGELOG.md` | Records notable project changes over time. | Conductor Agent, Tester Agent |
| `docker-compose.yml` | Defines the local Docker stack for the backend, frontend, and database services. | DevOps Agent, Backend Agent, Frontend Agent |
| `docs/audio/noncombat-encounter-notices.zip` | Archives the noncombat encounter notice audio bundle. | Story Writer, Asset Coordinator, Music/Sound Agent, Voice/Dialog Agent |
| `docs/audio/noncombat-encounter-notices/east-marsh-raid-loc-1-blackwater-approach.mp3` | Stores the east-marsh-raid-loc-1-blackwater-approach noncombat encounter notice audio. | Story Writer, Asset Coordinator, Music/Sound Agent, Voice/Dialog Agent |
| `docs/audio/noncombat-encounter-notices/east-marsh-raid-loc-2-watcher-s-rise.mp3` | Stores the east-marsh-raid-loc-2-watcher-s-rise noncombat encounter notice audio. | Story Writer, Asset Coordinator, Music/Sound Agent, Voice/Dialog Agent |
| `docs/audio/noncombat-encounter-notices/east-marsh-raid-loc-3-outer-camp-ring.mp3` | Stores the east-marsh-raid-loc-3-outer-camp-ring noncombat encounter notice audio. | Story Writer, Asset Coordinator, Music/Sound Agent, Voice/Dialog Agent |
| `docs/audio/noncombat-encounter-notices/east-marsh-raid-loc-4-supply-cache-pit.mp3` | Stores the east-marsh-raid-loc-4-supply-cache-pit noncombat encounter notice audio. | Story Writer, Asset Coordinator, Music/Sound Agent, Voice/Dialog Agent |
| `docs/audio/noncombat-encounter-notices/east-marsh-raid-loc-6-fog-choked-escape-channel.mp3` | Stores the east-marsh-raid-loc-6-fog-choked-escape-channel noncombat encounter notice audio. | Story Writer, Asset Coordinator, Music/Sound Agent, Voice/Dialog Agent |
| `docs/audio/noncombat-encounter-notices/endless-glacier-undead-loc-1-everflame-abbey.mp3` | Stores the endless-glacier-undead-loc-1-everflame-abbey noncombat encounter notice audio. | Story Writer, Asset Coordinator, Music/Sound Agent, Voice/Dialog Agent |
| `docs/audio/noncombat-encounter-notices/icebane-castle-loc-3-rolling-stone-boulders.mp3` | Stores the icebane-castle-loc-3-rolling-stone-boulders noncombat encounter notice audio. | Story Writer, Asset Coordinator, Music/Sound Agent, Voice/Dialog Agent |
| `docs/audio/noncombat-encounter-notices/MANIFEST.json` | Indexes generated noncombat encounter notice audio files. | Story Writer, Asset Coordinator, Music/Sound Agent, Voice/Dialog Agent |
| `docs/audio/noncombat-encounter-notices/old-people-barrow-loc-1-rolling-stone-boulders.mp3` | Stores the old-people-barrow-loc-1-rolling-stone-boulders noncombat encounter notice audio. | Story Writer, Asset Coordinator, Music/Sound Agent, Voice/Dialog Agent |
| `docs/audio/noncombat-encounter-notices/old-people-barrow-loc-4-puzzle-door.mp3` | Stores the old-people-barrow-loc-4-puzzle-door noncombat encounter notice audio. | Story Writer, Asset Coordinator, Music/Sound Agent, Voice/Dialog Agent |
| `docs/audio/noncombat-encounter-notices/old-people-barrow-loc-6-steep-cliffside.mp3` | Stores the old-people-barrow-loc-6-steep-cliffside noncombat encounter notice audio. | Story Writer, Asset Coordinator, Music/Sound Agent, Voice/Dialog Agent |
| `docs/audio/noncombat-encounter-notices/REVIEW.txt` | Records review notes for noncombat encounter notice audio. | Story Writer, Asset Coordinator, Music/Sound Agent, Voice/Dialog Agent |
| `docs/audio/noncombat-encounter-notices/telas-wagons-loc-1-mud-stuck-wagon.mp3` | Stores the telas-wagons-loc-1-mud-stuck-wagon noncombat encounter notice audio. | Story Writer, Asset Coordinator, Music/Sound Agent, Voice/Dialog Agent |
| `docs/audio/noncombat-encounter-notices/telas-wagons-loc-6-glockstead-approach.mp3` | Stores the telas-wagons-loc-6-glockstead-approach noncombat encounter notice audio. | Story Writer, Asset Coordinator, Music/Sound Agent, Voice/Dialog Agent |
| `docs/audio/valaska-intro.mp3` | Stores the Valaska intro narration audio. | Story Writer, Asset Coordinator, Music/Sound Agent, Voice/Dialog Agent |
| `docs/audio/victory-songs/collecting-taxes-victory.mp3` | Stores the collecting-taxes-victory victory song audio. | Story Writer, Asset Coordinator, Music/Sound Agent, Voice/Dialog Agent |
| `docs/audio/victory-songs/east-marsh-raid-victory.mp3` | Stores the east-marsh-raid-victory victory song audio. | Story Writer, Asset Coordinator, Music/Sound Agent, Voice/Dialog Agent |
| `docs/audio/victory-songs/endless-glacier-undead-victory.mp3` | Stores the endless-glacier-undead-victory victory song audio. | Story Writer, Asset Coordinator, Music/Sound Agent, Voice/Dialog Agent |
| `docs/audio/victory-songs/icebane-castle-victory.mp3` | Stores the icebane-castle-victory victory song audio. | Story Writer, Asset Coordinator, Music/Sound Agent, Voice/Dialog Agent |
| `docs/audio/victory-songs/old-people-barrow-victory.mp3` | Stores the old-people-barrow-victory victory song audio. | Story Writer, Asset Coordinator, Music/Sound Agent, Voice/Dialog Agent |
| `docs/audio/victory-songs/telas-wagons-victory.mp3` | Stores the telas-wagons-victory victory song audio. | Story Writer, Asset Coordinator, Music/Sound Agent, Voice/Dialog Agent |
| `docs/images/Adventure-collecting-taxes.jpg` | Stores the Adventure-collecting-taxes adventure selection artwork. | Story Writer, Asset Coordinator, Image Agent |
| `docs/images/Adventure-east-marsh-raid.png` | Stores the Adventure-east-marsh-raid adventure selection artwork. | Story Writer, Asset Coordinator, Image Agent |
| `docs/images/Adventure-endless-glacier-undead.png` | Stores the Adventure-endless-glacier-undead adventure selection artwork. | Story Writer, Asset Coordinator, Image Agent |
| `docs/images/Adventure-icebane-castle.png` | Stores the Adventure-icebane-castle adventure selection artwork. | Story Writer, Asset Coordinator, Image Agent |
| `docs/images/Adventure-old-people-barrow.png` | Stores the Adventure-old-people-barrow adventure selection artwork. | Story Writer, Asset Coordinator, Image Agent |
| `docs/images/Adventure-selection.png` | Stores the Adventure-selection adventure selection artwork. | Story Writer, Asset Coordinator, Image Agent |
| `docs/images/Adventure-telas-wagons.jpg` | Stores the Adventure-telas-wagons adventure selection artwork. | Story Writer, Asset Coordinator, Image Agent |
| `docs/images/Annie-barbarian.jpg` | Stores the Annie-barbarian visual asset used by the game pack. | Story Writer, Asset Coordinator, Image Agent |
| `docs/images/Annie-classes.png` | Stores the Annie-classes class overview image. | Story Writer, Asset Coordinator, Image Agent |
| `docs/images/Annie-cleric.jpg` | Stores the Annie-cleric visual asset used by the game pack. | Story Writer, Asset Coordinator, Image Agent |
| `docs/images/Annie-druid.jpg` | Stores the Annie-druid visual asset used by the game pack. | Story Writer, Asset Coordinator, Image Agent |
| `docs/images/Annie-fighter.jpg` | Stores the Annie-fighter visual asset used by the game pack. | Story Writer, Asset Coordinator, Image Agent |
| `docs/images/Annie-paladin.jpg` | Stores the Annie-paladin visual asset used by the game pack. | Story Writer, Asset Coordinator, Image Agent |
| `docs/images/Annie-ranger.jpg` | Stores the Annie-ranger visual asset used by the game pack. | Story Writer, Asset Coordinator, Image Agent |
| `docs/images/Annie-rogue.jpg` | Stores the Annie-rogue visual asset used by the game pack. | Story Writer, Asset Coordinator, Image Agent |
| `docs/images/Annie-wizard.jpg` | Stores the Annie-wizard visual asset used by the game pack. | Story Writer, Asset Coordinator, Image Agent |
| `docs/images/Beau-barbarian.jpg` | Stores the Beau-barbarian visual asset used by the game pack. | Story Writer, Asset Coordinator, Image Agent |
| `docs/images/Beau-classes.png` | Stores the Beau-classes class overview image. | Story Writer, Asset Coordinator, Image Agent |
| `docs/images/Beau-cleric.jpg` | Stores the Beau-cleric visual asset used by the game pack. | Story Writer, Asset Coordinator, Image Agent |
| `docs/images/Beau-druid.jpg` | Stores the Beau-druid visual asset used by the game pack. | Story Writer, Asset Coordinator, Image Agent |
| `docs/images/Beau-fighter.jpg` | Stores the Beau-fighter visual asset used by the game pack. | Story Writer, Asset Coordinator, Image Agent |
| `docs/images/Beau-paladin.jpg` | Stores the Beau-paladin visual asset used by the game pack. | Story Writer, Asset Coordinator, Image Agent |
| `docs/images/Beau-ranger.jpg` | Stores the Beau-ranger visual asset used by the game pack. | Story Writer, Asset Coordinator, Image Agent |
| `docs/images/Beau-rogue.jpg` | Stores the Beau-rogue visual asset used by the game pack. | Story Writer, Asset Coordinator, Image Agent |
| `docs/images/Beau-wizard.jpg` | Stores the Beau-wizard visual asset used by the game pack. | Story Writer, Asset Coordinator, Image Agent |
| `docs/images/default-image.jpg` | Stores the default-image visual asset used by the game pack. | Story Writer, Asset Coordinator, Image Agent |
| `docs/images/Encounter-Everflame Abbey-NPC.webp` | Stores the Encounter-Everflame Abbey-NPC visual asset used by the game pack. | Story Writer, Asset Coordinator, Image Agent |
| `docs/images/Encounter-The Fog-Choked Escape Channel-Hazard.webp` | Stores the Encounter-The Fog-Choked Escape Channel-Hazard visual asset used by the game pack. | Story Writer, Asset Coordinator, Image Agent |
| `docs/images/Encounter-The Fractured Escape Tunnel-Hazard.webp` | Stores the Encounter-The Fractured Escape Tunnel-Hazard visual asset used by the game pack. | Story Writer, Asset Coordinator, Image Agent |
| `docs/images/Encounter-The Frost-Cleft Entrance-TRAP.webp` | Stores the Encounter-The Frost-Cleft Entrance-TRAP visual asset used by the game pack. | Story Writer, Asset Coordinator, Image Agent |
| `docs/images/Encounter-The Western Tundra Stretch-Hazard.webp` | Stores the Encounter-The Western Tundra Stretch-Hazard visual asset used by the game pack. | Story Writer, Asset Coordinator, Image Agent |
| `docs/images/Encounter-The-Collapsed-Barracks-TRAP.webp` | Stores the Encounter-The-Collapsed-Barracks-TRAP visual asset used by the game pack. | Story Writer, Asset Coordinator, Image Agent |
| `docs/images/Jannet-Barbarian.jpg` | Stores the Jannet-Barbarian visual asset used by the game pack. | Story Writer, Asset Coordinator, Image Agent |
| `docs/images/Jannet-classes.png` | Stores the Jannet-classes class overview image. | Story Writer, Asset Coordinator, Image Agent |
| `docs/images/Jannet-Cleric.jpg` | Stores the Jannet-Cleric visual asset used by the game pack. | Story Writer, Asset Coordinator, Image Agent |
| `docs/images/Jannet-druid.jpg` | Stores the Jannet-druid visual asset used by the game pack. | Story Writer, Asset Coordinator, Image Agent |
| `docs/images/Jannet-Fighter.jpg` | Stores the Jannet-Fighter visual asset used by the game pack. | Story Writer, Asset Coordinator, Image Agent |
| `docs/images/Jannet-Paladin.jpg` | Stores the Jannet-Paladin visual asset used by the game pack. | Story Writer, Asset Coordinator, Image Agent |
| `docs/images/Jannet-ranger.jpg` | Stores the Jannet-ranger visual asset used by the game pack. | Story Writer, Asset Coordinator, Image Agent |
| `docs/images/Jannet-rogue.jpg` | Stores the Jannet-rogue visual asset used by the game pack. | Story Writer, Asset Coordinator, Image Agent |
| `docs/images/Jannet-Wizard.jpg` | Stores the Jannet-Wizard visual asset used by the game pack. | Story Writer, Asset Coordinator, Image Agent |
| `docs/images/Joe-barbarian.jpg` | Stores the Joe-barbarian visual asset used by the game pack. | Story Writer, Asset Coordinator, Image Agent |
| `docs/images/Joe-classes.png` | Stores the Joe-classes class overview image. | Story Writer, Asset Coordinator, Image Agent |
| `docs/images/Joe-cleric.jpg` | Stores the Joe-cleric visual asset used by the game pack. | Story Writer, Asset Coordinator, Image Agent |
| `docs/images/Joe-druid.jpg` | Stores the Joe-druid visual asset used by the game pack. | Story Writer, Asset Coordinator, Image Agent |
| `docs/images/Joe-fighter.jpg` | Stores the Joe-fighter visual asset used by the game pack. | Story Writer, Asset Coordinator, Image Agent |
| `docs/images/Joe-paladin.jpg` | Stores the Joe-paladin visual asset used by the game pack. | Story Writer, Asset Coordinator, Image Agent |
| `docs/images/Joe-ranger.jpg` | Stores the Joe-ranger visual asset used by the game pack. | Story Writer, Asset Coordinator, Image Agent |
| `docs/images/Joe-rogue.jpg` | Stores the Joe-rogue visual asset used by the game pack. | Story Writer, Asset Coordinator, Image Agent |
| `docs/images/Joe-wizard.jpg` | Stores the Joe-wizard visual asset used by the game pack. | Story Writer, Asset Coordinator, Image Agent |
| `docs/images/Location-antlers-rest-inn.webp` | Stores the Location-antlers-rest-inn location artwork used by map and encounter views. | Story Writer, Asset Coordinator, Image Agent |
| `docs/images/Location-endgame-antlers-rest-inn.webp` | Stores the Location-endgame-antlers-rest-inn location artwork used by map and encounter views. | Story Writer, Asset Coordinator, Image Agent |
| `docs/images/Location-everflame-abbey.webp` | Stores the Location-everflame-abbey location artwork used by map and encounter views. | Story Writer, Asset Coordinator, Image Agent |
| `docs/images/Location-narrow-bridge-over-the-silverrun.webp` | Stores the Location-narrow-bridge-over-the-silverrun location artwork used by map and encounter views. | Story Writer, Asset Coordinator, Image Agent |
| `docs/images/Location-silverrun-crossing.webp` | Stores the Location-silverrun-crossing location artwork used by map and encounter views. | Story Writer, Asset Coordinator, Image Agent |
| `docs/images/Location-the-ancestral-gallery.webp` | Stores the Location-the-ancestral-gallery location artwork used by map and encounter views. | Story Writer, Asset Coordinator, Image Agent |
| `docs/images/Location-the-barrow-approach.webp` | Stores the Location-the-barrow-approach location artwork used by map and encounter views. | Story Writer, Asset Coordinator, Image Agent |
| `docs/images/Location-the-black-ice-scar.webp` | Stores the Location-the-black-ice-scar location artwork used by map and encounter views. | Story Writer, Asset Coordinator, Image Agent |
| `docs/images/Location-the-blackwater-approach.webp` | Stores the Location-the-blackwater-approach location artwork used by map and encounter views. | Story Writer, Asset Coordinator, Image Agent |
| `docs/images/Location-the-burial-drift.webp` | Stores the Location-the-burial-drift location artwork used by map and encounter views. | Story Writer, Asset Coordinator, Image Agent |
| `docs/images/Location-the-burial-vault.webp` | Stores the Location-the-burial-vault location artwork used by map and encounter views. | Story Writer, Asset Coordinator, Image Agent |
| `docs/images/Location-the-burned-out-waystation.webp` | Stores the Location-the-burned-out-waystation location artwork used by map and encounter views. | Story Writer, Asset Coordinator, Image Agent |
| `docs/images/Location-the-collapsed-barracks.webp` | Stores the Location-the-collapsed-barracks location artwork used by map and encounter views. | Story Writer, Asset Coordinator, Image Agent |
| `docs/images/Location-the-fog-choked-escape-channel.webp` | Stores the Location-the-fog-choked-escape-channel location artwork used by map and encounter views. | Story Writer, Asset Coordinator, Image Agent |
| `docs/images/Location-the-fog-choked-low-road.webp` | Stores the Location-the-fog-choked-low-road location artwork used by map and encounter views. | Story Writer, Asset Coordinator, Image Agent |
| `docs/images/Location-the-fractured-escape-tunnel.webp` | Stores the Location-the-fractured-escape-tunnel location artwork used by map and encounter views. | Story Writer, Asset Coordinator, Image Agent |
| `docs/images/Location-the-fractured-throne-room.webp` | Stores the Location-the-fractured-throne-room location artwork used by map and encounter views. | Story Writer, Asset Coordinator, Image Agent |
| `docs/images/Location-the-frost-choked-hall.webp` | Stores the Location-the-frost-choked-hall location artwork used by map and encounter views. | Story Writer, Asset Coordinator, Image Agent |
| `docs/images/Location-the-frost-cleft-entrance.webp` | Stores the Location-the-frost-cleft-entrance location artwork used by map and encounter views. | Story Writer, Asset Coordinator, Image Agent |
| `docs/images/Location-the-frozen-pilgrims-path.webp` | Stores the Location-the-frozen-pilgrims-path location artwork used by map and encounter views. | Story Writer, Asset Coordinator, Image Agent |
| `docs/images/Location-the-glockstead-approach.webp` | Stores the Location-the-glockstead-approach location artwork used by map and encounter views. | Story Writer, Asset Coordinator, Image Agent |
| `docs/images/Location-the-hall-of-echoes.webp` | Stores the Location-the-hall-of-echoes location artwork used by map and encounter views. | Story Writer, Asset Coordinator, Image Agent |
| `docs/images/Location-the-heart-of-the-glacier.webp` | Stores the Location-the-heart-of-the-glacier location artwork used by map and encounter views. | Story Writer, Asset Coordinator, Image Agent |
| `docs/images/Location-the-high-ridge-overlook.webp` | Stores the Location-the-high-ridge-overlook location artwork used by map and encounter views. | Story Writer, Asset Coordinator, Image Agent |
| `docs/images/Location-the-melted-armory-vault.webp` | Stores the Location-the-melted-armory-vault location artwork used by map and encounter views. | Story Writer, Asset Coordinator, Image Agent |
| `docs/images/Location-the-narrow-pass.webp` | Stores the Location-the-narrow-pass location artwork used by map and encounter views. | Story Writer, Asset Coordinator, Image Agent |
| `docs/images/Location-the-open-road-near-flames-rest-inn.webp` | Stores the Location-the-open-road-near-flames-rest-inn location artwork used by map and encounter views. | Story Writer, Asset Coordinator, Image Agent |
| `docs/images/Location-the-outer-camp-ring.webp` | Stores the Location-the-outer-camp-ring location artwork used by map and encounter views. | Story Writer, Asset Coordinator, Image Agent |
| `docs/images/Location-the-sealed-door.webp` | Stores the Location-the-sealed-door location artwork used by map and encounter views. | Story Writer, Asset Coordinator, Image Agent |
| `docs/images/Location-the-shattered-ice-field.webp` | Stores the Location-the-shattered-ice-field location artwork used by map and encounter views. | Story Writer, Asset Coordinator, Image Agent |
| `docs/images/Location-the-subterranean-reliquary.webp` | Stores the Location-the-subterranean-reliquary location artwork used by map and encounter views. | Story Writer, Asset Coordinator, Image Agent |
| `docs/images/Location-the-supply-cache-pit.webp` | Stores the Location-the-supply-cache-pit location artwork used by map and encounter views. | Story Writer, Asset Coordinator, Image Agent |
| `docs/images/Location-the-thaw-gate.webp` | Stores the Location-the-thaw-gate location artwork used by map and encounter views. | Story Writer, Asset Coordinator, Image Agent |
| `docs/images/Location-the-wagon-bottleneck-at-kings-valley-pass.webp` | Stores the Location-the-wagon-bottleneck-at-kings-valley-pass location artwork used by map and encounter views. | Story Writer, Asset Coordinator, Image Agent |
| `docs/images/Location-the-war-leaders-tent.webp` | Stores the Location-the-war-leaders-tent location artwork used by map and encounter views. | Story Writer, Asset Coordinator, Image Agent |
| `docs/images/Location-the-watchers-rise.webp` | Stores the Location-the-watchers-rise location artwork used by map and encounter views. | Story Writer, Asset Coordinator, Image Agent |
| `docs/images/Location-the-western-tundra-stretch.webp` | Stores the Location-the-western-tundra-stretch location artwork used by map and encounter views. | Story Writer, Asset Coordinator, Image Agent |
| `docs/images/Location-the-whiteout-flats.webp` | Stores the Location-the-whiteout-flats location artwork used by map and encounter views. | Story Writer, Asset Coordinator, Image Agent |
| `docs/images/Monster-Animated Armor.webp` | Stores the Monster-Animated Armor monster artwork used by encounters. | Story Writer, Asset Coordinator, Image Agent |
| `docs/images/Monster-Bandit Captain.webp` | Stores the Monster-Bandit Captain monster artwork used by encounters. | Story Writer, Asset Coordinator, Image Agent |
| `docs/images/Monster-Bandit.webp` | Stores the Monster-Bandit monster artwork used by encounters. | Story Writer, Asset Coordinator, Image Agent |
| `docs/images/Monster-Berserker.webp` | Stores the Monster-Berserker monster artwork used by encounters. | Story Writer, Asset Coordinator, Image Agent |
| `docs/images/Monster-Ghast.webp` | Stores the Monster-Ghast monster artwork used by encounters. | Story Writer, Asset Coordinator, Image Agent |
| `docs/images/Monster-Giant Boar.webp` | Stores the Monster-Giant Boar monster artwork used by encounters. | Story Writer, Asset Coordinator, Image Agent |
| `docs/images/Monster-Gibbering Mouther.webp` | Stores the Monster-Gibbering Mouther monster artwork used by encounters. | Story Writer, Asset Coordinator, Image Agent |
| `docs/images/Monster-Gray Ooze.webp` | Stores the Monster-Gray Ooze monster artwork used by encounters. | Story Writer, Asset Coordinator, Image Agent |
| `docs/images/Monster-Guard.webp` | Stores the Monster-Guard monster artwork used by encounters. | Story Writer, Asset Coordinator, Image Agent |
| `docs/images/Monster-Mastiff.webp` | Stores the Monster-Mastiff monster artwork used by encounters. | Story Writer, Asset Coordinator, Image Agent |
| `docs/images/Monster-Minotaur Skeleton.webp` | Stores the Monster-Minotaur Skeleton monster artwork used by encounters. | Story Writer, Asset Coordinator, Image Agent |
| `docs/images/Monster-Orc.webp` | Stores the Monster-Orc monster artwork used by encounters. | Story Writer, Asset Coordinator, Image Agent |
| `docs/images/Monster-Priest.webp` | Stores the Monster-Priest monster artwork used by encounters. | Story Writer, Asset Coordinator, Image Agent |
| `docs/images/Monster-Scout.webp` | Stores the Monster-Scout monster artwork used by encounters. | Story Writer, Asset Coordinator, Image Agent |
| `docs/images/Monster-Shadow.webp` | Stores the Monster-Shadow monster artwork used by encounters. | Story Writer, Asset Coordinator, Image Agent |
| `docs/images/Monster-Skeleton.webp` | Stores the Monster-Skeleton monster artwork used by encounters. | Story Writer, Asset Coordinator, Image Agent |
| `docs/images/Monster-Swarm of Insects.webp` | Stores the Monster-Swarm of Insects monster artwork used by encounters. | Story Writer, Asset Coordinator, Image Agent |
| `docs/images/Monster-Thug.webp` | Stores the Monster-Thug monster artwork used by encounters. | Story Writer, Asset Coordinator, Image Agent |
| `docs/images/Monster-Warhorse Skeleton.webp` | Stores the Monster-Warhorse Skeleton monster artwork used by encounters. | Story Writer, Asset Coordinator, Image Agent |
| `docs/images/Monster-Warhorse.webp` | Stores the Monster-Warhorse monster artwork used by encounters. | Story Writer, Asset Coordinator, Image Agent |
| `docs/images/Monster-Zombie.webp` | Stores the Monster-Zombie monster artwork used by encounters. | Story Writer, Asset Coordinator, Image Agent |
| `docs/images/Orignal Player images.png` | Stores the Orignal Player images visual asset used by the game pack. | Story Writer, Asset Coordinator, Image Agent |
| `docs/images/Player-Annie.jpg` | Stores the Player-Annie base player portrait. | Story Writer, Asset Coordinator, Image Agent |
| `docs/images/Player-Beau.jpg` | Stores the Player-Beau base player portrait. | Story Writer, Asset Coordinator, Image Agent |
| `docs/images/Player-Jannet.jpg` | Stores the Player-Jannet base player portrait. | Story Writer, Asset Coordinator, Image Agent |
| `docs/images/Player-Joe.jpg` | Stores the Player-Joe base player portrait. | Story Writer, Asset Coordinator, Image Agent |
| `docs/images/Player-Rick.jpg` | Stores the Player-Rick base player portrait. | Story Writer, Asset Coordinator, Image Agent |
| `docs/images/Player-Sam.jpg` | Stores the Player-Sam base player portrait. | Story Writer, Asset Coordinator, Image Agent |
| `docs/images/Player-Tammey.jpg` | Stores the Player-Tammey base player portrait. | Story Writer, Asset Coordinator, Image Agent |
| `docs/images/Player-Tom.jpg` | Stores the Player-Tom base player portrait. | Story Writer, Asset Coordinator, Image Agent |
| `docs/images/Preview-Adventure1.webp` | Stores the Preview-Adventure1 adventure preview image for the preparation map. | Story Writer, Asset Coordinator, Image Agent |
| `docs/images/Preview-Adventure2.webp` | Stores the Preview-Adventure2 adventure preview image for the preparation map. | Story Writer, Asset Coordinator, Image Agent |
| `docs/images/Preview-Adventure3.webp` | Stores the Preview-Adventure3 adventure preview image for the preparation map. | Story Writer, Asset Coordinator, Image Agent |
| `docs/images/Preview-Adventure4.webp` | Stores the Preview-Adventure4 adventure preview image for the preparation map. | Story Writer, Asset Coordinator, Image Agent |
| `docs/images/Preview-Adventure5.webp` | Stores the Preview-Adventure5 adventure preview image for the preparation map. | Story Writer, Asset Coordinator, Image Agent |
| `docs/images/Preview-Adventure6.webp` | Stores the Preview-Adventure6 adventure preview image for the preparation map. | Story Writer, Asset Coordinator, Image Agent |
| `docs/images/Rick-barbarian.jpg` | Stores the Rick-barbarian visual asset used by the game pack. | Story Writer, Asset Coordinator, Image Agent |
| `docs/images/Rick-classes.png` | Stores the Rick-classes class overview image. | Story Writer, Asset Coordinator, Image Agent |
| `docs/images/Rick-cleric.jpg` | Stores the Rick-cleric visual asset used by the game pack. | Story Writer, Asset Coordinator, Image Agent |
| `docs/images/Rick-druid.jpg` | Stores the Rick-druid visual asset used by the game pack. | Story Writer, Asset Coordinator, Image Agent |
| `docs/images/Rick-fighter.jpg` | Stores the Rick-fighter visual asset used by the game pack. | Story Writer, Asset Coordinator, Image Agent |
| `docs/images/Rick-paladin.jpg` | Stores the Rick-paladin visual asset used by the game pack. | Story Writer, Asset Coordinator, Image Agent |
| `docs/images/Rick-ranger.jpg` | Stores the Rick-ranger visual asset used by the game pack. | Story Writer, Asset Coordinator, Image Agent |
| `docs/images/Rick-rogue.jpg` | Stores the Rick-rogue visual asset used by the game pack. | Story Writer, Asset Coordinator, Image Agent |
| `docs/images/Rick-wizard.jpg` | Stores the Rick-wizard visual asset used by the game pack. | Story Writer, Asset Coordinator, Image Agent |
| `docs/images/Sam-barbarian.jpg` | Stores the Sam-barbarian visual asset used by the game pack. | Story Writer, Asset Coordinator, Image Agent |
| `docs/images/Sam-classes.png` | Stores the Sam-classes class overview image. | Story Writer, Asset Coordinator, Image Agent |
| `docs/images/Sam-cleric.jpg` | Stores the Sam-cleric visual asset used by the game pack. | Story Writer, Asset Coordinator, Image Agent |
| `docs/images/Sam-druid.jpg` | Stores the Sam-druid visual asset used by the game pack. | Story Writer, Asset Coordinator, Image Agent |
| `docs/images/Sam-fighter.jpg` | Stores the Sam-fighter visual asset used by the game pack. | Story Writer, Asset Coordinator, Image Agent |
| `docs/images/Sam-paladin.jpg` | Stores the Sam-paladin visual asset used by the game pack. | Story Writer, Asset Coordinator, Image Agent |
| `docs/images/Sam-ranger.jpg` | Stores the Sam-ranger visual asset used by the game pack. | Story Writer, Asset Coordinator, Image Agent |
| `docs/images/Sam-rogue.jpg` | Stores the Sam-rogue visual asset used by the game pack. | Story Writer, Asset Coordinator, Image Agent |
| `docs/images/Sam-wizard.jpg` | Stores the Sam-wizard visual asset used by the game pack. | Story Writer, Asset Coordinator, Image Agent |
| `docs/images/Tammey-barbarian.jpg` | Stores the Tammey-barbarian visual asset used by the game pack. | Story Writer, Asset Coordinator, Image Agent |
| `docs/images/Tammey-classes.png` | Stores the Tammey-classes class overview image. | Story Writer, Asset Coordinator, Image Agent |
| `docs/images/Tammey-cleric.jpg` | Stores the Tammey-cleric visual asset used by the game pack. | Story Writer, Asset Coordinator, Image Agent |
| `docs/images/Tammey-druid.jpg` | Stores the Tammey-druid visual asset used by the game pack. | Story Writer, Asset Coordinator, Image Agent |
| `docs/images/Tammey-fighter.jpg` | Stores the Tammey-fighter visual asset used by the game pack. | Story Writer, Asset Coordinator, Image Agent |
| `docs/images/Tammey-paladin.jpg` | Stores the Tammey-paladin visual asset used by the game pack. | Story Writer, Asset Coordinator, Image Agent |
| `docs/images/Tammey-ranger.jpg` | Stores the Tammey-ranger visual asset used by the game pack. | Story Writer, Asset Coordinator, Image Agent |
| `docs/images/Tammey-rogue.jpg` | Stores the Tammey-rogue visual asset used by the game pack. | Story Writer, Asset Coordinator, Image Agent |
| `docs/images/Tammey-wizard.jpg` | Stores the Tammey-wizard visual asset used by the game pack. | Story Writer, Asset Coordinator, Image Agent |
| `docs/images/Tom-barbarian.jpg` | Stores the Tom-barbarian visual asset used by the game pack. | Story Writer, Asset Coordinator, Image Agent |
| `docs/images/Tom-Classes.png` | Stores the Tom-Classes class overview image. | Story Writer, Asset Coordinator, Image Agent |
| `docs/images/Tom-cleric.jpg` | Stores the Tom-cleric visual asset used by the game pack. | Story Writer, Asset Coordinator, Image Agent |
| `docs/images/Tom-druid.jpg` | Stores the Tom-druid visual asset used by the game pack. | Story Writer, Asset Coordinator, Image Agent |
| `docs/images/Tom-fighter.jpg` | Stores the Tom-fighter visual asset used by the game pack. | Story Writer, Asset Coordinator, Image Agent |
| `docs/images/Tom-paladin.jpg` | Stores the Tom-paladin visual asset used by the game pack. | Story Writer, Asset Coordinator, Image Agent |
| `docs/images/Tom-ranger.jpg` | Stores the Tom-ranger visual asset used by the game pack. | Story Writer, Asset Coordinator, Image Agent |
| `docs/images/Tom-rogue.jpg` | Stores the Tom-rogue visual asset used by the game pack. | Story Writer, Asset Coordinator, Image Agent |
| `docs/images/Tom-wizard.jpg` | Stores the Tom-wizard visual asset used by the game pack. | Story Writer, Asset Coordinator, Image Agent |
| `docs/images/Valaska-Map.png` | Stores the Valaska-Map visual asset used by the game pack. | Story Writer, Asset Coordinator, Image Agent |
| `docs/mk5_5/contracts/asset-manifest.md` | Documents the asset-manifest swarm handoff contract. | Conductor Agent, Story Writer, RPG Design Agent, Game Pack Architect |
| `docs/mk5_5/contracts/game-pack-spec.md` | Documents the game-pack-spec swarm handoff contract. | Conductor Agent, Story Writer, RPG Design Agent, Game Pack Architect |
| `docs/mk5_5/contracts/implementation-contract.md` | Documents the implementation-contract swarm handoff contract. | Conductor Agent, Story Writer, RPG Design Agent, Game Pack Architect |
| `docs/mk5_5/contracts/README.md` | Documents the README swarm handoff contract. | Conductor Agent, Story Writer, RPG Design Agent, Game Pack Architect |
| `docs/mk5_5/contracts/rpg-design-brief.md` | Documents the rpg-design-brief swarm handoff contract. | Conductor Agent, Story Writer, RPG Design Agent, Game Pack Architect |
| `docs/mk5_5/contracts/story-brief.md` | Documents the story-brief swarm handoff contract. | Conductor Agent, Story Writer, RPG Design Agent, Game Pack Architect |
| `docs/mk5_5/contracts/test-report.md` | Documents the test-report swarm handoff contract. | Conductor Agent, Story Writer, RPG Design Agent, Game Pack Architect |
| `docs/mk5_5/PROJECT_FILE_MAP.md` | Maps every current MK5.5 project file to its purpose and likely future swarm owner roles. | Conductor Agent, Game Pack Architect |
| `docs/music/Citadel of Rusted Banners (1).mp3` | Stores the Citadel of Rusted Banners (1) background music track. | Story Writer, Asset Coordinator, Music/Sound Agent, Voice/Dialog Agent |
| `docs/music/Citadel of Rusted Banners.mp3` | Stores the Citadel of Rusted Banners background music track. | Story Writer, Asset Coordinator, Music/Sound Agent, Voice/Dialog Agent |
| `docs/music/Cursed Village Menu (1).mp3` | Stores the Cursed Village Menu (1) background music track. | Story Writer, Asset Coordinator, Music/Sound Agent, Voice/Dialog Agent |
| `docs/music/Cursed Village Menu.mp3` | Stores the Cursed Village Menu background music track. | Story Writer, Asset Coordinator, Music/Sound Agent, Voice/Dialog Agent |
| `docs/music/Gallows of the Forgotten King.mp3` | Stores the Gallows of the Forgotten King background music track. | Story Writer, Asset Coordinator, Music/Sound Agent, Voice/Dialog Agent |
| `frontend/Dockerfile` | Configures the frontend Dockerfile project/build file. | Frontend Agent, DevOps Agent |
| `frontend/index.html` | Configures the frontend index.html project/build file. | Frontend Agent, DevOps Agent |
| `frontend/package.json` | Configures the frontend package.json project/build file. | Frontend Agent, DevOps Agent |
| `frontend/package-lock.json` | Configures the frontend package-lock.json project/build file. | Frontend Agent, DevOps Agent |
| `frontend/postcss.config.cjs` | Configures the frontend postcss.config.cjs project/build file. | Frontend Agent, DevOps Agent |
| `frontend/src/api.ts` | Provides the frontend API request helper and backend URL resolution. | Frontend Agent, Game Pack Architect |
| `frontend/src/App.tsx` | Coordinates the main React application state, tabs, session flow, and top-level UI wiring. | Frontend Agent, Game Pack Architect |
| `frontend/src/appTypes.ts` | Defines frontend TypeScript types matching backend API responses. | Frontend Agent, Game Pack Architect |
| `frontend/src/components/adventure/AdventureLog.tsx` | Renders transcript history, TTS controls, and narration playback state. | Frontend Agent, Game Pack Architect |
| `frontend/src/components/adventure/GmPromptPanel.tsx` | Renders GM prompt controls, agent selection, encounter controls, item use, and game-over modal. | Frontend Agent, Game Pack Architect |
| `frontend/src/components/adventure/LocationCell.tsx` | Renders world, adventure, and encounter maps with party/opposition combat visuals. | Frontend Agent, Game Pack Architect |
| `frontend/src/components/AdventureTab.tsx` | Renders the adventure play tab by composing location, log, and prompt panels. | Frontend Agent, Game Pack Architect |
| `frontend/src/components/FeedbackTab.tsx` | Renders the post-session feedback form and submission state. | Frontend Agent, Game Pack Architect |
| `frontend/src/components/PreparationTab.tsx` | Renders party setup, adventure selection, map previews, and preparation controls. | Frontend Agent, Game Pack Architect |
| `frontend/src/constants/audio.ts` | Defines generic frontend audio, TTS, and music playback constants. | Frontend Agent, DevOps Agent |
| `frontend/src/constants/onboarding.ts` | Defines onboarding guide step types and tutorial video metadata. | Frontend Agent, DevOps Agent |
| `frontend/src/gamePack/media.ts` | Provides frontend helpers for game-pack media URLs and encounter/victory audio lookup. | Game Pack Architect, Frontend Agent |
| `frontend/src/gamePack/uiManifest.ts` | Defines the frontend game-pack UI manifest type. | Game Pack Architect, Frontend Agent |
| `frontend/src/gamePack/valaskaManifest.ts` | Defines the active Valaska frontend UI manifest, audio, map pips, labels, and media mappings. | Game Pack Architect, Frontend Agent |
| `frontend/src/hooks/useAdventureActions.ts` | Implements the frontend useAdventureActions hook for session, audio, prompt, preparation, or adventure behavior. | Frontend Agent, Game Pack Architect |
| `frontend/src/hooks/useBackgroundMusic.ts` | Implements the frontend useBackgroundMusic hook for session, audio, prompt, preparation, or adventure behavior. | Frontend Agent, Game Pack Architect |
| `frontend/src/hooks/useCelebrationSong.ts` | Implements the frontend useCelebrationSong hook for session, audio, prompt, preparation, or adventure behavior. | Frontend Agent, Game Pack Architect |
| `frontend/src/hooks/useEncounterNoticeAudio.ts` | Implements the frontend useEncounterNoticeAudio hook for session, audio, prompt, preparation, or adventure behavior. | Frontend Agent, Game Pack Architect |
| `frontend/src/hooks/useEncounterSelection.ts` | Implements the frontend useEncounterSelection hook for session, audio, prompt, preparation, or adventure behavior. | Frontend Agent, Game Pack Architect |
| `frontend/src/hooks/useFeedbackActions.ts` | Implements the frontend useFeedbackActions hook for session, audio, prompt, preparation, or adventure behavior. | Frontend Agent, Game Pack Architect |
| `frontend/src/hooks/useIntroAudio.ts` | Implements the frontend useIntroAudio hook for session, audio, prompt, preparation, or adventure behavior. | Frontend Agent, Game Pack Architect |
| `frontend/src/hooks/usePartySetup.ts` | Implements the frontend usePartySetup hook for session, audio, prompt, preparation, or adventure behavior. | Frontend Agent, Game Pack Architect |
| `frontend/src/hooks/usePreparationActions.ts` | Implements the frontend usePreparationActions hook for session, audio, prompt, preparation, or adventure behavior. | Frontend Agent, Game Pack Architect |
| `frontend/src/hooks/usePromptFlow.ts` | Implements the frontend usePromptFlow hook for session, audio, prompt, preparation, or adventure behavior. | Frontend Agent, Game Pack Architect |
| `frontend/src/hooks/useSessionWorkspace.ts` | Implements the frontend useSessionWorkspace hook for session, audio, prompt, preparation, or adventure behavior. | Frontend Agent, Game Pack Architect |
| `frontend/src/hooks/useTtsPlayback.ts` | Implements the frontend useTtsPlayback hook for session, audio, prompt, preparation, or adventure behavior. | Frontend Agent, Game Pack Architect |
| `frontend/src/main.tsx` | Bootstraps the React application into the browser DOM. | Frontend Agent, Game Pack Architect |
| `frontend/src/sessionView.ts` | Derives frontend session view state such as active turn and location display. | Frontend Agent, Game Pack Architect |
| `frontend/src/styles.css` | Defines the visual styling for the Story Engine frontend. | Frontend Agent, Game Pack Architect |
| `frontend/tsconfig.json` | Configures the frontend tsconfig.json project/build file. | Frontend Agent, DevOps Agent |
| `frontend/vite.config.ts` | Configures the frontend vite.config.ts project/build file. | Frontend Agent, DevOps Agent |
| `MK2-Tab1 Ajustments (2).txt` | Stores the MK2-Tab1 Ajustments (2).txt planning, handoff, license, or project note document. | Conductor Agent, Tester Agent |
| `MK2-Tab2 Ajustments (2).txt` | Stores the MK2-Tab2 Ajustments (2).txt planning, handoff, license, or project note document. | Conductor Agent, Tester Agent |
| `MK2-Tab3 Ajustments (1).txt` | Stores the MK2-Tab3 Ajustments (1).txt planning, handoff, license, or project note document. | Conductor Agent, Tester Agent |
| `MK3_HANDOFF.md` | Stores the MK3_HANDOFF.md planning, handoff, license, or project note document. | Conductor Agent, Tester Agent |
| `MK4 Planning (1).txt` | Stores the MK4 Planning (1).txt planning, handoff, license, or project note document. | Conductor Agent, Tester Agent |
| `MK4_BOOTSTRAP.md` | Stores the MK4_BOOTSTRAP.md planning, handoff, license, or project note document. | Conductor Agent, Tester Agent |
| `MK5_5_IMPLEMENTATION_PLAN.md` | Tracks the phased MK5.5 modularization plan and current implementation status. | Conductor Agent, Tester Agent |
| `MK5_SYSTEMS_PLAN.md` | Stores the MK5_SYSTEMS_PLAN.md planning, handoff, license, or project note document. | Conductor Agent, Tester Agent |
| `More MK2 Ajustments (1).txt` | Stores the More MK2 Ajustments (1).txt planning, handoff, license, or project note document. | Conductor Agent, Tester Agent |
| `PROJECT_TESTING_LOG.txt` | Records manual playtest and smoke-test observations. | Conductor Agent, Tester Agent |
| `RAILWAY_DEPLOY.md` | Stores the RAILWAY_DEPLOY.md planning, handoff, license, or project note document. | Conductor Agent, Tester Agent |
| `README.md` | Explains the Story Engine project purpose, setup, and operating context. | Conductor Agent, Tester Agent |
| `shared/gamePack.ts` | Defines shared game-pack manifest and music cue types. | Game Pack Architect, Backend Agent, Frontend Agent |
| `shared/types.ts` | Defines shared cross-runtime type placeholders. | Game Pack Architect, Backend Agent, Frontend Agent |
| `story-engine-license.md` | Stores the story-engine-license.md planning, handoff, license, or project note document. | Conductor Agent, Tester Agent |
| `story-engine-prototype-SPEC (5).txt` | Stores the story-engine-prototype-SPEC (5).txt planning, handoff, license, or project note document. | Conductor Agent, Tester Agent |
| `tools/tts_studio.py` | Provides a local helper tool for experimenting with TTS generation. | Asset Coordinator, Voice/Dialog Agent, Backend Agent |
