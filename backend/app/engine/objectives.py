RETURN_TO_MOOSEHEARTH_TEXT = "The objective is complete. Return to Moosehearth to report your success."

MISSION_OBJECTIVE_CONFIG = {
    "icebane-castle": {
        "title": "Recover the Witch-King Crown",
        "public_goal": "Recover the Witch-King Crown from the ruins of Icebane Castle.",
        "progress_label": "Witch-King Crown not yet recovered.",
        "secret": "The crown drops only when the last monster in The Fractured Throne Room dies.",
        "target_location_id": "loc-6",
        "target_location_name": "The Fractured Throne Room",
        "item_name": "Witch-King Crown",
    },
    "east-marsh-raid": {
        "title": "Kill the Warchief",
        "public_goal": "Find and defeat the East Marsh war leader.",
        "progress_label": "The war leader is still at large.",
        "secret": "Traveling to The War Leader's Tent triggers the warchief encounter.",
        "target_location_id": "loc-5",
        "target_location_name": "The War Leader's Tent",
        "required_monsters": ["Bandit Captain", "Giant Boar"],
    },
    "telas-wagons": {
        "title": "Escort the Wagon Train to Glockstead",
        "public_goal": "Escort the supply wagons along the King's Way to Glockstead.",
        "progress_label": "Wagons are waiting to depart.",
        "travel_sequence": ["loc-1", "loc-2", "loc-3", "loc-4", "loc-5", "loc-6"],
    },
    "old-people-barrow": {
        "title": "Recover the Lost Relic",
        "public_goal": "Recover the lost relic from the Old-People's Barrow.",
        "progress_label": "The lost relic has not been recovered.",
        "secret": "A successful search check in The Burial Vault reveals The Befouled Urn.",
        "target_location_id": "loc-5",
        "target_location_name": "The Burial Vault",
        "item_name": "The Befouled Urn",
    },
    "endless-glacier-undead": {
        "title": "Kill 10 Undead",
        "public_goal": "Destroy ten undead threats along the Endless Glacier.",
        "progress_label": "Undead defeated: 0/10.",
        "target_kills": 10,
    },
    "collecting-taxes": {
        "title": "Collect 400gp",
        "public_goal": "Collect 400 gold pieces along the King's Road.",
        "progress_label": "Gold collected: 0/400gp.",
        "target_gold": 400,
    },
}


def empty_mission_objective_state(adventure_id: str = "") -> dict:
    config = MISSION_OBJECTIVE_CONFIG.get(adventure_id, {})
    state = {
        "adventure_id": adventure_id,
        "title": config.get("title", ""),
        "public_goal": config.get("public_goal", ""),
        "progress_label": config.get("progress_label", ""),
        "status": "inactive" if not adventure_id else "in_progress",
        "complete": False,
        "return_available": False,
        "updates": [],
    }
    if adventure_id == "telas-wagons":
        state.update({"current_step": 0, "allowed_location_ids": ["loc-1"], "visited_location_ids": []})
    elif adventure_id == "endless-glacier-undead":
        state.update({
            "undead_kills": 0,
            "target_kills": 10,
            "abbey_negotiation_complete": False,
            "abbey_negotiation_successes": 0,
            "undead_reward_per_kill": 0,
            "undead_reward_earned": 0,
            "undead_reward_paid": False,
        })
    elif adventure_id == "collecting-taxes":
        state.update({"gold_collected": 0, "target_gold": 400})
    elif adventure_id == "icebane-castle":
        state.update({"item_awarded": False, "item_name": config.get("item_name", "")})
    elif adventure_id == "old-people-barrow":
        state.update({"item_awarded": False, "item_name": config.get("item_name", "")})
    elif adventure_id == "east-marsh-raid":
        state.update({"boss_encounter_spawned": False, "boss_encounter_group_id": "", "boss_defeated": False})
    return state
