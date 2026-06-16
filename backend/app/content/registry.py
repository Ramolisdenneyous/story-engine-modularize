from dataclasses import dataclass
from typing import Any

from . import valaska
from .contracts import ContentPackShape, validate_content_pack_shape


@dataclass(frozen=True)
class ContentPack:
    pack_id: str
    name: str
    system_prompt: str
    players: dict[str, dict[str, Any]]
    classes: dict[str, dict[str, Any]]
    monsters: dict[str, dict[str, Any]]
    adventures: dict[str, dict[str, Any]]
    adventure_paths: dict[str, dict[str, list[str]]]
    encounters: dict[str, dict[str, dict[str, Any]]]
    traps: dict[str, dict[str, Any]]
    hazards: dict[str, dict[str, Any]]
    assets: dict[str, str]


VALASKA_CONTENT_PACK = ContentPack(
    pack_id=valaska.VALASKA_PRESET_ID,
    name="Valaska",
    system_prompt=valaska.VALASKA_SYSTEM_PROMPT,
    players=valaska.PLAYERS,
    classes=valaska.CLASSES,
    monsters=valaska.MONSTERS,
    adventures=valaska.ADVENTURES,
    adventure_paths=valaska.ADVENTURE_PATHS,
    encounters=valaska.ENCOUNTER_DEFINITIONS,
    traps=valaska.TRAP_DEFINITIONS,
    hazards=valaska.HAZARD_DEFINITIONS,
    assets={
        "default_image": valaska.DEFAULT_IMAGE_FILE,
        "world_map": valaska.MAP_IMAGE_FILE,
        "adventure_selection": valaska.ADVENTURE_SELECTION_IMAGE_FILE,
    },
)

CONTENT_PACKS = {
    VALASKA_CONTENT_PACK.pack_id: VALASKA_CONTENT_PACK,
}

ACTIVE_CONTENT_PACK_ID = valaska.VALASKA_PRESET_ID


def get_content_pack(pack_id: str = ACTIVE_CONTENT_PACK_ID) -> ContentPack:
    return CONTENT_PACKS[pack_id]


def validate_content_pack(pack_id: str = ACTIVE_CONTENT_PACK_ID) -> ContentPackShape:
    return validate_content_pack_shape(get_content_pack(pack_id))
