import copy

from .constants import OPPOSITION_AGENT_SLOT, OPPOSITION_INITIATIVE_ID


def empty_combat_state() -> dict:
    return {
        "in_combat": False,
        "round": 1,
        "turn_index": 0,
        "initiative_order": [],
        "initiative_values": {},
        "acted_this_round": {},
    }


def combatant_id_for_slot(slot: int) -> str:
    return OPPOSITION_INITIATIVE_ID if slot == OPPOSITION_AGENT_SLOT else f"pc:{slot}"


def canonical_combat_order(combat: dict) -> list[str]:
    initiative_values = combat.get("initiative_values", {}) or {}
    if initiative_values:
        return [combatant_id for combatant_id, _value in sorted(initiative_values.items(), key=lambda item: (-int(item[1] or 0), item[0]))]
    return list(combat.get("initiative_order", []))


def normalize_combat_state(combat_state: dict | None) -> dict:
    combat = copy.deepcopy(combat_state or empty_combat_state())
    combat.setdefault("round", 1)
    combat.setdefault("turn_index", 0)
    combat.setdefault("initiative_values", {})
    combat.setdefault("acted_this_round", {})
    if combat.get("in_combat"):
        combat["initiative_order"] = canonical_combat_order(combat)
        if combat["initiative_order"]:
            combat["turn_index"] = min(int(combat.get("turn_index", 0) or 0), len(combat["initiative_order"]) - 1)
    else:
        combat.setdefault("initiative_order", [])
    return combat


def active_combatant_id(combat_state: dict | None, living_order: list[str]) -> str:
    combat = copy.deepcopy(combat_state or empty_combat_state())
    if not combat.get("in_combat") or not combat.get("initiative_order"):
        return ""
    full_order = canonical_combat_order(combat)
    if not full_order or not living_order:
        return ""
    acted = dict(combat.get("acted_this_round", {}))
    if all(acted.get(combatant_id, False) for combatant_id in living_order):
        acted = {}
    turn_index = min(int(combat.get("turn_index", 0) or 0), len(full_order) - 1)
    for offset in range(0, len(full_order)):
        candidate = full_order[(turn_index + offset) % len(full_order)]
        if candidate in living_order and not acted.get(candidate, False):
            return candidate
    return ""


def advance_turn_in_combat(combat_state: dict | None) -> dict:
    combat = copy.deepcopy(combat_state or empty_combat_state())
    if not combat.get("in_combat") or not combat.get("initiative_order"):
        return combat
    combat["turn_index"] += 1
    if combat["turn_index"] >= len(combat["initiative_order"]):
        combat["round"] += 1
        combat["turn_index"] = 0
    return combat


def advance_combat_turn(combat_state: dict | None, acted_combatant_id: str, living_order: list[str]) -> dict:
    combat = copy.deepcopy(combat_state or empty_combat_state())
    if not combat.get("in_combat") or not combat.get("initiative_order"):
        return combat
    full_order = canonical_combat_order(combat)
    if not living_order:
        return empty_combat_state()
    acted = dict(combat.get("acted_this_round", {}))
    if acted_combatant_id:
        acted[acted_combatant_id] = True

    if all(acted.get(combatant_id, False) for combatant_id in living_order):
        combat["round"] += 1
        acted = {}
        next_living = living_order[0]
        combat["turn_index"] = full_order.index(next_living) if next_living in full_order else 0
    else:
        current_index = full_order.index(acted_combatant_id) if acted_combatant_id in full_order else int(combat.get("turn_index", 0) or 0)
        for offset in range(1, len(full_order) + 1):
            candidate_index = (current_index + offset) % len(full_order)
            candidate_id = full_order[candidate_index]
            if candidate_id not in living_order:
                acted[candidate_id] = True
                continue
            if not acted.get(candidate_id, False):
                combat["turn_index"] = candidate_index
                break
        if all(acted.get(combatant_id, False) for combatant_id in living_order):
            combat["round"] += 1
            acted = {}
            next_living = living_order[0]
            combat["turn_index"] = full_order.index(next_living) if next_living in full_order else 0
    combat["initiative_order"] = full_order
    combat["acted_this_round"] = acted
    return combat


def mark_revived_combatant_turn_spent_if_passed(combat_state: dict | None, target_slot: int) -> dict:
    combat = copy.deepcopy(combat_state or empty_combat_state())
    if not combat.get("in_combat") or not combat.get("initiative_order"):
        return combat
    full_order = canonical_combat_order(combat)
    combatant_id = combatant_id_for_slot(target_slot)
    if combatant_id not in full_order:
        return combat
    target_index = full_order.index(combatant_id)
    current_index = min(int(combat.get("turn_index", 0) or 0), len(full_order) - 1)
    if target_index >= current_index:
        return combat
    acted = dict(combat.get("acted_this_round", {}))
    acted[combatant_id] = True
    combat["initiative_order"] = full_order
    combat["acted_this_round"] = acted
    return combat
