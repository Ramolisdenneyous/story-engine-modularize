import { Dispatch, SetStateAction } from "react";
import { api } from "../api";
import { Adventure, SessionDetail } from "../appTypes";
import { OnboardingGuideStep } from "../constants/onboarding";

type UsePreparationActionsOptions = {
  sessionId: string;
  adventureId: string;
  selectedPlayerIds: string[];
  classByPlayer: Record<string, string>;
  refresh: () => Promise<SessionDetail>;
  setDetail: Dispatch<SetStateAction<SessionDetail | null>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
  setError: Dispatch<SetStateAction<string>>;
  setTab: Dispatch<SetStateAction<1 | 2 | 3>>;
  setChapterStarting: Dispatch<SetStateAction<boolean>>;
  setPlayedAttackEventIds: Dispatch<SetStateAction<string[]>>;
  setStarterPromptDismissed: Dispatch<SetStateAction<boolean>>;
  setIntroAudioPlayed: Dispatch<SetStateAction<boolean>>;
  setOnboardingGuideStep: Dispatch<SetStateAction<OnboardingGuideStep>>;
  cacheActiveAdventure: (adventure: Adventure | null | undefined) => void;
};

export function usePreparationActions({
  sessionId,
  adventureId,
  selectedPlayerIds,
  classByPlayer,
  refresh,
  setDetail,
  setLoading,
  setError,
  setTab,
  setChapterStarting,
  setPlayedAttackEventIds,
  setStarterPromptDismissed,
  setIntroAudioPlayed,
  setOnboardingGuideStep,
  cacheActiveAdventure,
}: UsePreparationActionsOptions) {
  async function saveTab1(showSpinner = true) {
    if (!sessionId) return null;
    if (showSpinner) {
      setLoading(true);
    }
    setError("");
    try {
      const classAssignments = Object.fromEntries(
        selectedPlayerIds.map((playerId, index) => [String(index + 1), classByPlayer[playerId] ?? ""]),
      );
      const tab1Data = await api<SessionDetail["tab1"]>(`/session/${sessionId}/tab1`, {
        method: "PUT",
        body: JSON.stringify({
          preset_id: "valaska",
          adventure_id: adventureId,
          selected_player_ids: selectedPlayerIds,
          class_assignments: classAssignments,
        }),
      });
      cacheActiveAdventure(tab1Data.active_adventure);
      setDetail((current) => (current ? { ...current, tab1: tab1Data } : current));
      return tab1Data;
    } catch (e) {
      setError((e as Error).message);
      return null;
    } finally {
      if (showSpinner) {
        setLoading(false);
      }
    }
  }

  async function startChapter() {
    if (!sessionId) return;
    setChapterStarting(true);
    setLoading(true);
    setError("");
    try {
      const tab1Data = await saveTab1(false);
      if (!tab1Data) {
        return;
      }
      const sessionSummary = await api<SessionDetail["session"]>(`/session/${sessionId}/lock`, { method: "POST" });
      setDetail((current) => (current ? { ...current, session: sessionSummary, tab1: tab1Data } : current));
      setTab(2);
      setPlayedAttackEventIds([]);
      setStarterPromptDismissed(false);
      setIntroAudioPlayed(false);
      void refresh();
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setChapterStarting(false);
      setLoading(false);
    }
  }

  async function endChapter() {
    setLoading(true);
    try {
      await api(`/session/${sessionId}/end`, { method: "POST" });
      await refresh();
      setTab(3);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  }

  async function resetChapter() {
    if (!window.confirm("Reset the current session?")) return;
    setLoading(true);
    try {
      await api(`/session/${sessionId}/reset`, { method: "POST" });
      setPlayedAttackEventIds([]);
      setStarterPromptDismissed(false);
      setIntroAudioPlayed(false);
      setOnboardingGuideStep("starter");
      await refresh();
      setTab(1);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  }

  return {
    saveTab1,
    startChapter,
    endChapter,
    resetChapter,
  };
}
