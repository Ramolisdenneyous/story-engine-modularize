HAZARD_PRESENTATION = {
    "steep_cliffside": {
        "announcement": "The path pinches against a wind-scoured cliffside. Ice-slick stone offers only narrow handholds, and every upward pull sends loose shale ticking into the drop below. Each adventurer must make steady Athletics progress to climb clear; failed efforts mean slips, bruising impacts, and lost ground.",
        "required_action": "Each player agent should attempt Athletics checks until they have 3 successes. A failed check deals hazard injury.",
        "failure": "Failure deals escalating injury to the acting character.",
    },
    "puzzle_door": {
        "announcement": "A sealed stone door bars the way, its surface carved with old marks half-hidden beneath frost and soot. The mechanism is listening for the right history, not brute force. The party needs three good insights to open it; wrong answers rattle the ruin and punish carelessness.",
        "required_action": "Player agents should make History or clearly justified knowledge checks. The party needs 3 total successes.",
        "failure": "Failure causes a backlash and may damage the acting character.",
    },
    "staged_distraction": {
        "announcement": "The outer camp can be pulled out of rhythm, but only with careful timing. A thrown sound, a false trail, a convincing signal, or another justified tactic could open the route. The party needs three successful distractions; a botched attempt draws hostile attention.",
        "required_action": "Player agents should attempt any clearly justified skill check to build 3 total successes.",
        "failure": "Failure may trigger the listed failure combat.",
    },
    "swimming": {
        "announcement": "Fog rolls low over a black escape channel. The water is freezing, the current drags sideways, and the far bank is more sensed than seen. Each adventurer must fight through the crossing with repeated Athletics checks; failure means the water takes its price.",
        "required_action": "Each player agent should attempt Athletics checks until they have 3 successes. A failed check deals hazard injury.",
        "failure": "Failure deals escalating injury to the acting character.",
    },
    "mud_stuck_wagon": {
        "announcement": "The wagon has sunk deep into sucking road-mud, wheels buried almost to the hubs. The team strains uselessly unless the party can coordinate leverage, clearing, pushing, or another sound approach. Three successful efforts will free it; poor attempts risk injury and wasted time.",
        "required_action": "Player agents should attempt any clearly justified skill check to build 3 total successes.",
        "failure": "Failure causes hazard backlash and may damage the acting character.",
    },
    "abbey_negotiation": {
        "announcement": "Father Balgart receives the party beneath the glow of the everflame, grateful but careful with the abbey's coin. The posted work promises holy purpose, not a listed wage, and he first asks the party to serve as good tidings for the Sun God. The party has three chances to make skillful arguments for payment. Their successes decide whether the abbey pays nothing, 5 gold per undead, 10 gold per undead, or 10 gold per undead plus one healing potion up front.",
        "required_action": "Player agents may attempt any clearly justified social or roleplay skill check to negotiate payment with Father Balgart. The party has exactly 3 total attempts. 0 successes means no pay; 1 success means 5gp per undead defeated; 2 successes means 10gp per undead defeated; 3 successes means 10gp per undead defeated and one Potion of Healing up front.",
        "failure": "Failed negotiation checks do not deal damage. They consume one of the 3 negotiation attempts.",
    },
    "stealth_infiltration": {
        "announcement": "The approach is watched by hostile eyes and nervous hands. Reeds, fog, and broken ground offer cover, but one careless step could carry across the marsh. The party must move silently; anyone who fails the forced Stealth check risks alerting guards.",
        "required_action": "The backend rolls Stealth for each living player on arrival. If any player fails, the listed failure combat begins.",
        "failure": "Any failed Stealth check triggers the location's failure combat.",
    },
}

TRAP_PRESENTATION = {
    "rolling_boulders": "A low grinding sound rolls through the ruin before the stones move. The passage becomes a sudden avalanche of old masonry, forcing quick awareness and raw strength to survive the boulders.",
    "spike_pit": "The floor gives the faintest hollow complaint underfoot. A hidden pit waits below the dust and frost, ready to punish anyone who misses the warning signs.",
}


def hazard_initial_state(definition: dict, hazard_definitions: dict[str, dict]) -> dict:
    hazard_id = str(definition.get("hazard", "") or "")
    config = hazard_definitions.get(hazard_id, {})
    return {
        "hazard_id": hazard_id,
        "name": config.get("name", definition.get("name", "")),
        "status": "blocking",
        "skill": config.get("skill", ""),
        "dc": int(config.get("dc", 13)),
        "required_successes": int(config.get("required_successes", 1)),
        "max_attempts": int(config.get("max_attempts", 0) or 0),
        "mode": config.get("mode", "global"),
        "successes": {},
        "failures": {},
        "global_successes": 0,
        "global_failures": 0,
    }


def hazard_arrival_announcement(encounter_name: str, hazard_id: str) -> str:
    presentation = HAZARD_PRESENTATION.get(hazard_id, {})
    return presentation.get("announcement") or f"{encounter_name} blocks the route. The party must engage the hazard before pressing onward."


def trap_arrival_announcement(encounter_name: str, trap_id: str) -> str:
    return TRAP_PRESENTATION.get(trap_id) or f"{encounter_name} reveals a hidden trap. The backend will resolve who notices it and who is caught."
