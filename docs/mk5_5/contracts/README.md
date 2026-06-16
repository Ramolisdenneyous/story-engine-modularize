# MK5.5 Agent Handoff Contracts

These documents describe how future swarm agents should pass work without sharing one overloaded context.

## Handoffs

- `story-brief.md`: Conductor to Story Writer, then Story Writer to RPG Design.
- `rpg-design-brief.md`: RPG Design to RPG Maker.
- `game-pack-spec.md`: RPG Maker to Backend, Frontend, and Asset agents.
- `implementation-contract.md`: Backend/Frontend implementation scope and acceptance checks.
- `asset-manifest.md`: Asset requests for image, voice, music, sound, and text agents.
- `test-report.md`: Tester findings for the Conductor and implementation agents.

The matching backend schema scaffolds live in `backend/app/generation/contracts.py`.

## Flow

```text
User Seed
  -> StoryBrief
  -> RpgDesignBrief
  -> GamePackSpec
  -> ImplementationContract + AssetManifest
  -> Playable Pack
  -> TestReport
```

## Boundary Rule

Creative documents should not contain code details. Technical documents should not invent new lore unless the Conductor explicitly asks them to.
