import type { GamePackUiManifest } from "./uiManifest";

export const VALASKA_GAME_PACK_UI = {
  packId: "valaska",
  title: "Valaska",
  consoleTitle: "Valaska Adventure Console",
  homeBaseName: "Moosehearth",
  prompts: {
    starter: "Party leader, you know this mission, what is your plan?",
    oppositionStarter: "The monster gets the drop on the party, and attacks!",
  },
  introAudioUrl: "/audio/valaska-intro.mp3",
  missionPipPositions: {
    "icebane-castle": { left: 90, top: 18 },
    "east-marsh-raid": { left: 75, top: 37 },
    "telas-wagons": { left: 63, top: 58 },
    "old-people-barrow": { left: 36, top: 47 },
    "collecting-taxes": { left: 59, top: 73 },
    "endless-glacier-undead": { left: 34, top: 12 },
  },
  adventurePreviewImages: {
    "icebane-castle": "/assets/Preview-Adventure1.webp",
    "east-marsh-raid": "/assets/Preview-Adventure2.webp",
    "telas-wagons": "/assets/Preview-Adventure3.webp",
    "old-people-barrow": "/assets/Preview-Adventure4.webp",
    "collecting-taxes": "/assets/Preview-Adventure5.webp",
    "endless-glacier-undead": "/assets/Preview-Adventure6.webp",
  },
  adventureTitleOverrides: {
    "icebane-castle": "Memories of the Witch King",
    "east-marsh-raid": "Blood at Midnight",
    "telas-wagons": "To Follow the King's Way",
    "old-people-barrow": "The Dead Remember",
    "collecting-taxes": "Collecting What's Owed",
    "endless-glacier-undead": "Nightmares of the Thawed",
  },
  encounterVisuals: {
    "icebane-castle:loc-3": "Encounter-The-Collapsed-Barracks-TRAP.webp",
    "east-marsh-raid:loc-6": "Encounter-The Fog-Choked Escape Channel-Hazard.webp",
    "telas-wagons:loc-1": "Encounter-The Western Tundra Stretch-Hazard.webp",
    "old-people-barrow:loc-1": "Encounter-The Frost-Cleft Entrance-TRAP.webp",
    "old-people-barrow:loc-6": "Encounter-The Fractured Escape Tunnel-Hazard.webp",
    "endless-glacier-undead:loc-1": "Encounter-Everflame Abbey-NPC.webp",
  },
  encounterNoticeTypes: ["trap", "hazard", "story"],
  encounterNoticeAudio: {
    "icebane-castle:loc-3": "icebane-castle-loc-3-rolling-stone-boulders.mp3",
    "east-marsh-raid:loc-1": "east-marsh-raid-loc-1-blackwater-approach.mp3",
    "east-marsh-raid:loc-2": "east-marsh-raid-loc-2-watcher-s-rise.mp3",
    "east-marsh-raid:loc-3": "east-marsh-raid-loc-3-outer-camp-ring.mp3",
    "east-marsh-raid:loc-4": "east-marsh-raid-loc-4-supply-cache-pit.mp3",
    "east-marsh-raid:loc-6": "east-marsh-raid-loc-6-fog-choked-escape-channel.mp3",
    "telas-wagons:loc-1": "telas-wagons-loc-1-mud-stuck-wagon.mp3",
    "telas-wagons:loc-6": "telas-wagons-loc-6-glockstead-approach.mp3",
    "old-people-barrow:loc-1": "old-people-barrow-loc-1-rolling-stone-boulders.mp3",
    "old-people-barrow:loc-4": "old-people-barrow-loc-4-puzzle-door.mp3",
    "old-people-barrow:loc-6": "old-people-barrow-loc-6-steep-cliffside.mp3",
    "endless-glacier-undead:loc-1": "endless-glacier-undead-loc-1-everflame-abbey.mp3",
  },
  musicTracks: {
    inn: [
      "Citadel of Rusted Banners.mp3",
      "Citadel of Rusted Banners (1).mp3",
    ],
    adventure: ["Cursed Village Menu (1).mp3"],
    combat: ["Cursed Village Menu.mp3"],
    victory: ["Gallows of the Forgotten King.mp3"],
  },
  victorySongs: {
    "icebane-castle": { fileName: "icebane-castle-victory.mp3", title: "The Crown Beneath the Frost" },
    "east-marsh-raid": { fileName: "east-marsh-raid-victory.mp3", title: "Before the Dawn" },
    "telas-wagons": { fileName: "telas-wagons-victory.mp3", title: "Hold the King's Way" },
    "old-people-barrow": { fileName: "old-people-barrow-victory.mp3", title: "The Dead Remember" },
    "collecting-taxes": { fileName: "collecting-taxes-victory.mp3", title: "Four Hundred on the King's Road" },
    "endless-glacier-undead": { fileName: "endless-glacier-undead-victory.mp3", title: "Lay Them Down in Ice" },
  },
} satisfies GamePackUiManifest;

export const ACTIVE_GAME_PACK_UI: GamePackUiManifest = VALASKA_GAME_PACK_UI;
