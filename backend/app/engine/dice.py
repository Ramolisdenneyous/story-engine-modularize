import re
import uuid
from datetime import datetime, timezone
from secrets import randbelow


DICE_RE = re.compile(r"^\s*(\d{1,3})\s*d\s*(4|6|8|10|12|20|100)\s*([+-]\s*\d+)?\s*$", re.IGNORECASE)
VALID_DICE_SIDES = {4, 6, 8, 10, 12, 20, 100}


def perform_dice_roll(formula: str, label: str = "", roller_id: str = "unknown", randbelow_fn=randbelow) -> dict:
    match = DICE_RE.match(formula or "")
    if not match:
        return {"error": {"code": "invalid_formula", "message": "Formula must look like NdM+K using d4/d6/d8/d10/d12/d20."}}
    dice_count = int(match.group(1))
    dice_sides = int(match.group(2))
    modifier_raw = match.group(3) or ""
    modifier = int(modifier_raw.replace(" ", "")) if modifier_raw else 0
    if dice_count < 1 or dice_count > 100 or dice_sides not in VALID_DICE_SIDES:
        return {"error": {"code": "invalid_formula", "message": "Dice count or sides are out of bounds."}}
    rolls = [randbelow_fn(dice_sides) + 1 for _ in range(dice_count)]
    timestamp = datetime.now(timezone.utc)
    return {
        "formula": formula.replace(" ", ""),
        "dice_count": dice_count,
        "dice_sides": dice_sides,
        "rolls": rolls,
        "modifier": modifier,
        "total": sum(rolls) + modifier,
        "label": label,
        "roller_id": roller_id,
        "timestamp": timestamp.isoformat(),
        "roll_id": str(uuid.uuid4()),
    }
