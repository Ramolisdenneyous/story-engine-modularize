# AssetManifest

Owner: RPG Maker Agent or Asset Coordinator

Consumers: Image Agent, Music Agent, Sound Agent, Voice Agent

Purpose: request concrete assets with prompts, target paths, statuses, and acceptance notes.

## Required Sections

- `pack_id`: pack the assets belong to.
- `assets`: list of asset requests.

Each asset request should include:

- `asset_id`: stable id referenced by specs or implementation tasks.
- `kind`: `image`, `music`, `sound`, `voice`, or `text`.
- `prompt`: generation or production prompt.
- `target_path`: intended in-repo path or URL mount point.
- `status`: `requested`, `generated`, `approved`, or `rejected`.
- `owner_agent`: agent or role responsible for producing it.
- `acceptance_notes`: visual, audio, format, duration, size, or quality requirements.

## Handoff Rules

Asset agents should not change gameplay or story structure while fulfilling this manifest. If an asset request exposes a design problem, report it back instead of silently changing the pack.
