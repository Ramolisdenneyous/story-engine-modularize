"""Compatibility exports for the active Valaska content pack.

MK5 originally imported all static game content from this module. MK5.5 is
moving that content behind explicit content-pack boundaries, while this facade
keeps existing backend imports stable during the transition.
"""

from .content.valaska import (
    ADVENTURES,
    ADVENTURE_LOCATIONS,
    ADVENTURE_MAP_FILES,
    ADVENTURE_PATHS,
    ADVENTURE_SELECTION_IMAGE_FILE,
    CLASS_ORDER,
    CLASSES,
    DEFAULT_IMAGE_FILE,
    ENCOUNTER_DEFINITIONS,
    HAZARD_DEFINITIONS,
    MAP_IMAGE_FILE,
    MONSTERS,
    MONSTER_CATALOG,
    NARRATIVE_BASE_PROMPT,
    PLAYERS,
    PLAYER_NARRATIVE_LENSES,
    PLAYER_ORDER,
    TRAP_DEFINITIONS,
    VALASKA_PRESET_ID,
    VALASKA_SYSTEM_PROMPT,
)

__all__ = [
    "ADVENTURES",
    "ADVENTURE_LOCATIONS",
    "ADVENTURE_MAP_FILES",
    "ADVENTURE_PATHS",
    "ADVENTURE_SELECTION_IMAGE_FILE",
    "CLASS_ORDER",
    "CLASSES",
    "DEFAULT_IMAGE_FILE",
    "ENCOUNTER_DEFINITIONS",
    "HAZARD_DEFINITIONS",
    "MAP_IMAGE_FILE",
    "MONSTERS",
    "MONSTER_CATALOG",
    "NARRATIVE_BASE_PROMPT",
    "PLAYERS",
    "PLAYER_NARRATIVE_LENSES",
    "PLAYER_ORDER",
    "TRAP_DEFINITIONS",
    "VALASKA_PRESET_ID",
    "VALASKA_SYSTEM_PROMPT",
]
