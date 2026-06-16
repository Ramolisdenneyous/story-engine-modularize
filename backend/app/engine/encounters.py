import copy

from .constants import OPPOSITION_INITIATIVE_ID

LONG_REST_AMBUSHES = {
    "icebane-castle": ["Shadow", "Shadow"],
    "east-marsh-raid": ["Orc", "Orc"],
    "telas-wagons": ["Berserker"],
    "old-people-barrow": ["Zombie", "Zombie", "Zombie", "Zombie"],
    "collecting-taxes": ["Bandit", "Bandit", "Bandit"],
    "endless-glacier-undead": ["Ghast", "Ghast"],
}


def empty_opposition_state() -> dict:
    return {
        "active": False,
        "group_id": "",
        "initiative_id": OPPOSITION_INITIATIVE_ID,
        "monster_type": "",
        "monster_stats": {},
        "instances": [],
        "cleanup_after": "",
    }


def empty_encounter_state(adventure_id: str = "") -> dict:
    return {
        "adventure_id": adventure_id,
        "location_id": "",
        "location_name": "",
        "encounter_type": "none",
        "encounter_name": "",
        "active": False,
        "repeatable": False,
        "status": "inactive",
        "definition": {},
        "hazard": {},
        "search": {"available": False, "found": False, "loot": []},
        "dropped_loot": [],
        "awarded_loot_groups": [],
        "visited_once": [],
        "history": [],
    }


def encounter_definition(encounter_definitions: dict, adventure_id: str, location_id: str) -> dict:
    return copy.deepcopy(encounter_definitions.get(adventure_id, {}).get(location_id, {"type": "none", "name": "No Encounter"}))
