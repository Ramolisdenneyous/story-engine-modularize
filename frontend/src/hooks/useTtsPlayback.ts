import { MutableRefObject, useEffect, useRef, useState } from "react";
import { apiBlob } from "../api";
import { OPPOSITION_SLOT, TranscriptEvent, TtsState } from "../appTypes";
import { TTS_PLAYER_GAIN, TTS_QUEUE_LIMIT, TTS_REQUEST_TIMEOUT_MS } from "../constants/audio";

type UseTtsPlaybackOptions = {
  sessionId: string;
  transcript: TranscriptEvent[];
  latestEligibleReply: TranscriptEvent | null;
  playerNameBySlot: Map<number, string>;
  encounterNoticePlayingRef: MutableRefObject<boolean>;
  onSpeechStarted?: () => void;
};

export function useTtsPlayback({
  sessionId,
  transcript,
  latestEligibleReply,
  playerNameBySlot,
  encounterNoticePlayingRef,
  onSpeechStarted,
}: UseTtsPlaybackOptions) {
  const speechAudioRef = useRef<HTMLAudioElement | null>(null);
  const speechAudioContextRef = useRef<AudioContext | null>(null);
  const speechGainNodeRef = useRef<GainNode | null>(null);
  const speechSourceNodeRef = useRef<MediaElementAudioSourceNode | null>(null);
  const speechObjectUrlRef = useRef<string | null>(null);
  const speechAbortRef = useRef<AbortController | null>(null);
  const autoPlayBaselineRef = useRef<string | null>(null);
  const ttsQueueRef = useRef<TranscriptEvent[]>([]);
  const ttsQueuedEventIdsRef = useRef<Set<string>>(new Set());
  const ttsPreloadPromisesRef = useRef<Map<string, Promise<string>>>(new Map());
  const ttsPreloadControllersRef = useRef<Map<string, AbortController>>(new Map());
  const ttsPreloadObjectUrlsRef = useRef<Set<string>>(new Set());
  const ttsProcessingRef = useRef(false);
  const ttsAutoPlayRef = useRef(true);
  const ttsQueueRunRef = useRef(0);

  const [ttsAutoPlay, setTtsAutoPlay] = useState(true);
  const [ttsState, setTtsState] = useState<TtsState>("idle");
  const [ttsError, setTtsError] = useState("");
  const [currentTtsReply, setCurrentTtsReply] = useState<TranscriptEvent | null>(null);

  useEffect(() => {
    const speechAudio = new Audio();
    speechAudioRef.current = speechAudio;
    const onEnded = () => setTtsState("idle");
    const onPause = () => setTtsState((current) => (current === "playing" ? "idle" : current));
    speechAudio.addEventListener("ended", onEnded);
    speechAudio.addEventListener("pause", onPause);
    return () => {
      speechAudio.pause();
      speechAudio.removeEventListener("ended", onEnded);
      speechAudio.removeEventListener("pause", onPause);
      speechSourceNodeRef.current?.disconnect();
      speechGainNodeRef.current?.disconnect();
      void speechAudioContextRef.current?.close();
      speechAbortRef.current?.abort();
      if (speechObjectUrlRef.current) {
        URL.revokeObjectURL(speechObjectUrlRef.current);
      }
    };
  }, []);

  useEffect(() => {
    ttsAutoPlayRef.current = ttsAutoPlay;
  }, [ttsAutoPlay]);

  function clearTtsQueue() {
    ttsQueueRef.current = [];
    ttsQueuedEventIdsRef.current.clear();
    ttsPreloadControllersRef.current.forEach((controller) => controller.abort());
    ttsPreloadControllersRef.current.clear();
    ttsPreloadPromisesRef.current.clear();
    ttsPreloadObjectUrlsRef.current.forEach((objectUrl) => URL.revokeObjectURL(objectUrl));
    ttsPreloadObjectUrlsRef.current.clear();
  }

  function stopSpeechPlayback(clearQueue = false) {
    if (clearQueue) {
      ttsQueueRunRef.current += 1;
      clearTtsQueue();
      ttsProcessingRef.current = false;
    }
    speechAbortRef.current?.abort();
    speechAbortRef.current = null;
    if (speechAudioRef.current) {
      speechAudioRef.current.pause();
      speechAudioRef.current.currentTime = 0;
      speechAudioRef.current.src = "";
    }
    if (speechObjectUrlRef.current) {
      URL.revokeObjectURL(speechObjectUrlRef.current);
      speechObjectUrlRef.current = null;
    }
    setCurrentTtsReply(null);
    setTtsState("idle");
  }

  async function ensureSpeechGainChain() {
    if (!speechAudioRef.current) {
      speechAudioRef.current = new Audio();
    }
    if (!speechAudioContextRef.current) {
      speechAudioContextRef.current = new AudioContext();
    }
    if (!speechGainNodeRef.current) {
      speechGainNodeRef.current = speechAudioContextRef.current.createGain();
      speechGainNodeRef.current.connect(speechAudioContextRef.current.destination);
    }
    if (!speechSourceNodeRef.current) {
      speechSourceNodeRef.current = speechAudioContextRef.current.createMediaElementSource(speechAudioRef.current);
      speechSourceNodeRef.current.connect(speechGainNodeRef.current);
    }
    if (speechAudioContextRef.current.state === "suspended") {
      await speechAudioContextRef.current.resume();
    }
  }

  function playerNameForReply(reply: TranscriptEvent) {
    return reply.agent_slot === OPPOSITION_SLOT
      ? "Opposition"
      : reply.agent_slot
        ? playerNameBySlot.get(reply.agent_slot) ?? ""
        : "";
  }

  function preloadTtsReply(reply: TranscriptEvent) {
    if (!reply.event_id || !reply.text.trim() || !sessionId) {
      return Promise.resolve("");
    }
    const existing = ttsPreloadPromisesRef.current.get(reply.event_id);
    if (existing) {
      return existing;
    }
    const playerName = playerNameForReply(reply);
    if (!playerName) {
      return Promise.resolve("");
    }
    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => {
      controller.abort();
    }, TTS_REQUEST_TIMEOUT_MS);
    ttsPreloadControllersRef.current.set(reply.event_id, controller);
    const promise = (async () => {
      try {
        const blob = await apiBlob(`/session/${sessionId}/tts`, {
          method: "POST",
          body: JSON.stringify({
            text: reply.text,
            player_name: playerName,
          }),
          signal: controller.signal,
        });
        const objectUrl = URL.createObjectURL(blob);
        ttsPreloadObjectUrlsRef.current.add(objectUrl);
        return objectUrl;
      } catch (e) {
        if ((e as Error).name !== "AbortError") {
          setTtsError((e as Error).message);
        }
        return "";
      } finally {
        window.clearTimeout(timeoutId);
        ttsPreloadControllersRef.current.delete(reply.event_id);
      }
    })();
    ttsPreloadPromisesRef.current.set(reply.event_id, promise);
    return promise;
  }

  async function playPreparedReply(reply: TranscriptEvent, objectUrl: string) {
    if (!objectUrl) {
      setTtsState("idle");
      return;
    }
    ttsPreloadObjectUrlsRef.current.delete(objectUrl);
    speechObjectUrlRef.current = objectUrl;
    if (!speechAudioRef.current) {
      speechAudioRef.current = new Audio();
    }
    try {
      await ensureSpeechGainChain();
      if (speechGainNodeRef.current) {
        speechGainNodeRef.current.gain.value = TTS_PLAYER_GAIN[playerNameForReply(reply)] ?? 1;
      }
      speechAudioRef.current.volume = 1;
      speechAudioRef.current.src = objectUrl;
      setCurrentTtsReply(reply);
      const ended = new Promise<void>((resolve) => {
        const audio = speechAudioRef.current;
        if (!audio) {
          resolve();
          return;
        }
        const finish = () => {
          audio.removeEventListener("ended", finish);
          audio.removeEventListener("pause", finish);
          resolve();
        };
        audio.addEventListener("ended", finish, { once: true });
        audio.addEventListener("pause", finish, { once: true });
      });
      await speechAudioRef.current.play();
      onSpeechStarted?.();
      setTtsState("playing");
      await ended;
    } catch (e) {
      if ((e as Error).name === "AbortError") {
        setTtsState("idle");
        return;
      }
      setTtsError((e as Error).message);
      setTtsState("idle");
    } finally {
      if (reply.event_id) {
        ttsPreloadPromisesRef.current.delete(reply.event_id);
      }
      if (speechObjectUrlRef.current === objectUrl) {
        URL.revokeObjectURL(objectUrl);
        speechObjectUrlRef.current = null;
      }
      setCurrentTtsReply((current) => (current?.event_id === reply.event_id ? null : current));
      setTtsState("idle");
    }
  }

  async function playReply(reply = latestEligibleReply, interrupt = true) {
    if (!reply || !reply.text.trim() || !sessionId || !playerNameForReply(reply)) return;
    if (interrupt) {
      stopSpeechPlayback(true);
    }
    setTtsError("");
    setTtsState("loading");
    try {
      const objectUrl = await preloadTtsReply(reply);
      await playPreparedReply(reply, objectUrl);
    } catch (e) {
      if ((e as Error).name !== "AbortError") {
        setTtsError((e as Error).message);
      }
      setTtsState("idle");
    }
  }

  async function drainTtsQueue() {
    if (ttsProcessingRef.current || !ttsAutoPlayRef.current || encounterNoticePlayingRef.current) return;
    const runToken = ttsQueueRunRef.current;
    ttsProcessingRef.current = true;
    try {
      while (ttsAutoPlayRef.current && runToken === ttsQueueRunRef.current && !encounterNoticePlayingRef.current && ttsQueueRef.current.length) {
        const next = ttsQueueRef.current.shift();
        if (!next) break;
        try {
          setTtsState("loading");
          const objectUrl = await preloadTtsReply(next);
          if (!ttsAutoPlayRef.current || runToken !== ttsQueueRunRef.current || encounterNoticePlayingRef.current) {
            if (objectUrl) {
              ttsPreloadObjectUrlsRef.current.delete(objectUrl);
              URL.revokeObjectURL(objectUrl);
            }
            setTtsState("idle");
            break;
          }
          await playPreparedReply(next, objectUrl);
        } catch (e) {
          if ((e as Error).name !== "AbortError") {
            setTtsError((e as Error).message);
          }
          setTtsState("idle");
        }
      }
    } finally {
      ttsProcessingRef.current = false;
      if (ttsAutoPlayRef.current && !encounterNoticePlayingRef.current && ttsQueueRef.current.length) {
        void drainTtsQueue();
      }
    }
  }

  function enqueueTtsReplies(replies: TranscriptEvent[]) {
    if (!ttsAutoPlayRef.current) return;
    replies.forEach((reply) => {
      if (!reply.event_id || ttsQueuedEventIdsRef.current.has(reply.event_id)) return;
      if (ttsQueueRef.current.length >= TTS_QUEUE_LIMIT) return;
      ttsQueuedEventIdsRef.current.add(reply.event_id);
      ttsQueueRef.current.push(reply);
      void preloadTtsReply(reply);
    });
    void drainTtsQueue();
  }

  function resumeQueuedTts() {
    if (ttsAutoPlayRef.current && ttsQueueRef.current.length) {
      void drainTtsQueue();
    }
  }

  useEffect(() => {
    if (!latestEligibleReply?.event_id) return;
    if (!ttsAutoPlay) {
      autoPlayBaselineRef.current = latestEligibleReply.event_id;
      return;
    }
    if (autoPlayBaselineRef.current === null) {
      autoPlayBaselineRef.current = latestEligibleReply.event_id;
      enqueueTtsReplies([latestEligibleReply]);
      return;
    }
    const baselineIndex = transcript.findIndex((event) => event.event_id === autoPlayBaselineRef.current);
    const newReplies = transcript
      .slice(baselineIndex >= 0 ? baselineIndex + 1 : 0)
      .filter((event) => event.role === "agent" && event.text.trim())
      .slice(0, 2);
    if (!newReplies.length) {
      return;
    }
    autoPlayBaselineRef.current = latestEligibleReply.event_id;
    enqueueTtsReplies(newReplies);
  }, [latestEligibleReply?.event_id, transcript.length, ttsAutoPlay]);

  function toggleTtsAutoPlay() {
    setTtsAutoPlay((current) => {
      const next = !current;
      ttsAutoPlayRef.current = next;
      autoPlayBaselineRef.current = latestEligibleReply?.event_id ?? null;
      if (!next) {
        stopSpeechPlayback(true);
      } else if (ttsQueueRef.current.length) {
        void drainTtsQueue();
      }
      return next;
    });
  }

  return {
    ttsAutoPlay,
    ttsState,
    ttsError,
    currentTtsReply,
    playReply,
    stopSpeechPlayback,
    resumeQueuedTts,
    setTtsError,
    toggleTtsAutoPlay,
  };
}
