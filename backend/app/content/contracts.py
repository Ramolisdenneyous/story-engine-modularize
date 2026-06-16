from typing import Any

from pydantic import BaseModel, Field


class ContentPackValidationError(ValueError):
    pass


class ContentPackMetadata(BaseModel):
    pack_id: str
    name: str


class ContentPackShape(BaseModel):
    metadata: ContentPackMetadata
    players: dict[str, dict[str, Any]] = Field(default_factory=dict)
    classes: dict[str, dict[str, Any]] = Field(default_factory=dict)
    monsters: dict[str, dict[str, Any]] = Field(default_factory=dict)
    adventures: dict[str, dict[str, Any]] = Field(default_factory=dict)
    adventure_paths: dict[str, dict[str, list[str]]] = Field(default_factory=dict)
    encounters: dict[str, dict[str, dict[str, Any]]] = Field(default_factory=dict)
    traps: dict[str, dict[str, Any]] = Field(default_factory=dict)
    hazards: dict[str, dict[str, Any]] = Field(default_factory=dict)
    assets: dict[str, str] = Field(default_factory=dict)


def validate_content_pack_shape(pack: Any) -> ContentPackShape:
    shape = ContentPackShape(
        metadata=ContentPackMetadata(pack_id=pack.pack_id, name=pack.name),
        players=pack.players,
        classes=pack.classes,
        monsters=pack.monsters,
        adventures=pack.adventures,
        adventure_paths=pack.adventure_paths,
        encounters=pack.encounters,
        traps=pack.traps,
        hazards=pack.hazards,
        assets=pack.assets,
    )
    required_sections = {
        "players": shape.players,
        "classes": shape.classes,
        "monsters": shape.monsters,
        "adventures": shape.adventures,
    }
    missing = [name for name, section in required_sections.items() if not section]
    if missing:
        raise ContentPackValidationError(f"Content pack {shape.metadata.pack_id} has empty required sections: {', '.join(missing)}")
    errors: list[str] = []
    _validate_keyed_ids("player", shape.players, "player_id", errors)
    _validate_keyed_ids("class", shape.classes, "class_id", errors)
    _validate_keyed_ids("monster", shape.monsters, "monster_id", errors)
    _validate_adventures(shape, errors)
    _validate_encounters(shape, errors)
    if errors:
        joined = "; ".join(errors)
        raise ContentPackValidationError(f"Content pack {shape.metadata.pack_id} validation failed: {joined}")
    return shape


def _validate_keyed_ids(section_name: str, records: dict[str, dict[str, Any]], id_field: str, errors: list[str]) -> None:
    for record_id, record in records.items():
        value = record.get(id_field)
        if value != record_id:
            errors.append(f"{section_name} '{record_id}' must have {id_field}='{record_id}'")


def _adventure_location_ids(shape: ContentPackShape, adventure_id: str) -> set[str]:
    adventure = shape.adventures.get(adventure_id, {})
    locations = adventure.get("locations", [])
    return {location.get("id", "") for location in locations if isinstance(location, dict) and location.get("id")}


def _validate_adventures(shape: ContentPackShape, errors: list[str]) -> None:
    for adventure_id, adventure in shape.adventures.items():
        if adventure.get("adventure_id") != adventure_id:
            errors.append(f"adventure '{adventure_id}' must have adventure_id='{adventure_id}'")
        for required in ["title", "description", "locations"]:
            if not adventure.get(required):
                errors.append(f"adventure '{adventure_id}' is missing required field '{required}'")
        locations = adventure.get("locations", [])
        if not isinstance(locations, list) or not locations:
            continue
        seen_location_ids: set[str] = set()
        for location in locations:
            if not isinstance(location, dict):
                errors.append(f"adventure '{adventure_id}' has a non-object location")
                continue
            location_id = location.get("id", "")
            if not location_id:
                errors.append(f"adventure '{adventure_id}' has a location without an id")
                continue
            if location_id in seen_location_ids:
                errors.append(f"adventure '{adventure_id}' has duplicate location '{location_id}'")
            seen_location_ids.add(location_id)
            for required in ["number", "title", "description", "x_pct", "y_pct"]:
                if required not in location:
                    errors.append(f"adventure '{adventure_id}' location '{location_id}' is missing '{required}'")
        paths = shape.adventure_paths.get(adventure_id, {})
        if not paths:
            errors.append(f"adventure '{adventure_id}' has no adventure_paths entry")
            return
        for source_id, target_ids in paths.items():
            if source_id and source_id not in seen_location_ids:
                errors.append(f"adventure '{adventure_id}' path source '{source_id}' is not a known location")
            for target_id in target_ids:
                if target_id not in seen_location_ids:
                    errors.append(f"adventure '{adventure_id}' path target '{target_id}' from '{source_id}' is not a known location")


def _validate_encounters(shape: ContentPackShape, errors: list[str]) -> None:
    for adventure_id, encounters in shape.encounters.items():
        if adventure_id not in shape.adventures:
            errors.append(f"encounters reference unknown adventure '{adventure_id}'")
            continue
        location_ids = _adventure_location_ids(shape, adventure_id)
        for location_id, encounter in encounters.items():
            if location_id not in location_ids:
                errors.append(f"encounter '{adventure_id}:{location_id}' is not tied to a known location")
            encounter_type = encounter.get("type")
            if encounter_type not in {"combat", "hazard", "trap", "story"}:
                errors.append(f"encounter '{adventure_id}:{location_id}' has unsupported type '{encounter_type}'")
            if encounter_type == "combat":
                monster_ids = encounter.get("monsters", [])
                if not monster_ids:
                    errors.append(f"combat encounter '{adventure_id}:{location_id}' has no monsters")
                for monster_id in monster_ids:
                    if monster_id not in shape.monsters:
                        errors.append(f"combat encounter '{adventure_id}:{location_id}' references unknown monster '{monster_id}'")
            if encounter_type == "trap":
                trap_id = encounter.get("trap", "")
                if trap_id not in shape.traps:
                    errors.append(f"trap encounter '{adventure_id}:{location_id}' references unknown trap '{trap_id}'")
            if encounter_type == "hazard":
                hazard_id = encounter.get("hazard", "")
                if hazard_id not in shape.hazards:
                    errors.append(f"hazard encounter '{adventure_id}:{location_id}' references unknown hazard '{hazard_id}'")
                for monster_id in encounter.get("failure_combat", []):
                    if monster_id not in shape.monsters:
                        errors.append(f"hazard encounter '{adventure_id}:{location_id}' references unknown failure monster '{monster_id}'")
            for blocked_location_id in encounter.get("blocks_travel_to", []):
                if blocked_location_id not in location_ids:
                    errors.append(f"encounter '{adventure_id}:{location_id}' blocks unknown location '{blocked_location_id}'")
