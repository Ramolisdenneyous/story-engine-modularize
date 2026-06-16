ENCOUNTER_DEFINITIONS = {
    "icebane-castle": {
        "loc-1": {"type": "combat", "name": "The Thaw Gate Ambush", "monsters": ["Scout", "Scout"], "dropped_loot": ["Potion of Healing"]},
        "loc-2": {"type": "combat", "name": "Gray Ooze in the Frost-Choked Hall", "monsters": ["Gray Ooze"], "searched_loot": ["Potion of Healing"]},
        "loc-3": {"type": "trap", "name": "Rolling Stone Boulders", "trap": "rolling_boulders"},
        "loc-4": {"type": "combat", "name": "Melted Armory Swarm", "monsters": ["Swarm of Insects"], "searched_loot": ["Potion of Healing"]},
        "loc-5": {"type": "combat", "name": "Reliquary Shadows", "monsters": ["Shadow", "Shadow", "Shadow"], "searched_loot": ["Potion of Spell Restore"]},
        "loc-6": {"type": "combat", "name": "Fractured Throne Room", "monsters": ["Thug", "Orc", "Orc"], "boss": True},
    },
    "east-marsh-raid": {
        "loc-1": {"type": "hazard", "name": "Blackwater Approach", "hazard": "stealth_infiltration", "repeatable": True, "failure_combat": ["Scout", "Scout"], "dropped_loot": ["Potion of Healing"]},
        "loc-2": {"type": "hazard", "name": "Watcher's Rise", "hazard": "stealth_infiltration", "repeatable": True, "failure_combat": ["Orc", "Orc", "Orc"], "searched_loot": ["Potion of Spell Restore"]},
        "loc-3": {"type": "hazard", "name": "Outer Camp Ring", "hazard": "staged_distraction", "failure_combat": ["Giant Boar"], "searched_loot": ["Potion of Spell Restore"]},
        "loc-4": {"type": "hazard", "name": "Supply Cache Pit", "hazard": "stealth_infiltration", "repeatable": True, "failure_combat": ["Thug", "Thug"], "dropped_loot": ["Potion of Healing"], "searched_loot": ["Potion of Spell Restore"]},
        "loc-5": {"type": "combat", "name": "War Leader's Tent", "monsters": ["Bandit Captain", "Giant Boar"], "boss": True, "dropped_loot": ["Potion of Healing"], "searched_loot": ["Potion of Spell Restore"]},
        "loc-6": {"type": "hazard", "name": "Fog-Choked Escape Channel", "hazard": "swimming", "repeatable": True},
    },
    "telas-wagons": {
        "loc-1": {"type": "hazard", "name": "Mud-Stuck Wagon", "hazard": "mud_stuck_wagon", "blocks_travel_to": ["loc-2"], "searched_loot": ["Potion of Spell Restore"]},
        "loc-2": {"type": "combat", "name": "Barrow Approach Scouts", "monsters": ["Scout", "Scout"], "dropped_loot": ["Potion of Healing"], "searched_loot": ["Potion of Spell Restore"]},
        "loc-3": {"type": "combat", "name": "Narrow Pass Ambush", "monsters": ["Thug", "Bandit", "Bandit"], "dropped_loot": ["Potion of Healing"]},
        "loc-4": {"type": "combat", "name": "Whiteout Berserkers", "monsters": ["Berserker", "Berserker"], "dropped_loot": ["Potion of Healing"]},
        "loc-5": {"type": "combat", "name": "Silverrun Crossing", "monsters": ["Bandit Captain", "Bandit", "Bandit"], "boss": True},
        "loc-6": {"type": "story", "name": "Glockstead Approach", "text": "The wagons reach Glockstead. The mission objective is complete."},
    },
    "old-people-barrow": {
        "loc-1": {"type": "trap", "name": "Rolling Stone Boulders", "trap": "rolling_boulders"},
        "loc-2": {"type": "combat", "name": "Hall of Echoes Dead", "monsters": ["Zombie", "Zombie", "Zombie", "Zombie"], "repeatable": True, "dropped_loot": ["Potion of Healing"], "searched_loot": ["Potion of Spell Restore"]},
        "loc-3": {"type": "combat", "name": "Ancestral Gallery Guardian", "monsters": ["Animated Armor"], "repeatable": True, "searched_loot": ["Potion of Spell Restore"]},
        "loc-4": {"type": "hazard", "name": "Puzzle Door", "hazard": "puzzle_door", "blocks_travel_to": ["loc-5"]},
        "loc-5": {"type": "combat", "name": "Burial Vault", "monsters": ["Gibbering Mouther"]},
        "loc-6": {"type": "hazard", "name": "Steep Cliffside", "hazard": "steep_cliffside"},
    },
    "endless-glacier-undead": {
        "loc-1": {"type": "hazard", "name": "Everflame Abbey Negotiation", "hazard": "abbey_negotiation", "blocks_travel_to": ["loc-2", "loc-3", "loc-4", "loc-5", "loc-6"]},
        "loc-2": {"type": "combat", "name": "Frozen Pilgrim's Path", "monsters": ["Skeleton", "Skeleton", "Warhorse Skeleton"], "repeatable": True, "dropped_loot": ["Old Saddle"], "searched_loot": ["Potion of Spell Restore"]},
        "loc-3": {"type": "combat", "name": "Shattered Ice Field", "monsters": ["Minotaur Skeleton"], "repeatable": True, "searched_loot": ["Potion of Healing"]},
        "loc-4": {"type": "combat", "name": "Burial Drift", "monsters": ["Zombie", "Zombie", "Zombie", "Zombie"], "repeatable": True, "dropped_loot": ["Potion of Healing"], "searched_loot": ["Potion of Spell Restore"]},
        "loc-5": {"type": "combat", "name": "Black Ice Scar", "monsters": ["Ghast"], "repeatable": True},
        "loc-6": {"type": "combat", "name": "Heart of the Glacier", "monsters": ["Minotaur Skeleton", "Skeleton", "Skeleton", "Skeleton"], "repeatable": True, "dropped_loot": ["Forbidden Relic"]},
    },
    "collecting-taxes": {
        "loc-1": {"type": "combat", "name": "Narrow Bridge Toll", "monsters": ["Bandit", "Bandit", "Bandit"], "dropped_loot": ["Gold", "Potion of Healing"]},
        "loc-2": {"type": "combat", "name": "Burned-Out Waystation", "monsters": ["Bandit", "Bandit", "Warhorse"], "dropped_loot": ["Gold", "Potion of Spell Restore"]},
        "loc-3": {"type": "combat", "name": "Fog-Choked Low Road", "monsters": ["Mastiff", "Mastiff", "Guard", "Guard"], "dropped_loot": ["Gold", "Potion of Spell Restore"]},
        "loc-4": {"type": "combat", "name": "High Ridge Overlook", "monsters": ["Guard", "Guard", "Guard", "Guard"], "dropped_loot": ["Gold", "Potion of Healing"]},
        "loc-5": {"type": "combat", "name": "Wagon Bottleneck", "monsters": ["Guard", "Mastiff", "Mastiff"], "dropped_loot": ["Gold", "Potion of Spell Restore"]},
        "loc-6": {"type": "combat", "name": "Open Road Near Flames' Rest Inn", "monsters": ["Bandit", "Bandit", "Bandit", "Bandit"], "dropped_loot": ["Gold", "Potion of Healing"]},
    },
}

