MAX_PARTY_PROMPT_AGENT_EVENTS = 2


def party_prompt_text(agent_names: dict, source_slot: int, target_slot: int, message: str, mode: str) -> str:
    source_name = agent_names.get(str(source_slot), f"Agent {source_slot}")
    target_name = agent_names.get(str(target_slot), f"Agent {target_slot}")
    verb = "asks" if mode == "question" else "says to"
    return f"{source_name} {verb} {target_name}: {message}"


def starter_party_prompt_fallback(agent_names: dict, selected_agent_slots: list[int], source_slot: int) -> dict | None:
    target_slot: int | None = None
    for slot in selected_agent_slots:
        if slot != source_slot and agent_names.get(str(slot), "").strip().lower() == "annie":
            target_slot = slot
            break
    if target_slot is None:
        target_slot = next((slot for slot in selected_agent_slots if slot != source_slot), None)
    if target_slot is None:
        return None
    target_name = agent_names.get(str(target_slot), f"Agent {target_slot}")
    return {
        "accepted": True,
        "source_slot": source_slot,
        "target_slot": target_slot,
        "mode": "question",
        "message": (
            f"{target_name}, before we commit to this plan, what risks or hidden angles "
            "do you think we should watch for?"
        ),
        "source": "starter_fallback",
    }


def party_followup_expected_agent_events(party_request: dict | None) -> int:
    if not party_request:
        return 0
    return 2 if str(party_request.get("mode", "")).lower() == "question" else 1
