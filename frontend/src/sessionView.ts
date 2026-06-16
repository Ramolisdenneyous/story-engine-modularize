import { OPPOSITION_SLOT, SessionDetail } from "./appTypes";

export function sanitizeVisibleAgentText(text: string) {
  return text
    .split(/\r?\n/)
    .filter((line) => {
      const trimmed = line.trim();
      if (!trimmed) return true;
      if (/^(TOOL_DICE_ROLL|COMBAT_STATE_CHANGE):/i.test(trimmed)) return false;
      if (/^(resolve_action|update_inventory|update_combat_state|roll_dice|roll_dice_batch)\s*[:(]/i.test(trimmed)) return false;
      if (/^\{.*\}$/.test(trimmed) && /"(target_type|target_id|changes|formula|rolls|actor_id|action_type|ability|actions|results|healing|damage)"/.test(trimmed)) return false;
      return true;
    })
    .join("\n")
    .trim();
}

export function orderedAgentSlotsForDetail(detail: SessionDetail | null): number[] {
  if (!detail) return [1, 2, 3, 4];
  if (detail.session.combat_state.in_combat) {
    return detail.session.combat_state.initiative_order
      .map((item) => {
        if (item === "opp:12") return OPPOSITION_SLOT;
        if (item.startsWith("pc:")) return Number(item.replace("pc:", ""));
        return Number(item);
      })
      .filter((slot) => Number.isFinite(slot));
  }
  return detail.tab1.selected_agent_slots;
}

export function activeCombatantIdForDetail(detail: SessionDetail): string {
  const combat = detail.session.combat_state;
  const order = combat.initiative_order;
  if (!combat.in_combat || !order.length) return "";
  const livingIds = new Set<string>();
  detail.tab1.party.forEach((member) => {
    if (member.hp_current > 0) livingIds.add(`pc:${member.slot}`);
  });
  if (detail.session.opposition_state?.active) livingIds.add("opp:12");
  if (!livingIds.size) return "";
  const acted = { ...combat.acted_this_round };
  const livingOrder = order.filter((combatantId) => livingIds.has(combatantId));
  if (livingOrder.length && livingOrder.every((combatantId) => acted[combatantId])) {
    Object.keys(acted).forEach((combatantId) => {
      delete acted[combatantId];
    });
  }
  const start = Math.min(combat.turn_index, order.length - 1);
  for (let offset = 0; offset < order.length; offset += 1) {
    const combatantId = order[(start + offset) % order.length];
    if (livingIds.has(combatantId) && !acted[combatantId]) return combatantId;
  }
  return "";
}

export function selectableAgentSlotsForDetail(detail: SessionDetail | null): number[] {
  if (!detail) return [1, 2, 3, 4];
  if (detail.session.combat_state.in_combat && detail.session.combat_state.initiative_order.length) {
    const activeCombatant = activeCombatantIdForDetail(detail);
    if (activeCombatant === "opp:12" && detail.session.opposition_state?.active) return [OPPOSITION_SLOT];
    if (activeCombatant?.startsWith("pc:")) {
      const slot = Number(activeCombatant.replace("pc:", ""));
      const member = detail.tab1.party.find((partyMember) => partyMember.slot === slot);
      if (member && member.hp_current > 0) return [slot];
    }
  }
  const playerSlots = detail.tab1.party.filter((member) => member.hp_current > 0).map((member) => member.slot);
  const activeOrder = orderedAgentSlotsForDetail(detail).filter((slot) => slot !== OPPOSITION_SLOT);
  const orderedPlayers = activeOrder.filter((slot) => playerSlots.includes(slot));
  const remainingPlayers = playerSlots.filter((slot) => !orderedPlayers.includes(slot));
  const oppositionSlots = detail.session.opposition_state?.active ? [OPPOSITION_SLOT] : [];
  return [...orderedPlayers, ...remainingPlayers, ...oppositionSlots];
}

export function nextSelectableSlot(detail: SessionDetail | null, currentSlot: number): number {
  const slots = selectableAgentSlotsForDetail(detail);
  if (!slots.length) return 1;
  const currentIndex = slots.indexOf(currentSlot);
  if (currentIndex === -1) return slots[0];
  return slots[(currentIndex + 1) % slots.length];
}
