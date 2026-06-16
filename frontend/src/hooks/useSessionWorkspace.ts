import { useCallback, useEffect, useRef, useState } from "react";
import { api } from "../api";
import { Adventure, CatalogBoot, SessionDetail } from "../appTypes";
import { selectableAgentSlotsForDetail } from "../sessionView";

type UseSessionWorkspaceOptions = {
  onSessionCreated?: () => void;
  onActiveAgentSlotFallback: (updater: (current: number) => number) => void;
};

export function useSessionWorkspace({
  onSessionCreated,
  onActiveAgentSlotFallback,
}: UseSessionWorkspaceOptions) {
  const bootedRef = useRef(false);
  const [catalogBoot, setCatalogBoot] = useState<CatalogBoot | null>(null);
  const [adventureDetailsById, setAdventureDetailsById] = useState<Record<string, Adventure>>({});
  const [sessionId, setSessionId] = useState("");
  const [detail, setDetail] = useState<SessionDetail | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [adventureId, setAdventureId] = useState("");
  const [selectedPlayerIds, setSelectedPlayerIds] = useState<string[]>([]);
  const [classByPlayer, setClassByPlayer] = useState<Record<string, string>>({});

  const cacheActiveAdventure = useCallback((adventure: Adventure | null | undefined) => {
    if (!adventure) return;
    setAdventureDetailsById((current) => ({
      ...current,
      [adventure.adventure_id]: adventure,
    }));
  }, []);

  const refresh = useCallback(async (id = sessionId) => {
    const data = await api<SessionDetail>(`/session/${id}`);
    setDetail(data);
    cacheActiveAdventure(data.tab1.active_adventure);
    setAdventureId(data.tab1.adventure_id);
    setSelectedPlayerIds(data.tab1.selected_player_ids);
    const byPlayer: Record<string, string> = {};
    data.tab1.party.forEach((member) => {
      byPlayer[member.player_id] = member.class_id;
    });
    setClassByPlayer(byPlayer);
    const selectableSlots = selectableAgentSlotsForDetail(data);
    onActiveAgentSlotFallback((current) => (selectableSlots.includes(current) ? current : selectableSlots[0] ?? 1));
    return data;
  }, [cacheActiveAdventure, onActiveAgentSlotFallback, sessionId]);

  const boot = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const [catalogData, created] = await Promise.all([
        api<CatalogBoot>("/catalog/boot"),
        api<{ session_id: string }>("/session", { method: "POST" }),
      ]);
      setCatalogBoot(catalogData);
      setSessionId(created.session_id);
      onSessionCreated?.();
      await refresh(created.session_id);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  }, [onSessionCreated, refresh]);

  useEffect(() => {
    if (bootedRef.current) return;
    bootedRef.current = true;
    void boot();
  }, [boot]);

  useEffect(() => {
    if (!adventureId || adventureDetailsById[adventureId]) {
      return;
    }
    let cancelled = false;
    void api<Adventure>(`/catalog/adventures/${adventureId}`)
      .then((adventure) => {
        if (cancelled) return;
        setAdventureDetailsById((current) => ({ ...current, [adventure.adventure_id]: adventure }));
      })
      .catch(() => {
        // Keep the UI usable with summary data if this lazy fetch fails.
      });
    return () => {
      cancelled = true;
    };
  }, [adventureId, adventureDetailsById]);

  return {
    catalogBoot,
    adventureDetailsById,
    sessionId,
    detail,
    setDetail,
    loading,
    setLoading,
    error,
    setError,
    adventureId,
    setAdventureId,
    selectedPlayerIds,
    setSelectedPlayerIds,
    classByPlayer,
    setClassByPlayer,
    cacheActiveAdventure,
    refresh,
  };
}
