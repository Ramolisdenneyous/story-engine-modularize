import { useEffect, useMemo, useRef, useState } from "react";
import { MUSIC_DUCKED_VOLUME, MUSIC_VOLUME, type MusicCue } from "../constants/audio";
import { TtsState } from "../appTypes";
import { ACTIVE_GAME_PACK_UI } from "../gamePack/valaskaManifest";
import { resolveApiUrl } from "../api";

type UseBackgroundMusicOptions = {
  musicCue: MusicCue;
  ttsState: TtsState;
};

export function useBackgroundMusic({ musicCue, ttsState }: UseBackgroundMusicOptions) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const previousMusicCueRef = useRef<MusicCue>("inn");
  const [musicTrackIndex, setMusicTrackIndex] = useState(0);
  const [musicPlaying, setMusicPlaying] = useState(true);
  const [musicMuted, setMusicMuted] = useState(false);
  const [musicAutoplayBlocked, setMusicAutoplayBlocked] = useState(false);

  const currentMusicTracks = useMemo(
    () => ACTIVE_GAME_PACK_UI.musicTracks[musicCue].map((fileName) => resolveApiUrl(`/music/${encodeURIComponent(fileName)}`)),
    [musicCue],
  );
  const currentTrack = currentMusicTracks[musicTrackIndex % currentMusicTracks.length] ?? currentMusicTracks[0] ?? "";

  useEffect(() => {
    if (previousMusicCueRef.current === musicCue) return;
    previousMusicCueRef.current = musicCue;
    setMusicTrackIndex(0);
  }, [musicCue]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentTrack) return;
    audio.load();
    audio.volume = MUSIC_VOLUME;
    audio.muted = musicMuted;
    if (!musicPlaying) {
      audio.pause();
      return;
    }
    void audio.play()
      .then(() => setMusicAutoplayBlocked(false))
      .catch(() => {
        audio.pause();
        setMusicPlaying(false);
        setMusicAutoplayBlocked(true);
      });
  }, [currentTrack, musicPlaying, musicMuted]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = ttsState === "playing" ? MUSIC_DUCKED_VOLUME : MUSIC_VOLUME;
  }, [ttsState]);

  async function enableMusicPlayback() {
    const audio = audioRef.current;
    if (!audio) return;
    try {
      audio.volume = ttsState === "playing" ? MUSIC_DUCKED_VOLUME : MUSIC_VOLUME;
      audio.muted = musicMuted;
      await audio.play();
      setMusicPlaying(true);
      setMusicAutoplayBlocked(false);
    } catch {
      setMusicAutoplayBlocked(true);
    }
  }

  function toggleMusicPlayback() {
    const audio = audioRef.current;
    if (!audio) return;
    if (musicPlaying) {
      audio.pause();
      setMusicPlaying(false);
      setMusicAutoplayBlocked(false);
      return;
    }
    void enableMusicPlayback();
  }

  function toggleMusicMuted() {
    const audio = audioRef.current;
    const nextMuted = !musicMuted;
    if (audio) {
      audio.muted = nextMuted;
    }
    setMusicMuted(nextMuted);
  }

  function advanceMusicTrack() {
    setMusicTrackIndex((current) => (current + 1) % currentMusicTracks.length);
  }

  function pauseForCelebration() {
    const audio = audioRef.current;
    audio?.pause();
    setMusicPlaying(false);
    setMusicAutoplayBlocked(false);
  }

  return {
    audioRef,
    currentMusicTracks,
    currentTrack,
    musicPlaying,
    musicMuted,
    musicAutoplayBlocked,
    toggleMusicPlayback,
    toggleMusicMuted,
    advanceMusicTrack,
    pauseForCelebration,
  };
}
