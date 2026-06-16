import { Dispatch, SetStateAction, useCallback, useEffect, useRef, useState } from "react";
import { resolveApiUrl } from "../api";
import { ACTIVE_GAME_PACK_UI } from "../gamePack/valaskaManifest";

type UseIntroAudioOptions = {
  tab: 1 | 2 | 3;
  splashOpen: boolean;
  tab1Locked: boolean | undefined;
};

export function useIntroAudio({ tab, splashOpen, tab1Locked }: UseIntroAudioOptions) {
  const introAudioRef = useRef<HTMLAudioElement | null>(null);
  const [introAudioPlayed, setIntroAudioPlayed] = useState(false);

  const stopIntroAudio = useCallback(() => {
    const introAudio = introAudioRef.current;
    if (!introAudio) return;
    introAudio.pause();
    introAudio.currentTime = 0;
  }, []);

  useEffect(() => {
    const introAudio = new Audio(resolveApiUrl(ACTIVE_GAME_PACK_UI.introAudioUrl));
    introAudio.preload = "auto";
    introAudioRef.current = introAudio;
    return () => {
      introAudio.pause();
      introAudioRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (tab !== 2 || splashOpen || introAudioPlayed || !tab1Locked) return;
    const introAudio = introAudioRef.current;
    if (!introAudio) return;
    introAudio.currentTime = 0;
    introAudio.volume = 1;
    setIntroAudioPlayed(true);
    void introAudio.play().catch(() => undefined);
  }, [introAudioPlayed, splashOpen, tab, tab1Locked]);

  return {
    introAudioPlayed,
    setIntroAudioPlayed: setIntroAudioPlayed as Dispatch<SetStateAction<boolean>>,
    stopIntroAudio,
  };
}
