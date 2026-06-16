import { Dispatch, SetStateAction } from "react";
import { api } from "../api";
import { AdventureLocation, Monster, OPPOSITION_SLOT, SessionDetail } from "../appTypes";
import { OnboardingGuideStep } from "../constants/onboarding";
import { selectableAgentSlotsForDetail } from "../sessionView";

type UseAdventureActionsOptions = {
  sessionId: string;
  activeLocation: AdventureLocation | null;
  selectedEncounterMonster: Monster | null;
  encounterQuantity: number;
  activeAgentSlot: number;
  activeOppositionActive: boolean;
  onboardingGuideStep: OnboardingGuideStep;
  refresh: () => Promise<SessionDetail>;
  setDetail: Dispatch<SetStateAction<SessionDetail | null>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
  setError: Dispatch<SetStateAction<string>>;
  setTravelLoading: Dispatch<SetStateAction<boolean>>;
  setLongRestLoading: Dispatch<SetStateAction<boolean>>;
  setSpawnLoading: Dispatch<SetStateAction<boolean>>;
  setDismissLoading: Dispatch<SetStateAction<boolean>>;
  setEncounterModalOpen: Dispatch<SetStateAction<boolean>>;
  setLocationView: Dispatch<SetStateAction<"world" | "adventure" | "encounter">>;
  setActiveLocationId: Dispatch<SetStateAction<string>>;
  setEncounterLocationTitle: Dispatch<SetStateAction<string>>;
  setActiveAgentSlot: Dispatch<SetStateAction<number>>;
  setOnboardingGuideStep: Dispatch<SetStateAction<OnboardingGuideStep>>;
};

export function useAdventureActions({
  sessionId,
  activeLocation,
  selectedEncounterMonster,
  encounterQuantity,
  activeAgentSlot,
  activeOppositionActive,
  onboardingGuideStep,
  refresh,
  setDetail,
  setLoading,
  setError,
  setTravelLoading,
  setLongRestLoading,
  setSpawnLoading,
  setDismissLoading,
  setEncounterModalOpen,
  setLocationView,
  setActiveLocationId,
  setEncounterLocationTitle,
  setActiveAgentSlot,
  setOnboardingGuideStep,
}: UseAdventureActionsOptions) {
  async function takeLongRest() {
    if (!sessionId) return;
    setLongRestLoading(true);
    setError("");
    try {
      const refreshed = await api(`/session/${sessionId}/long-rest`, { method: "POST" });
      await refresh();
      return refreshed;
    } catch (e) {
      setError((e as Error).message);
      return null;
    } finally {
      setLongRestLoading(false);
    }
  }

  async function travelToSelectedLocation() {
    if (!sessionId || !activeLocation) return;
    const traveledLocationTitle = activeLocation.title;
    setOnboardingGuideStep((current) => {
      if (current === "travel" && activeLocation.number === 1) return "trigger-encounter";
      if (current !== "complete") return "complete";
      return current;
    });
    setTravelLoading(true);
    setError("");
    try {
      await api(`/session/${sessionId}/travel`, {
        method: "POST",
        body: JSON.stringify({
          location_id: activeLocation.id,
          location_name: activeLocation.title,
          location_description: activeLocation.description,
        }),
      });
      await refresh();
      setEncounterLocationTitle(traveledLocationTitle);
      setLocationView("encounter");
      setActiveLocationId("");
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setTravelLoading(false);
    }
  }

  async function returnToHomeBase() {
    if (!sessionId) return;
    setTravelLoading(true);
    setError("");
    try {
      const sessionSummary = await api<SessionDetail["session"]>(`/session/${sessionId}/return-home-base`, { method: "POST" });
      setDetail((current) => (current ? { ...current, session: sessionSummary } : current));
      await refresh();
      setEncounterLocationTitle("EndGame Antlers Rest Inn");
      setLocationView("encounter");
      setActiveLocationId("");
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setTravelLoading(false);
    }
  }

  async function triggerEncounter() {
    if (!sessionId || !selectedEncounterMonster) return;
    const continueGuideToOppositionPrompt = onboardingGuideStep === "start-encounter";
    setSpawnLoading(true);
    setError("");
    try {
      await api(`/session/${sessionId}/spawn-opposition`, {
        method: "POST",
        body: JSON.stringify({
          monster_type: selectedEncounterMonster.monster_id,
          quantity: encounterQuantity,
        }),
      });
      const refreshed = await refresh();
      setEncounterModalOpen(false);
      setLocationView("encounter");
      setActiveAgentSlot(activeOppositionActive ? activeAgentSlot : (refreshed.session.opposition_state?.active ? OPPOSITION_SLOT : activeAgentSlot));
      setOnboardingGuideStep((current) => (
        continueGuideToOppositionPrompt && current === "start-encounter" && refreshed.session.opposition_state?.active
          ? "opposition-prompt"
          : "complete"
      ));
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setSpawnLoading(false);
    }
  }

  async function fleeEncounter() {
    if (!sessionId) return;
    setDismissLoading(true);
    setError("");
    try {
      await api(`/session/${sessionId}/dismiss-opposition`, { method: "POST" });
      const refreshed = await refresh();
      if (activeAgentSlot === OPPOSITION_SLOT) {
        setActiveAgentSlot(selectableAgentSlotsForDetail(refreshed)[0] ?? 1);
      }
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setDismissLoading(false);
    }
  }

  async function searchLocation() {
    if (!sessionId) return;
    setLoading(true);
    setError("");
    try {
      const sessionSummary = await api<SessionDetail["session"]>(`/session/${sessionId}/search`, {
        method: "POST",
        body: JSON.stringify({ agent_slot: activeAgentSlot, skill: "Perception" }),
      });
      setDetail((current) => (current ? { ...current, session: sessionSummary } : current));
      await refresh();
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  }

  async function useSelectedItem(itemName: string, targetId = "") {
    if (!sessionId || !itemName) return;
    setLoading(true);
    setError("");
    try {
      const sessionSummary = await api<SessionDetail["session"]>(`/session/${sessionId}/use-item`, {
        method: "POST",
        body: JSON.stringify({ agent_slot: activeAgentSlot, item_name: itemName, target_id: targetId || `pc:${activeAgentSlot}` }),
      });
      setDetail((current) => (current ? { ...current, session: sessionSummary } : current));
      await refresh();
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  }

  return {
    takeLongRest,
    travelToSelectedLocation,
    returnToHomeBase,
    triggerEncounter,
    fleeEncounter,
    searchLocation,
    useSelectedItem,
  };
}