TRAP_DEFINITIONS = {
    "spike_pit": {"name": "Spike Pit", "notice_dc": 13, "save_skill": "Acrobatics", "save_dc": 13, "damage": "3d6"},
    "rolling_boulders": {"name": "Rolling Stone Boulders", "notice_dc": 13, "save_skill": "Athletics", "save_dc": 13, "damage": "3d6"},
}

HAZARD_DEFINITIONS = {
    "steep_cliffside": {"name": "Steep Cliffside", "skill": "Athletics", "dc": 13, "required_successes": 3, "mode": "per_player"},
    "puzzle_door": {"name": "Puzzle Door", "skill": "History", "dc": 13, "required_successes": 3, "mode": "global"},
    "stealth_infiltration": {"name": "Stealth Infiltration", "skill": "Stealth", "dc": 13, "required_successes": 4, "mode": "party_once"},
    "staged_distraction": {"name": "Staged Distraction", "skill": "Any justified skill", "dc": 13, "required_successes": 3, "mode": "global"},
    "swimming": {"name": "Swimming", "skill": "Athletics", "dc": 13, "required_successes": 3, "mode": "per_player"},
    "mud_stuck_wagon": {"name": "Mud-Stuck Wagon", "skill": "Any justified skill", "dc": 13, "required_successes": 3, "mode": "global"},
    "abbey_negotiation": {"name": "Everflame Abbey Negotiation", "skill": "Any justified social or roleplay skill", "dc": 13, "required_successes": 3, "max_attempts": 3, "mode": "negotiation"},
}
