from dataclasses import dataclass, field
import re
from typing import Any

from app.engine.encounters import empty_opposition_state
from app.engine.hazards import HAZARD_PRESENTATION


@dataclass(frozen=True)
class PromptContext:
    session_id: str
    agent_slot: int
    user_text: str
    mechanical_state: dict[str, Any] = field(default_factory=dict)
    narrative_context: dict[str, Any] = field(default_factory=dict)


def mission_context_for_agents(mission_state: dict, mission_config: dict, current_location_name: str = "") -> dict:
    state = dict(mission_state or {})
    adventure_id = str(state.get("adventure_id", "") or "")
    config = mission_config.get(adventure_id, {})
    if not config:
        return {}
    context = {
        "title": state.get("title", config.get("title", "")),
        "goal": state.get("public_goal", config.get("public_goal", "")),
        "progress": state.get("progress_label", config.get("progress_label", "")),
        "complete": bool(state.get("complete", False)),
        "current_location": current_location_name or "",
    }
    if adventure_id == "telas-wagons":
        context["allowed_next_locations"] = state.get("allowed_location_ids", [])
    if adventure_id == "endless-glacier-undead":
        context["undead_kills"] = int(state.get("undead_kills", 0) or 0)
        context["target_kills"] = int(state.get("target_kills", mission_config[adventure_id]["target_kills"]) or 0)
        context["abbey_negotiation_complete"] = bool(state.get("abbey_negotiation_complete", False))
        context["abbey_negotiation_successes"] = int(state.get("abbey_negotiation_successes", 0) or 0)
        context["undead_reward_per_kill"] = int(state.get("undead_reward_per_kill", 0) or 0)
        context["undead_reward_earned"] = int(state.get("undead_reward_earned", 0) or 0)
    return context


def encounter_context_for_agents(
    encounter_state: dict,
    opposition_state: dict,
    trap_definitions: dict,
    current_location_name: str = "",
) -> dict:
    encounter_state = dict(encounter_state or {})
    encounter_type = str(encounter_state.get("encounter_type", "none") or "none")
    context = {
        "encounter_type": encounter_type,
        "encounter_name": encounter_state.get("encounter_name", ""),
        "status": encounter_state.get("status", ""),
        "location": encounter_state.get("location_name", current_location_name or ""),
        "active": bool(encounter_state.get("active", False)),
    }
    if encounter_type == "combat":
        opposition = dict(opposition_state or empty_opposition_state())
        context["monsters"] = [
            {
                "target_id": item.get("monster_id", ""),
                "display_name": item.get("display_name", ""),
                "monster_type": item.get("monster_type", ""),
                "current_hp": item.get("current_hp", 0),
                "hp_max": item.get("hp_max", 0),
                "is_dead": bool(item.get("is_dead", False)),
            }
            for item in opposition.get("instances", [])
        ]
    elif encounter_type == "hazard":
        hazard = dict(encounter_state.get("hazard", {}))
        hazard_id = str(hazard.get("hazard_id", "") or "")
        presentation = HAZARD_PRESENTATION.get(hazard_id, {})
        context["hazard"] = hazard
        context["resolution_instructions"] = {
            "required_action": presentation.get("required_action", ""),
            "failure_effect": presentation.get("failure", ""),
            "skill": hazard.get("skill", ""),
            "dc": hazard.get("dc", 13),
            "mode": hazard.get("mode", ""),
            "required_successes": hazard.get("required_successes", 1),
            "max_attempts": hazard.get("max_attempts", 0),
            "attempts_used": len(hazard.get("attempts", [])),
            "current_successes": hazard.get("successes", {}),
            "global_successes": hazard.get("global_successes", 0),
            "important": "If the GM prompts you to engage this hazard, use resolve_action with a SKILL action before narrating the outcome. Do not claim success or failure unless the backend roll says so.",
        }
    elif encounter_type == "trap":
        trap_id = encounter_state.get("definition", {}).get("trap", "")
        trap = trap_definitions.get(trap_id, {})
        context["trap"] = {
            "trap_id": trap_id,
            "name": trap.get("name", encounter_state.get("encounter_name", "")),
            "notice_dc": trap.get("notice_dc"),
            "save_skill": trap.get("save_skill"),
            "save_dc": trap.get("save_dc"),
            "damage": trap.get("damage"),
            "resolution_instructions": "The backend resolves this trap automatically on arrival with notice and save rolls. Treat the Adventure Log results as authoritative.",
        }
    if encounter_state.get("search", {}).get("available"):
        context["search"] = encounter_state.get("search", {})
    return context


def extract_requested_check_type(user_text: str) -> str:
    lowered = (user_text or "").lower()
    match = re.search(r"\b([a-z]+(?:\s+[a-z]+){0,2})\s+check\b", lowered)
    if match:
        return match.group(1).strip()
    if "saving throw" in lowered:
        return "saving throw"
    if re.search(r"\bsave\b", lowered):
        return "save"
    if "initiative" in lowered:
        return "initiative"
    return ""
