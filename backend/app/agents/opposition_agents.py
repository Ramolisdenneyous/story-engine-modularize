import re

from .prompt_context import PromptContext


def extract_monster_damage_formula(monster_stats: dict) -> str:
    attack_text = str(monster_stats.get("attack_text", ""))
    match = re.search(r"(\d+d\d+(?:\+\d+)?)", attack_text.replace(" ", ""))
    return match.group(1) if match else ""

__all__ = ["PromptContext", "extract_monster_damage_formula"]
