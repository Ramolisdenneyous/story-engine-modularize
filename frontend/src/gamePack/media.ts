import { resolveApiUrl } from "../api";
import { CelebrationSongResponse, TranscriptEvent } from "../appTypes";
import { ACTIVE_GAME_PACK_UI } from "./valaskaManifest";

export function youtubeEmbedUrl(rawUrl: string) {
  const value = rawUrl.trim();
  if (!value) return "";
  const buildEmbedUrl = (videoId: string) => {
    const embedUrl = new URL(`https://www.youtube-nocookie.com/embed/${videoId}`);
    embedUrl.searchParams.set("controls", "0");
    embedUrl.searchParams.set("rel", "0");
    embedUrl.searchParams.set("playsinline", "1");
    embedUrl.searchParams.set("modestbranding", "1");
    embedUrl.searchParams.set("iv_load_policy", "3");
    return embedUrl.toString();
  };
  try {
    const parsed = new URL(value);
    const host = parsed.hostname.replace(/^www\./, "");
    if (host === "youtu.be") {
      const videoId = parsed.pathname.split("/").filter(Boolean)[0] ?? "";
      return videoId ? buildEmbedUrl(videoId) : "";
    }
    if (host === "youtube.com" || host === "m.youtube.com" || host === "music.youtube.com") {
      if (parsed.pathname.startsWith("/embed/")) {
        const videoId = parsed.pathname.split("/").filter(Boolean)[1] ?? "";
        return videoId ? buildEmbedUrl(videoId) : "";
      }
      const videoId = parsed.searchParams.get("v") ?? "";
      return videoId ? buildEmbedUrl(videoId) : "";
    }
  } catch {
    return "";
  }
  return "";
}

export function locationImageSlug(name: string) {
  return name
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u2018\u2019']/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function locationImageUrl(title: string) {
  const slug = locationImageSlug(title);
  return `/assets/Location-${slug}.webp`;
}

export function encounterNoticeAudioUrl(adventureId: string, locationId: string) {
  const fileName = ACTIVE_GAME_PACK_UI.encounterNoticeAudio[`${adventureId}:${locationId}`];
  return fileName ? resolveApiUrl(`/audio/noncombat-encounter-notices/${encodeURIComponent(fileName)}`) : "";
}

export function encounterVisualUrl(adventureId: string, locationId: string) {
  const fileName = ACTIVE_GAME_PACK_UI.encounterVisuals[`${adventureId}:${locationId}`];
  return fileName ? `/assets/${fileName}` : "";
}

export function victorySongForAdventure(adventureId: string): CelebrationSongResponse | null {
  const song = ACTIVE_GAME_PACK_UI.victorySongs[adventureId];
  if (!song) return null;
  return {
    status: "complete",
    lyrics: "",
    prompt_text: song.title,
    audio_url: `/audio/victory-songs/${song.fileName}`,
    file_name: song.fileName,
    error: "",
  };
}

export function isEncounterNoticeEvent(event: TranscriptEvent) {
  const payload = event.json_payload ?? {};
  const source = typeof payload.source === "string" ? payload.source : "";
  const encounterType = typeof payload.encounter_type === "string" ? payload.encounter_type : "";
  const locationId = typeof payload.location_id === "string" ? payload.location_id : "";
  return event.role === "system"
    && event.kind === "transcript"
    && source === "encounter_start"
    && ACTIVE_GAME_PACK_UI.encounterNoticeTypes.includes(encounterType)
    && Boolean(locationId);
}
