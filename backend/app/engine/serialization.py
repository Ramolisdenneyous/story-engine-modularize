from pathlib import Path
from typing import Any, Callable


def asset_url(filename: str) -> str:
    return f"/assets/{filename}"


def serialize_adventure(adventures: dict[str, dict[str, Any]], adventure_id: str | None) -> dict | None:
    if not adventure_id:
        return None
    adventure = adventures.get(adventure_id)
    if not adventure:
        return None
    return {
        **adventure,
        "map_image_url": asset_url(adventure["map_image_file"]),
    }


def serialize_adventure_summary(adventures: dict[str, dict[str, Any]], adventure_id: str) -> dict:
    adventure = adventures[adventure_id]
    return {
        "adventure_id": adventure["adventure_id"],
        "title": adventure["title"],
        "description": adventure["description"],
    }


def serialize_monster_reference(monsters: dict[str, dict[str, Any]], monster_id: str) -> dict:
    monster = monsters[monster_id]
    return {
        **monster,
        "image_url": asset_url(monster["image_file"]),
    }


def serialize_player_summary(players: dict[str, dict[str, Any]], player_id: str) -> dict:
    player = players[player_id]
    return {
        "player_id": player["player_id"],
        "name": player["name"],
        "archetype": player["archetype"],
        "gender": player["gender"],
        "race": player["race"],
        "keywords": player["keywords"],
        "image_url": asset_url(f"Player-{player['player_id']}.jpg"),
    }


def serialize_player_detail(players: dict[str, dict[str, Any]], player_id: str) -> dict:
    player = players[player_id]
    return {
        **serialize_player_summary(players, player_id),
        "irl_job": player["irl_job"],
        "keywords": player["keywords"],
        "display_text": player["display_text"],
    }


def serialize_class_summary(classes: dict[str, dict[str, Any]], class_id: str) -> dict:
    class_data = classes[class_id]
    return {
        "class_id": class_data["class_id"],
        "name": class_data["name"],
        "role": class_data["role"],
        "armor_class": class_data["armor_class"],
        "hp_max": class_data["hp_max"],
    }


def portrait_filename(asset_dir: Path, player_id: str, class_id: str | None = None) -> str:
    if not class_id:
        return f"Player-{player_id}.jpg"
    candidates = [
        f"{player_id}-{class_id}.jpg",
        f"{player_id}-{class_id.lower()}.jpg",
        f"{player_id}-{class_id.capitalize()}.jpg",
    ]
    for candidate in candidates:
        if (asset_dir / candidate).exists():
            return candidate
    return f"Player-{player_id}.jpg"


def build_party_member(
    players: dict[str, dict[str, Any]],
    classes: dict[str, dict[str, Any]],
    slot: int,
    player_id: str,
    class_id: str,
    state: dict | None,
    portrait_url_for: Callable[[str, str | None], str],
    mp_max_for: Callable[[str], int],
    class_features_for: Callable[[str], list[str]],
    starting_inventory_for: Callable[[str, str], list[str]],
) -> dict:
    player = players[player_id]
    class_data = classes[class_id]
    member_state = state or {}
    mp_max = mp_max_for(class_id)
    return {
        "slot": slot,
        "player_id": player_id,
        "player_name": player["name"],
        "class_id": class_id,
        "portrait_url": portrait_url_for(player_id, class_id),
        "base_portrait_url": portrait_url_for(player_id, None),
        "race": player["race"],
        "archetype": player["archetype"],
        "keywords": player["keywords"],
        "armor_class": class_data["armor_class"],
        "hp_max": class_data["hp_max"],
        "hp_current": member_state.get("hp_current", class_data["hp_max"]),
        "mp_max": mp_max,
        "mp_current": member_state.get("mp_current", mp_max),
        "status_effects": member_state.get("status_effects", []),
        "class_features": class_features_for(class_id),
        "feature_uses": member_state.get("feature_uses", {}),
        "current_combat_feature_uses": member_state.get("current_combat_feature_uses", {}),
        "inventory": member_state.get("inventory", starting_inventory_for(player_id, class_id)),
        "initiative": member_state.get("initiative"),
    }
