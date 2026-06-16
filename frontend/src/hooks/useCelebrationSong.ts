import { useEffect, useState } from "react";
import { CelebrationSongResponse, MissionObjectiveState } from "../appTypes";
import { victorySongForAdventure } from "../gamePack/media";

type UseCelebrationSongOptions = {
  sessionId: string;
  adventureId: string;
  objectiveState: MissionObjectiveState | undefined;
  activeAdventureId: string;
  pauseForCelebration: () => void;
  setError: (error: string) => void;
};

export function useCelebrationSong({
  sessionId,
  adventureId,
  objectiveState,
  activeAdventureId,
  pauseForCelebration,
  setError,
}: UseCelebrationSongOptions) {
  const [celebrationSong, setCelebrationSong] = useState<CelebrationSongResponse | null>(null);
  const [celebrationLoading, setCelebrationLoading] = useState(false);
  const activeCelebrationSong = celebrationSong ?? objectiveState?.celebration_song ?? null;

  useEffect(() => {
    setCelebrationSong(null);
    setCelebrationLoading(false);
  }, [sessionId]);

  async function generateCelebrationSong() {
    const song = victorySongForAdventure(activeAdventureId || adventureId);
    if (!song) {
      setError("No canned victory song is configured for this adventure.");
      return;
    }
    pauseForCelebration();
    setError("");
    setCelebrationLoading(true);
    setCelebrationSong(null);
    window.setTimeout(() => {
      setCelebrationSong(song);
      setCelebrationLoading(false);
    }, 0);
  }

  return {
    activeCelebrationSong,
    celebrationLoading,
    generateCelebrationSong,
  };
}
