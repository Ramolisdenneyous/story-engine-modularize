from typing import Any


def append_system_event(db: Any, event_model: type, event_role: Any, session_id: str, prompt_index: int, kind: Any, text: str, payload: dict):
    event = event_model(
        session_id=session_id,
        prompt_index=prompt_index,
        role=event_role,
        kind=kind,
        agent_slot=None,
        text=text,
        json_payload=payload,
    )
    db.add(event)
    db.flush()
    return event
