from typing import Any, Callable


def derive_party_state_from_events(
    selected_player_ids: list[str],
    class_assignments: dict,
    classes: dict[str, dict],
    combat_state: dict,
    events: list[Any],
    event_kinds: dict[str, str],
    player_for_slot: Callable[[int], str],
    class_for_slot: Callable[[int], str],
    mp_max_for_class: Callable[[str], int],
    class_feature_summaries: Callable[[str], list[str]],
    starting_inventory: Callable[[str, str], list[str]],
    add_inventory_item_once: Callable[[list[str], str], list[str]],
    remove_inventory_item_once: Callable[[list[str], str], list[str]],
) -> dict[str, dict]:
    state = {}
    for slot in range(1, 5):
        player_id = player_for_slot(slot)
        class_id = class_for_slot(slot)
        if not player_id or not class_id:
            continue
        class_data = classes[class_id]
        mp_max = mp_max_for_class(class_id)
        state[str(slot)] = {
            "hp_current": class_data["hp_max"],
            "mp_current": mp_max,
            "mp_max": mp_max,
            "status_effects": [],
            "class_features": class_feature_summaries(class_id),
            "feature_uses": {},
            "current_combat_feature_uses": {},
            "inventory": starting_inventory(player_id, class_id),
            "initiative": combat_state.get("initiative_values", {}).get(f"pc:{slot}"),
        }

    opposition_spawned = event_kinds["opposition_spawned"]
    last_combat_prompt_index = max((event.prompt_index for event in events if event.kind.value == opposition_spawned), default=0)
    seen_state_events: set[tuple] = set()
    for event in events:
        payload = event.json_payload or {}
        if payload.get("target_type", "player") != "player":
            continue
        slot = payload.get("target_slot")
        if slot is None:
            continue
        key = str(slot)
        if key not in state:
            continue

        kind = event.kind.value
        dedupe_key = None
        if kind in {event_kinds["damage_applied"], event_kinds["hp_changed"]}:
            dedupe_key = (event.prompt_index, kind, slot, int(payload.get("amount", 0)))
        elif kind in {event_kinds["condition_added"], event_kinds["condition_removed"]}:
            dedupe_key = (event.prompt_index, kind, slot, payload.get("status", ""))
        elif kind in {event_kinds["inventory_gained"], event_kinds["inventory_lost"]}:
            dedupe_key = (event.prompt_index, kind, slot, payload.get("item", ""))
        elif kind == event_kinds["resource_changed"]:
            dedupe_key = (event.prompt_index, kind, slot, payload.get("resource", ""), payload.get("feature", ""), int(payload.get("amount", 0)))
        if dedupe_key is not None:
            if dedupe_key in seen_state_events:
                continue
            seen_state_events.add(dedupe_key)

        if kind in {event_kinds["damage_applied"], event_kinds["hp_changed"]}:
            amount = int(payload.get("amount", 0))
            hp_max = classes[class_for_slot(int(slot))]["hp_max"]
            state[key]["hp_current"] = max(0, min(state[key]["hp_current"] - amount, hp_max))
        elif kind == event_kinds["condition_added"]:
            status = payload.get("status", "")
            if status and status not in state[key]["status_effects"]:
                state[key]["status_effects"].append(status)
        elif kind == event_kinds["condition_removed"]:
            status = payload.get("status", "")
            state[key]["status_effects"] = [item for item in state[key]["status_effects"] if item != status]
        elif kind == event_kinds["inventory_gained"]:
            item = payload.get("item", "")
            if item:
                state[key]["inventory"] = add_inventory_item_once(state[key]["inventory"], item)
        elif kind == event_kinds["inventory_lost"]:
            item = payload.get("item", "")
            if item:
                state[key]["inventory"] = remove_inventory_item_once(state[key]["inventory"], item)
        elif kind == event_kinds["resource_changed"] and payload.get("resource") == "mp":
            amount = int(payload.get("amount", 0) or 0)
            mp_max = int(state[key].get("mp_max", 0) or 0)
            state[key]["mp_current"] = max(0, min(mp_max, int(state[key].get("mp_current", 0) or 0) + amount))
        elif kind == event_kinds["resource_changed"] and payload.get("resource") == "feature":
            feature = str(payload.get("feature", "") or "").lower()
            if feature:
                state[key]["feature_uses"][feature] = int(state[key]["feature_uses"].get(feature, 0) or 0) + int(payload.get("amount", 1) or 1)
                if event.prompt_index >= last_combat_prompt_index:
                    state[key]["current_combat_feature_uses"][feature] = int(state[key]["current_combat_feature_uses"].get(feature, 0) or 0) + int(payload.get("amount", 1) or 1)
    return state
