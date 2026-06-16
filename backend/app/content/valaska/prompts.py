from ...prompt_loader import load_narrative_lens, load_system_prompt

VALASKA_SYSTEM_PROMPT = load_system_prompt("valaska_setting.md")

PLAYER_NARRATIVE_LENSES = {
    "Joe": load_narrative_lens("Joe"),
    "Annie": load_narrative_lens("Annie"),
    "Tammey": load_narrative_lens("Tammey"),
    "Rick": load_narrative_lens("Rick"),
    "Beau": load_narrative_lens("Beau"),
    "Sam": load_narrative_lens("Sam"),
    "Tom": load_narrative_lens("Tom"),
    "Jannet": load_narrative_lens("Jannet"),
}

NARRATIVE_BASE_PROMPT = load_system_prompt("narrative_base.md")
