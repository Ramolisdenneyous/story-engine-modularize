import re

from .prompt_context import PromptContext


def normalize_ability_name(value: str) -> str:
    return re.sub(r"[^A-Z0-9]+", "_", str(value or "").upper()).strip("_")


def build_player_action_catalog(class_data: dict, inventory: list[str] | None = None) -> list[dict]:
    actions: list[dict] = []
    for profile in class_data.get("attack_profiles", []):
        actions.append(
            {
                "action_type": "ATTACK",
                "ability": normalize_ability_name(profile.get("name", "")),
                "display_name": profile.get("name", ""),
                "attack_formula": profile.get("attack_formula", ""),
                "damage_formula": profile.get("damage_formula", ""),
                "damage_type": profile.get("damage_type", ""),
            }
        )
    features = set(class_data.get("features", []))
    class_id = class_data.get("class_id")
    if class_id == "Fighter":
        actions.append({
            "action_type": "ATTACK",
            "ability": "CLEAVE",
            "display_name": "Cleave",
            "attack_formula": "1d20+5",
            "damage_formula": "1d8+3",
            "damage_type": "slashing",
            "usage": "Send exactly one CLEAVE action. The backend expands it into up to two attacks against different living targets.",
        })
    if class_id == "Barbarian":
        actions.append({"action_type": "SPELL", "ability": "RAGE", "display_name": "Rage"})
    if class_id == "Ranger":
        actions.append({
            "action_type": "ATTACK",
            "ability": "DOUBLE_NOCK",
            "display_name": "Double Nock",
            "attack_formula": "1d20+5",
            "damage_formula": "1d8+3",
            "damage_type": "piercing",
            "usage": "Send exactly one DOUBLE_NOCK action. The backend expands it into two attacks against the same target.",
        })
    if class_id == "Paladin":
        actions.append({"action_type": "ATTACK", "ability": "SMITE", "display_name": "Smite", "attack_formula": "1d20+5", "damage_formula": "1d8+3", "damage_type": "slashing"})
        actions.append({"action_type": "SPELL", "ability": "LAY_ON_HANDS", "display_name": "Lay on Hands"})
    if "Spellcasting" in features:
        if class_data.get("class_id") in {"Wizard"}:
            actions.append({"action_type": "SPELL", "ability": "MAGIC_MISSILE", "display_name": "Magic Missile"})
            actions.append({"action_type": "SPELL", "ability": "FIREBOLT", "display_name": "Firebolt"})
            actions.append({"action_type": "SPELL", "ability": "BURNING_HANDS", "display_name": "Burning Hands"})
        if class_data.get("class_id") in {"Cleric", "Druid"}:
            actions.append({"action_type": "SPELL", "ability": "CURE_WOUNDS", "display_name": "Cure Wounds"})
        if class_data.get("class_id") == "Cleric":
            actions.append({"action_type": "SPELL", "ability": "BLESS", "display_name": "Bless"})
        if class_data.get("class_id") == "Druid":
            actions.append({"action_type": "SPELL", "ability": "THUNDERWAVE", "display_name": "Thunderwave"})
    actions.extend(
        [
            {"action_type": "SKILL", "ability": "ATHLETICS", "display_name": "Athletics"},
            {"action_type": "SKILL", "ability": "PERCEPTION", "display_name": "Perception"},
            {"action_type": "SKILL", "ability": "INVESTIGATION", "display_name": "Investigation"},
            {"action_type": "SKILL", "ability": "SEARCH", "display_name": "Search"},
        ]
    )
    for item in inventory or []:
        lowered = str(item).lower()
        if "fireball scroll" in lowered:
            actions.append({"action_type": "USE_ITEM", "ability": "FIREBALL_SCROLL", "display_name": item})
        elif "healing" in lowered or "hp potion" in lowered:
            actions.append({"action_type": "USE_ITEM", "ability": "POTION_OF_HEALING", "display_name": item})
        elif "spell restore" in lowered or "mp potion" in lowered:
            actions.append({"action_type": "USE_ITEM", "ability": "POTION_OF_SPELL_RESTORE", "display_name": item})
    return actions

__all__ = ["PromptContext", "build_player_action_catalog", "normalize_ability_name"]
