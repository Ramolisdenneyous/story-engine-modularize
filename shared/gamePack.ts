export type GamePackMetadata = {
  pack_id: string;
  name: string;
};

export type GamePackShape = {
  metadata: GamePackMetadata;
  players: Record<string, unknown>;
  classes: Record<string, unknown>;
  monsters: Record<string, unknown>;
  adventures: Record<string, unknown>;
  adventure_paths: Record<string, string[]>;
  encounters: Record<string, unknown>;
  traps: Record<string, unknown>;
  hazards: Record<string, unknown>;
  assets: Record<string, string>;
};

export type MusicCue = "inn" | "adventure" | "combat" | "victory";

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
