# Story Engine Modularize

Story Engine Modularize is a base framework for building AI-agent-driven tabletop adventure apps. It is designed to be a reusable foundation that agent loops, swarms, or assisted coding workflows can extend into new game packs, settings, interfaces, mechanics, and media pipelines.

The current repository includes Valaska, a dark-fantasy reference implementation, but the long-term intent is broader: use the engine as a structured playground where specialized agents can create new versions of the app. A cyberpunk version is currently being explored as an experiment in proving that the framework can move beyond one fantasy content pack.

## Core Idea

Story Engine is not an AI GM replacement.

The human user remains the Game Master. AI agents play characters inside the world: party members, opposition, narrative helpers, and future support roles. The backend owns mechanical truth so model prose cannot silently rewrite HP, inventory, quest progress, combat state, travel gates, or reward state.

The framework is built around a simple principle:

- creative agents produce story, setting, tone, character, and encounter material
- RPG design agents define mechanics, balance, resources, and playable loops
- backend agents implement deterministic rules and validation
- frontend agents render usable play surfaces from structured state
- asset agents work from manifests instead of code internals
- tester agents report bugs, balance friction, and acceptance gaps

## Current Reference Pack: Valaska

Valaska is the included MK5 reference game pack. It contains six playable adventures, player archetypes, classes, monsters, maps, images, music, encounter notice audio, and victory songs.

The Valaska pack demonstrates:

- party setup with four AI player agents
- class assignment, HP, MP, resources, inventory, and class features
- location-based adventures with travel gates
- combat encounters, hazards, traps, searches, loot, and objectives
- backend-authoritative dice/action resolution
- frontend combat turn gating and event-driven animations
- TTS, music cues, encounter notices, and celebration songs

Valaska is not meant to be the only game. It is the working example that future packs can copy, replace, or use as a contract test.

## Modularization Goals

This branch is moving the original MK5 app toward clearer boundaries so future AI-assisted builds do not need to understand the whole application at once.

Important boundaries:

```text
backend/app/
  content/      Game-pack data, validation, registry, and Valaska content
  engine/       Deterministic mechanics: dice, combat, inventory, travel, hazards
  agents/       Prompt context, tool result handling, and LLM orchestration helpers
  generation/   Swarm handoff contracts for future generated game packs

frontend/src/
  components/   Preparation, adventure, feedback, map, log, and GM prompt panels
  hooks/        Session, prompt, audio, TTS, preparation, and adventure workflows
  gamePack/     Frontend game-pack UI manifest and media lookup
  constants/    Audio and onboarding constants

shared/
  gamePack.ts   Shared game-pack and UI manifest types
```

## Agent Handoff Contracts

The repository includes early MK5.5 contracts for multi-agent game creation:

- `StoryBrief`
- `RpgDesignBrief`
- `GamePackSpec`
- `ImplementationContract`
- `AssetManifest`
- `TestReport`

These live in `backend/app/generation/` and `docs/mk5_5/contracts/`. They are intended to let a conductor or swarm pipeline pass structured work between story, design, backend, frontend, asset, and testing agents.

The first prototype target is:

```text
User seed
  -> Conductor
  -> Story Writer
  -> RPG Design
  -> GamePackSpec
```

Full autonomous app generation is not the first step. The immediate goal is a reliable structured spec that can be validated and estimated.

## Backend-Authoritative Play Loop

The intended gameplay flow is:

1. The GM prompts an agent.
2. The agent requests uncertain mechanics through structured actions.
3. The backend rolls dice, applies rules, mutates state, and emits events.
4. The frontend displays events, animations, audio, and state changes.
5. The agent narrates only what the backend result supports.

This protects the game from model-invented hits, misses, healing, loot, objective completion, or travel progress.

## Technical Stack

- Frontend: React, TypeScript, Vite
- Backend: Python, FastAPI, SQLAlchemy
- Database: Postgres in Docker, SQLite for tests
- Local runtime: Docker Compose
- LLM integration: provider abstraction with OpenAI support and mock fallback
- Media: static image, music, audio, TTS, and generated celebration-song paths

## Local Setup

### Prerequisites

- Docker Desktop
- Windows with Linux containers enabled
- Python 3.11+ for local backend tests
- Node.js 20+ for local frontend builds
- OpenAI API key for live agent testing

### Environment

Create a local `.env` file in the project root.

Minimum configuration:

```env
OPENAI_API_KEY=your_openai_api_key_here
```

Optional overrides:

```env
LLM_PROVIDER=openai
LLM_EXTERNAL_ENABLED=true
OPENAI_BASE_URL=https://api.openai.com/v1
LLM_MODEL_CHARACTER=gpt-4o-mini
LLM_MODEL_SUMMARY=gpt-4o-mini
LLM_MODEL_NARRATIVE=gpt-4o
```

A template is included in `.env.example`.

### Start Locally With Docker

```powershell
docker compose up --build -d
```

Local URLs:

- Frontend: `http://localhost:5175`
- Backend: `http://localhost:8002`
- Backend health check: `http://localhost:8002/health`
- Postgres: `localhost:5434`

## Useful Checks

Run backend tests:

```powershell
$env:PYTHONPATH='backend'
python -m pytest backend/tests/test_mvp.py -q
```

Run the frontend build:

```powershell
cd frontend
npm run build
```

Run focused backend tests inside Docker:

```powershell
docker exec -e PYTHONPATH=/app story-engine-mk5-backend-1 pytest tests/test_mvp.py -q
```

## Current Development Priorities

- finish moving reusable mechanics out of `services.py`
- keep Valaska playable while modular boundaries improve
- make frontend UI depend more on game-pack manifests and less on hardcoded Valaska assumptions
- validate generated game-pack contracts with readable errors
- use the cyberpunk experiment to prove a second app can be built from the same framework
- preserve deterministic backend state as the source of truth

## Known Constraints

- `backend/app/services.py` is still large and acts as the main coordinator
- Valaska-specific assumptions remain in some backend and frontend call sites
- the game-pack contract layer is early and still being proven
- model behavior still needs strict backend guardrails
- response latency is mostly driven by LLM generation time
- some older planning files and reference assets remain in the repo

## License

This project is distributed under the Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License.

See:

- `story-engine-license.md`
- https://creativecommons.org/licenses/by-nc-sa/4.0/legalcode

Attribution reference:

`story-engine-prototype by Ramolis Systems (https://github.com/Ramolisdenneyous), licensed under CC BY-NC-SA 4.0`
