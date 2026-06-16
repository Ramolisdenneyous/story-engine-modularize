# StoryBrief

Owner: Story Writer Agent

Consumers: RPG Design Agent, Conductor Agent

Purpose: capture genre, tone, world premise, narrative arc, character direction, and emotional beats without requiring code or rules implementation details.

## Required Sections

- `seed`: the user's raw starting idea.
- `genre`: broad fiction category.
- `tone`: the emotional texture the game should maintain.
- `world_premise`: short setting description with the core tension.
- `player_fantasy`: what the player should feel able to do.
- `content_boundaries`: subject matter, rating, and style limits.
- `major_locations`: named places likely to become maps, adventures, or scenes.
- `key_characters`: allies, rivals, patrons, villains, or recurring voices.
- `narrative_arc`: beginning, escalation, climax, and possible resolution.
- `emotional_beats`: feelings the adventure should create at important moments.
- `must_include`: user-required ideas that later agents should preserve.
- `avoid`: ideas later agents should not introduce.

## Handoff Rules

Keep this brief creative and system-neutral. Do not invent combat stats, JSON structures, file paths, UI layouts, or implementation details here.

The RPG Design Agent may ask for clarification only when a missing creative choice would change the whole game loop. Otherwise, it should make a conservative design assumption and note it in the `RpgDesignBrief`.
