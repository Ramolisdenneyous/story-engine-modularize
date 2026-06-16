import re
from typing import Any


STACKABLE_INVENTORY_ITEMS = {"potion of healing", "potion of spell restore", "fireball scroll"}


def starting_inventory(classes: dict[str, dict[str, Any]], player_id: str, class_id: str) -> list[str]:
    inventory = list(classes[class_id]["inventory"])
    if player_id == "Jannet" and class_id == "Wizard":
        inventory.append("Fireball Scroll x10")
    return inventory


def split_inventory_stack(value: str) -> tuple[str, int]:
    match = re.match(r"^(?P<name>.+?)\s+x(?P<count>\d+)$", (value or "").strip(), flags=re.IGNORECASE)
    if not match:
        return value.strip(), 1
    return match.group("name").strip(), max(1, int(match.group("count")))


def format_inventory_stack(name: str, count: int) -> str:
    return f"{name} x{count}" if count > 1 else name


def normalize_inventory_item_text(value: str) -> str:
    name, _count = split_inventory_stack(value)
    lowered = re.sub(r"[^a-z0-9\s]", " ", name.lower())
    return " ".join(lowered.split())


def inventory_items_overlap(left: str, right: str) -> bool:
    left_norm = normalize_inventory_item_text(left)
    right_norm = normalize_inventory_item_text(right)
    if not left_norm or not right_norm:
        return False
    return left_norm == right_norm or left_norm in right_norm or right_norm in left_norm


def is_stackable_inventory_item(value: str) -> bool:
    return normalize_inventory_item_text(value) in STACKABLE_INVENTORY_ITEMS


def is_mechanical_consumable_item(value: str) -> bool:
    return normalize_inventory_item_text(value) in STACKABLE_INVENTORY_ITEMS


def add_inventory_item_once(inventory: list[str], item: str) -> list[str]:
    item_name, item_count = split_inventory_stack(item)
    updated = list(inventory)
    if not is_stackable_inventory_item(item):
        if any(inventory_items_overlap(existing, item) for existing in updated):
            return updated
        updated.append(item)
        return updated

    for index, existing in enumerate(updated):
        if not inventory_items_overlap(existing, item):
            continue
        existing_name, existing_count = split_inventory_stack(existing)
        updated[index] = format_inventory_stack(existing_name, existing_count + item_count)
        return updated
    updated.append(format_inventory_stack(item_name, item_count))
    return updated


def remove_inventory_item_once(inventory: list[str], requested_item: str) -> list[str]:
    updated = list(inventory)
    for index, existing in enumerate(updated):
        if not inventory_items_overlap(existing, requested_item):
            continue
        existing_name, existing_count = split_inventory_stack(existing)
        _requested_name, requested_count = split_inventory_stack(requested_item)
        if existing_count > 1 and requested_count == 1:
            updated[index] = format_inventory_stack(existing_name, existing_count - 1)
        else:
            updated.pop(index)
        return updated
    return updated
