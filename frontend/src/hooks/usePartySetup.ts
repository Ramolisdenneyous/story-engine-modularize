import { Dispatch, SetStateAction } from "react";

type UsePartySetupOptions = {
  adventureId: string;
  selectedPlayerIds: string[];
  setSelectedPlayerIds: Dispatch<SetStateAction<string[]>>;
  classByPlayer: Record<string, string>;
  setClassByPlayer: Dispatch<SetStateAction<Record<string, string>>>;
};

export function usePartySetup({
  adventureId,
  selectedPlayerIds,
  setSelectedPlayerIds,
  classByPlayer,
  setClassByPlayer,
}: UsePartySetupOptions) {
  function togglePlayer(playerId: string) {
    setSelectedPlayerIds((current) => {
      if (current.includes(playerId)) {
        const next = current.filter((item) => item !== playerId);
        setClassByPlayer((map) => {
          const copy = { ...map };
          delete copy[playerId];
          return copy;
        });
        return next;
      }
      if (current.length >= 4) return current;
      return [...current, playerId];
    });
  }

  function setPlayerClass(playerId: string, classId: string) {
    setClassByPlayer((current) => ({ ...current, [playerId]: classId }));
  }

  function applyRecommendedParty() {
    setSelectedPlayerIds(["Joe", "Annie", "Tammey", "Rick"]);
    setClassByPlayer({
      Joe: "Fighter",
      Annie: "Rogue",
      Tammey: "Cleric",
      Rick: "Ranger",
    });
  }

  const startReady =
    adventureId !== "" &&
    selectedPlayerIds.length === 4 &&
    selectedPlayerIds.every((playerId) => Boolean(classByPlayer[playerId]));

  const startRequirements = [
    adventureId === "" ? "select an adventure" : null,
    selectedPlayerIds.length < 4 ? "select four players" : null,
    selectedPlayerIds.some((playerId) => !classByPlayer[playerId]) ? "assign a class to each selected player" : null,
  ].filter(Boolean) as string[];

  const startChapterHint = startRequirements.length
    ? `Before you can start the chapter, please ${startRequirements.join(", ")}.`
    : "Ready to begin the adventure.";

  return {
    togglePlayer,
    setPlayerClass,
    applyRecommendedParty,
    startReady,
    startChapterHint,
  };
}
