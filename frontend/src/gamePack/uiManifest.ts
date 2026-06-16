import type { MusicCue } from "../constants/audio";

export type GamePackUiManifest = {
  packId: string;
  title: string;
  consoleTitle: string;
  homeBaseName: string;
  prompts: {
    starter: string;
    oppositionStarter: string;
  };
  introAudioUrl: string;
  missionPipPositions: Record<string, { left: number; top: number }>;
  adventurePreviewImages: Record<string, string>;
  adventureTitleOverrides: Record<string, string>;
  encounterVisuals: Record<string, string>;
  encounterNoticeTypes: string[];
  encounterNoticeAudio: Record<string, string>;
  musicTracks: Record<MusicCue, string[]>;
  victorySongs: Record<string, { fileName: string; title: string }>;
};
