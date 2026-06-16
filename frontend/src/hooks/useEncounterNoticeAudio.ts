import { MutableRefObject, useEffect, useRef, useState } from "react";
import { SessionDetail, TranscriptEvent } from "../appTypes";
import { encounterNoticeAudioUrl, encounterVisualUrl, isEncounterNoticeEvent } from "../gamePack/media";

type UseEncounterNoticeAudioOptions = {
  detail: SessionDetail | null;
  adventureId: string;
  sessionId: string;
  encounterNoticePlayingRef: MutableRefObject<boolean>;
  onInterruptSpeech: () => void;
  onStopIntroAudio: () => void;
  onResumeSpeechQueue: () => void;
  onAudioError: (message: string) => void;
};

export function useEncounterNoticeAudio({
  detail,
  adventureId,
  sessionId,
  encounterNoticePlayingRef,
  onInterruptSpeech,
  onStopIntroAudio,
  onResumeSpeechQueue,
  onAudioError,
}: UseEncounterNoticeAudioOptions) {
  const encounterNoticeAudioRef = useRef<HTMLAudioElement | null>(null);
  const encounterNoticeBaselineReadyRef = useRef(false);
  const playedEncounterNoticeEventIdsRef = useRef<Set<string>>(new Set());
  const [encounterNoticeImageUrl, setEncounterNoticeImageUrl] = useState("");

  function playEncounterNoticeAudio(event: TranscriptEvent) {
    const payload = event.json_payload ?? {};
    const locationId = typeof payload.location_id === "string" ? payload.location_id : "";
    const currentAdventureId = detail?.tab1.adventure_id || adventureId;
    const audioUrl = encounterNoticeAudioUrl(currentAdventureId, locationId);
    if (!audioUrl) return;
    const visualUrl = encounterVisualUrl(currentAdventureId, locationId);

    onInterruptSpeech();
    onStopIntroAudio();

    encounterNoticeAudioRef.current?.pause();
    const audio = new Audio(audioUrl);
    audio.preload = "auto";
    audio.volume = 1;
    encounterNoticeAudioRef.current = audio;
    encounterNoticePlayingRef.current = true;
    setEncounterNoticeImageUrl(visualUrl);

    const finish = () => {
      audio.removeEventListener("ended", finish);
      audio.removeEventListener("error", finish);
      audio.removeEventListener("pause", finish);
      if (encounterNoticeAudioRef.current === audio) {
        encounterNoticeAudioRef.current = null;
        setEncounterNoticeImageUrl("");
      }
      encounterNoticePlayingRef.current = false;
      onResumeSpeechQueue();
    };

    audio.addEventListener("ended", finish, { once: true });
    audio.addEventListener("error", finish, { once: true });
    audio.addEventListener("pause", finish, { once: true });
    audio.play().catch((e: Error) => {
      onAudioError(e.message);
      finish();
    });
  }

  useEffect(() => {
    if (!detail) return;
    const eligibleEvents = detail.events.filter(isEncounterNoticeEvent);
    if (!encounterNoticeBaselineReadyRef.current) {
      eligibleEvents.forEach((event) => playedEncounterNoticeEventIdsRef.current.add(event.event_id));
      encounterNoticeBaselineReadyRef.current = true;
      return;
    }

    const nextEvent = eligibleEvents.find((event) => !playedEncounterNoticeEventIdsRef.current.has(event.event_id));
    if (!nextEvent) return;
    playedEncounterNoticeEventIdsRef.current.add(nextEvent.event_id);
    playEncounterNoticeAudio(nextEvent);
  }, [detail?.events.length, adventureId]);

  useEffect(() => {
    return () => {
      encounterNoticeAudioRef.current?.pause();
      encounterNoticeAudioRef.current = null;
    };
  }, []);

  useEffect(() => {
    encounterNoticeAudioRef.current?.pause();
    encounterNoticeAudioRef.current = null;
    encounterNoticePlayingRef.current = false;
    setEncounterNoticeImageUrl("");
    encounterNoticeBaselineReadyRef.current = false;
    playedEncounterNoticeEventIdsRef.current.clear();
  }, [sessionId]);

  return {
    encounterNoticeImageUrl,
  };
}
