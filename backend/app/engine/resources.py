SPELL_MP_COSTS = {"CURE_WOUNDS": 1, "MAGIC_MISSILE": 1, "BLESS": 1, "THUNDERWAVE": 1, "BURNING_HANDS": 1}
COMBAT_DURATION_STATUSES = {"Rage", "Bless"}


def mp_max_for_class(classes: dict, class_id: str) -> int:
    return int(classes.get(class_id, {}).get("mp_max", 0) or 0)


def class_feature_summaries(class_id: str) -> list[str]:
    return {
        "Fighter": ["Cleave: attack up to 2 different targets with Longsword."],
        "Barbarian": ["Rage: 2/adventure, combat-long +2 attack damage and half incoming damage."],
        "Rogue": ["Skill Expert: advantage on skill checks.", "Sneak Attack: double damage against an already damaged target once per turn."],
        "Ranger": ["Double Nock: attack the same target twice with Longbow."],
        "Paladin": ["Smite: 1/combat, Longsword attack plus 2d8 damage.", "Lay on Hands: 1/combat, heal a player 5 HP in combat."],
        "Cleric": ["Bless: 1 MP, party gains +2 attack and damage for the combat."],
        "Druid": ["Thunderwave: 1 MP, attack every living Opposition target for 2d8 damage on hit."],
        "Wizard": ["Firebolt: free spell, +10 attack, 1d10 damage.", "Burning Hands: 1 MP, attack every living Opposition target for 3d6 damage on hit."],
    }.get(class_id, [])


def ability_modifiers(scores: dict[str, int]) -> dict[str, int]:
    return {key: (value - 10) // 2 for key, value in scores.items()}
