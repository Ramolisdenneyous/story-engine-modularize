import type { TtsState } from "../appTypes";

export type MusicCue = "inn" | "adventure" | "combat" | "victory";

export const MUSIC_CUE_LABELS: Record<MusicCue, string> = {
  inn: "Inn",
  adventure: "Adventure",
  combat: "Combat",
  victory: "Victory",
};

export const TTS_STATUS_LABELS = {
  idle: "Idle",
  loading: "Loading",
  playing: "Playing",
} as const satisfies Record<TtsState, string>;

export const MUSIC_VOLUME = 0.014;
export const MUSIC_DUCKED_VOLUME = 0.006;
export const TTS_REQUEST_TIMEOUT_MS = 25000;
export const TTS_QUEUE_LIMIT = 3;

export const TTS_PLAYER_GAIN: Record<string, number> = {
  Beau: 1,
  Joe: 1,
  Annie: 1.05,
  Rick: 1.05,
  Sam: 1.05,
  Tom: 1.05,
  Tammey: 1.35,
  Jannet: 1.35,
};
