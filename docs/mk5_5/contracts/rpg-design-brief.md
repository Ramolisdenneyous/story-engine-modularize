# RpgDesignBrief

Owner: RPG Design Agent

Consumers: Story Writer Agent, RPG Maker Agent, Conductor Agent

Purpose: translate narrative intent into playable loops, roles, resources, conflict types, encounter categories, and success/failure models.

## Required Sections

- `core_loop`: the repeated player action loop in one paragraph.
- `player_roles`: character archetypes, jobs, or party slots.
- `conflict_types`: combat, social, survival, exploration, puzzles, hazards, or other pressure forms.
- `resource_systems`: health, magic, inventory, time, reputation, clues, supplies, or other tracked values.
- `success_failure_model`: how the game handles partial success, failure, recovery, and ending states.
- `encounter_categories`: encounter labels the engine or UI can recognize.
- `progression_model`: how characters, story state, maps, or threats change over time.
- `balance_targets`: rough expectations for difficulty, session length, encounter count, and recovery.
- `required_system_hooks`: engine features needed to support the design.

## Handoff Rules

Translate the `StoryBrief` into game behavior, not implementation. Avoid file names, Python functions, React components, and asset prompts.

If the design needs a system the current engine does not have, list it in `required_system_hooks` instead of pretending it already exists.
