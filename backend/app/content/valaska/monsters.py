MONSTERS = {
    "Animated Armor": {"monster_id": "Animated Armor", "ac": 18, "hp": 33, "attack_bonus": 4, "attack_text": "Slam 1d6+2"},
    "Bandit": {"monster_id": "Bandit", "ac": 12, "hp": 11, "attack_bonus": 3, "attack_text": "Scimitar 1d6+1 or Light Crossbow 1d8+1"},
    "Bandit Captain": {"monster_id": "Bandit Captain", "ac": 15, "hp": 65, "attack_bonus": 5, "attack_text": "Scimitar 1d6+3 (multiattack)"},
    "Berserker": {"monster_id": "Berserker", "ac": 13, "hp": 67, "attack_bonus": 5, "attack_text": "Greataxe 1d12+3"},
    "Ghast": {"monster_id": "Ghast", "ac": 13, "hp": 36, "attack_bonus": 5, "attack_text": "Bite 2d8+3, Claws 2d6+3 + paralysis"},
    "Giant Boar": {"monster_id": "Giant Boar", "ac": 12, "hp": 42, "attack_bonus": 5, "attack_text": "Tusk 2d6+3"},
    "Gibbering Mouther": {"monster_id": "Gibbering Mouther", "ac": 9, "hp": 67, "attack_bonus": 2, "attack_text": "Bite 5d6"},
    "Gray Ooze": {"monster_id": "Gray Ooze", "ac": 8, "hp": 22, "attack_bonus": 3, "attack_text": "Pseudopod 1d6+1 + acid"},
    "Guard": {"monster_id": "Guard", "ac": 16, "hp": 11, "attack_bonus": 3, "attack_text": "Spear 1d6+1"},
    "Mastiff": {"monster_id": "Mastiff", "ac": 12, "hp": 5, "attack_bonus": 3, "attack_text": "Bite 1d6+1 + knock prone"},
    "Minotaur Skeleton": {"monster_id": "Minotaur Skeleton", "ac": 12, "hp": 67, "attack_bonus": 6, "attack_text": "Greataxe 2d12+4"},
    "Orc": {"monster_id": "Orc", "ac": 13, "hp": 15, "attack_bonus": 5, "attack_text": "Greataxe 1d12+3"},
    "Priest": {"monster_id": "Priest", "ac": 13, "hp": 27, "attack_bonus": 2, "attack_text": "Mace 1d6 | Spellcaster"},
    "Scout": {"monster_id": "Scout", "ac": 13, "hp": 16, "attack_bonus": 4, "attack_text": "Shortsword 1d6+2 or Longbow 1d8+2"},
    "Shadow": {"monster_id": "Shadow", "ac": 12, "hp": 16, "attack_bonus": 4, "attack_text": "Strength Drain 2d6"},
    "Skeleton": {"monster_id": "Skeleton", "ac": 13, "hp": 13, "attack_bonus": 4, "attack_text": "Shortsword 1d6+2 or Shortbow 1d6+2"},
    "Swarm of Insects": {"monster_id": "Swarm of Insects", "ac": 12, "hp": 22, "attack_bonus": 3, "attack_text": "Swarm Bite 4d4"},
    "Thug": {"monster_id": "Thug", "ac": 11, "hp": 32, "attack_bonus": 4, "attack_text": "Mace 1d6+2 (multiattack)"},
    "Warhorse": {"monster_id": "Warhorse", "ac": 11, "hp": 19, "attack_bonus": 6, "attack_text": "Hooves 2d6+4"},
    "Warhorse Skeleton": {"monster_id": "Warhorse Skeleton", "ac": 13, "hp": 22, "attack_bonus": 6, "attack_text": "Hooves 2d6+4"},
    "Zombie": {"monster_id": "Zombie", "ac": 8, "hp": 22, "attack_bonus": 3, "attack_text": "Slam 1d6+1"},
}

MONSTER_CATALOG = {monster_id: {**monster} for monster_id, monster in MONSTERS.items()}


for monster_id, monster in MONSTERS.items():
    monster["image_file"] = f"Monster-{monster_id}.webp"
    MONSTER_CATALOG[monster_id]["image_file"] = monster["image_file"]
