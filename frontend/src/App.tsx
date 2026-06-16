import { FormEvent, useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Adventure,
  AdventureSummary,
  Monster,
  OPPOSITION_SLOT,
} from "./appTypes";
import { AdventureTab } from "./components/AdventureTab";
import { FeedbackTab } from "./components/FeedbackTab";
import { PreparationTab } from "./components/PreparationTab";
import {
  MUSIC_CUE_LABELS,
  TTS_STATUS_LABELS,
  type MusicCue,
} from "./constants/audio";
import { TUTORIAL_VIDEO_URL, type OnboardingGuideStep } from "./constants/onboarding";
import { useBackgroundMusic } from "./hooks/useBackgroundMusic";
import { useAdventureActions } from "./hooks/useAdventureActions";
import { useCelebrationSong } from "./hooks/useCelebrationSong";
import { useEncounterNoticeAudio } from "./hooks/useEncounterNoticeAudio";
import { useEncounterSelection } from "./hooks/useEncounterSelection";
import { useFeedbackActions } from "./hooks/useFeedbackActions";
import { useIntroAudio } from "./hooks/useIntroAudio";
import { usePartySetup } from "./hooks/usePartySetup";
import { usePreparationActions } from "./hooks/usePreparationActions";
import { usePromptFlow } from "./hooks/usePromptFlow";
import { useSessionWorkspace } from "./hooks/useSessionWorkspace";
import { useTtsPlayback } from "./hooks/useTtsPlayback";
import {
  encounterVisualUrl,
  locationImageUrl,
  youtubeEmbedUrl,
} from "./gamePack/media";
import { ACTIVE_GAME_PACK_UI } from "./gamePack/valaskaManifest";
import { sanitizeVisibleAgentText } from "./sessionView";

export function App() {
  const encounterNoticePlayingRef = useRef(false);
  const transcriptRef = useRef<HTMLDivElement>(null);
  const adventureTabTopRef = useRef<HTMLDivElement | null>(null);

  const [tab, setTab] = useState<1 | 2 | 3>(1);
  const [chapterStarting, setChapterStarting] = useState(false);
  const [chapterLoadingFrame, setChapterLoadingFrame] = useState(0);
  const [activeAgentSlot, setActiveAgentSlot] = useState(1);
  const [activeLocationId, setActiveLocationId] = useState("");
  const [userPrompt, setUserPrompt] = useState("");
  const [starterPromptDismissed, setStarterPromptDismissed] = useState(false);
  const [travelLoading, setTravelLoading] = useState(false);
  const [longRestLoading, setLongRestLoading] = useState(false);
  const [encounterModalOpen, setEncounterModalOpen] = useState(false);
  const [spawnLoading, setSpawnLoading] = useState(false);
  const [dismissLoading, setDismissLoading] = useState(false);
  const [locationView, setLocationView] = useState<"world" | "adventure" | "encounter">("world");
  const [encounterLocationTitle, setEncounterLocationTitle] = useState("Antlers Rest Inn");
  const [playedAttackEventIds, setPlayedAttackEventIds] = useState<string[]>([]);
  const [animationLocked, setAnimationLocked] = useState(false);
  const [onboardingGuideStep, setOnboardingGuideStep] = useState<OnboardingGuideStep>("starter");
  const [splashOpen, setSplashOpen] = useState(() => window.localStorage.getItem("story-engine-mk5-splash-seen") !== "true");
  const handleSessionCreated = useCallback(() => {
    setPlayedAttackEventIds([]);
    setStarterPromptDismissed(false);
    setIntroAudioPlayed(false);
  }, []);
  const {
    catalogBoot,
    adventureDetailsById,
    sessionId,
    detail,
    setDetail,
    loading,
    setLoading,
    error,
    setError,
    adventureId,
    setAdventureId,
    selectedPlayerIds,
    setSelectedPlayerIds,
    classByPlayer,
    setClassByPlayer,
    cacheActiveAdventure,
    refresh,
  } = useSessionWorkspace({
    onSessionCreated: handleSessionCreated,
    onActiveAgentSlotFallback: setActiveAgentSlot,
  });
  const {
    introAudioPlayed,
    setIntroAudioPlayed,
    stopIntroAudio,
  } = useIntroAudio({
    tab,
    splashOpen,
    tab1Locked: detail?.session.tab1_locked,
  });
  const {
    promptNarrationPending,
    sendPromptToAgent,
  } = usePromptFlow({
    sessionId,
    detail,
    refresh,
    setDetail,
    setLoading,
    setError,
    setUserPrompt,
    setStarterPromptDismissed,
    setActiveAgentSlot,
  });
  const {
    startChapter,
    endChapter,
    resetChapter,
  } = usePreparationActions({
    sessionId,
    adventureId,
    selectedPlayerIds,
    classByPlayer,
    refresh,
    setDetail,
    setLoading,
    setError,
    setTab,
    setChapterStarting,
    setPlayedAttackEventIds,
    setStarterPromptDismissed,
    setIntroAudioPlayed,
    setOnboardingGuideStep,
    cacheActiveAdventure,
  });

  const transcript = useMemo(() => {
    if (!detail) return [];
    return detail.events
      .filter((event) => event.kind === "transcript" || event.kind === "objective_updated" || event.kind === "inventory_gained" || event.kind === "inventory_lost" || event.kind === "resource_changed")
      .map((event) => ({ ...event, text: sanitizeVisibleAgentText(event.text) }))
      .filter((event) => event.text.trim());
  }, [detail]);

  const latestEligibleReply = useMemo(() => {
    for (let index = transcript.length - 1; index >= 0; index -= 1) {
      const event = transcript[index];
      if (event.role === "agent") {
        return event;
      }
    }
    return null;
  }, [transcript]);

  const playerNameBySlot = useMemo(
    () => new Map((detail?.tab1.party ?? []).map((member) => [member.slot, member.player_name])),
    [detail],
  );
  const {
    ttsAutoPlay,
    ttsState,
    ttsError,
    currentTtsReply,
    playReply,
    stopSpeechPlayback,
    resumeQueuedTts,
    setTtsError,
    toggleTtsAutoPlay,
  } = useTtsPlayback({
    sessionId,
    transcript,
    latestEligibleReply,
    playerNameBySlot,
    encounterNoticePlayingRef,
    onSpeechStarted: stopIntroAudio,
  });
  const { encounterNoticeImageUrl } = useEncounterNoticeAudio({
    detail,
    adventureId,
    sessionId,
    encounterNoticePlayingRef,
    onInterruptSpeech: () => stopSpeechPlayback(true),
    onStopIntroAudio: stopIntroAudio,
    onResumeSpeechQueue: resumeQueuedTts,
    onAudioError: setTtsError,
  });

  useEffect(() => {
    const box = transcriptRef.current;
    if (!box) return;
    box.scrollTop = box.scrollHeight;
  }, [detail?.events.length, detail?.session.prompt_index]);

  useEffect(() => {
    if (!chapterStarting) {
      setChapterLoadingFrame(0);
      return;
    }
    const timer = window.setInterval(() => {
      setChapterLoadingFrame((current) => current + 1);
    }, 400);
    return () => window.clearInterval(timer);
  }, [chapterStarting]);

  useEffect(() => {
    setActiveLocationId("");
    setLocationView("world");
    setEncounterLocationTitle("Antlers Rest Inn");
  }, [detail?.tab1.active_adventure?.adventure_id]);

  useEffect(() => {
    if (tab !== 2 || splashOpen) return;
    const alignAdventureTop = () => {
      adventureTabTopRef.current?.scrollIntoView({ behavior: "auto", block: "start" });
    };
    const frameId = window.requestAnimationFrame(alignAdventureTop);
    const settleTimerId = window.setTimeout(alignAdventureTop, 600);
    return () => {
      window.cancelAnimationFrame(frameId);
      window.clearTimeout(settleTimerId);
    };
  }, [splashOpen, tab]);

  const selectedAdventureSummary = useMemo(
    () => catalogBoot?.adventures.find((item) => item.adventure_id === adventureId) ?? null,
    [adventureId, catalogBoot],
  );
  const selectedAdventure = detail?.tab1.active_adventure ?? (adventureId ? adventureDetailsById[adventureId] ?? null : null);
  const transcriptChars = transcript.reduce((sum, event) => sum + event.text.length + 1, 0);
  const gmMonsters = detail?.gm_monsters ?? [];
  const oppositionState = detail?.session.opposition_state ?? null;
  const oppositionCleanupPending = Boolean(
    oppositionState?.active
    && oppositionState.instances.length
    && oppositionState.instances.every((instance) => instance.is_dead || instance.current_hp <= 0),
  );
  const activeOpposition = oppositionState?.active && !oppositionCleanupPending ? oppositionState : null;
  const adventureLocations = detail?.tab1.active_adventure?.locations ?? [];
  const activeLocation = adventureLocations.find((location) => location.id === activeLocationId) ?? null;
  const loadingPulse = [".", "..", "..."][chapterLoadingFrame % 3];
  const {
    encounterMonsterId,
    setEncounterMonsterId,
    encounterQuantity,
    setEncounterQuantity,
    selectedEncounterMonster,
    encounterMonsterIndex,
    cycleEncounterMonster,
    openEncounterModal,
  } = useEncounterSelection({ gmMonsters, setEncounterModalOpen });
  const encounterState = detail?.session.encounter_state;
  const activeHazardImageUrl =
    encounterState?.encounter_type === "hazard"
    && encounterState.status !== "clear"
    && encounterState.status !== "resolved"
    && encounterState.location_id
      ? encounterVisualUrl(encounterState.adventure_id || detail?.tab1.adventure_id || adventureId, encounterState.location_id)
      : "";
  const encounterLocationImageUrl = encounterNoticeImageUrl || activeHazardImageUrl || locationImageUrl(encounterLocationTitle);
  const objectiveState = detail?.session.mission_objective_state;
  const musicCue: MusicCue = activeOpposition
    ? "combat"
    : objectiveState?.complete && Boolean(objectiveState?.returned_to_moosehearth)
      ? "victory"
      : tab === 2 && Boolean(detail?.session.current_location_id)
        ? "adventure"
        : "inn";
  const {
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
  } = useBackgroundMusic({ musicCue, ttsState });
  const {
    activeCelebrationSong,
    celebrationLoading,
    generateCelebrationSong,
  } = useCelebrationSong({
    sessionId,
    adventureId,
    objectiveState,
    activeAdventureId: detail?.tab1.adventure_id ?? "",
    pauseForCelebration,
    setError,
  });
  const {
    takeLongRest,
    travelToSelectedLocation,
    returnToHomeBase,
    triggerEncounter,
    fleeEncounter,
    searchLocation,
    useSelectedItem,
  } = useAdventureActions({
    sessionId,
    activeLocation,
    selectedEncounterMonster,
    encounterQuantity,
    activeAgentSlot,
    activeOppositionActive: Boolean(activeOpposition?.active),
    onboardingGuideStep,
    refresh,
    setDetail,
    setLoading,
    setError,
    setTravelLoading,
    setLongRestLoading,
    setSpawnLoading,
    setDismissLoading,
    setEncounterModalOpen,
    setLocationView,
    setActiveLocationId,
    setEncounterLocationTitle,
    setActiveAgentSlot,
    setOnboardingGuideStep,
  });
  const {
    feedbackText,
    setFeedbackText,
    feedbackSubmitting,
    feedbackSubmittedAt,
    submitFeedback,
  } = useFeedbackActions({ sessionId, setError });
  const {
    togglePlayer,
    setPlayerClass,
    applyRecommendedParty,
    startReady,
    startChapterHint,
  } = usePartySetup({
    adventureId,
    selectedPlayerIds,
    setSelectedPlayerIds,
    classByPlayer,
    setClassByPlayer,
  });
  const allPlayersDown = detail?.session.state === "GAME_OVER"
    || (Boolean(detail?.tab1.party.length) && detail!.tab1.party.every((member) => member.hp_current <= 0));

  function displayAdventureTitle(adventure: AdventureSummary | Adventure | null) {
    if (!adventure) return "";
    return ACTIVE_GAME_PACK_UI.adventureTitleOverrides[adventure.adventure_id] ?? adventure.title;
  }

  const headerAdventureTitle = displayAdventureTitle(selectedAdventure ?? selectedAdventureSummary) || ACTIVE_GAME_PACK_UI.consoleTitle;

  async function submitPrompt(event: FormEvent) {
    event.preventDefault();
    await sendPromptToAgent(activeAgentSlot, userPrompt);
  }

  async function submitStarterPrompt() {
    if (!detail) return;
    if (onboardingGuideStep === "opposition-prompt") {
      setActiveAgentSlot(OPPOSITION_SLOT);
      setOnboardingGuideStep("complete");
      await sendPromptToAgent(OPPOSITION_SLOT, ACTIVE_GAME_PACK_UI.prompts.oppositionStarter);
      return;
    }
    const firstPlayerSlot = detail.tab1.selected_agent_slots.find((slot) => slot !== OPPOSITION_SLOT) ?? detail.tab1.party[0]?.slot ?? 1;
    setActiveAgentSlot(firstPlayerSlot);
    setStarterPromptDismissed(true);
    setOnboardingGuideStep((current) => (current === "starter" ? "adventure-map" : current));
    await sendPromptToAgent(firstPlayerSlot, ACTIVE_GAME_PACK_UI.prompts.starter);
  }

  function dismissOnboardingGuide() {
    setOnboardingGuideStep("complete");
  }

  function setGuidedLocationView(view: "world" | "adventure" | "encounter") {
    setLocationView(view);
    setOnboardingGuideStep((current) => (current === "adventure-map" && view === "adventure" ? "location-one" : current));
  }

  function setGuidedActiveLocationId(locationId: string) {
    setActiveLocationId(locationId);
    setOnboardingGuideStep((current) => {
      if (current !== "location-one") return current;
      const selectedLocationNumber = adventureLocations.find((location) => location.id === locationId)?.number;
      return selectedLocationNumber === 1 ? "travel" : "complete";
    });
  }

  function startOver() {
    window.location.reload();
  }

  function enterApp() {
    window.localStorage.setItem("story-engine-mk5-splash-seen", "true");
    setSplashOpen(false);
  }

  function replaySplash() {
    setSplashOpen(true);
  }

  if (!catalogBoot || !detail) {
    return <div className="loading-shell">Loading Story Engine MK5...</div>;
  }

  const tutorialEmbedUrl = youtubeEmbedUrl(TUTORIAL_VIDEO_URL);
  const showStarterPrompt = Boolean(
    detail.session.state === "ACTIVE"
    && detail.session.prompt_index === 0
    && !userPrompt.trim()
    && !promptNarrationPending
    && !starterPromptDismissed,
  );
  const showOppositionStarterPrompt = Boolean(
    detail.session.state === "ACTIVE"
    && onboardingGuideStep === "opposition-prompt"
    && activeOpposition?.active
    && activeAgentSlot === OPPOSITION_SLOT
    && !userPrompt.trim()
    && !promptNarrationPending,
  );
  const activeOnboardingGuideStep = showStarterPrompt || showOppositionStarterPrompt || onboardingGuideStep !== "starter" ? onboardingGuideStep : "complete";
  const starterPromptText = showOppositionStarterPrompt
    ? ACTIVE_GAME_PACK_UI.prompts.oppositionStarter
    : (showStarterPrompt ? ACTIVE_GAME_PACK_UI.prompts.starter : "");

  return (
    <div className="page">
      {splashOpen && (
        <div className="splash-overlay" role="dialog" aria-modal="true" aria-label="Story Engine tutorial">
          <div className="splash-card splash-card--tutorial">
            <div className="splash-copy">
              <div className="eyebrow">Story Engine MK5</div>
              <h1>Welcome to {ACTIVE_GAME_PACK_UI.title}</h1>
              <p>Watch the quick tutorial, then enter the adventure console to choose a mission, build the party, and begin play.</p>
            </div>
            <div className="tutorial-video-frame">
              {tutorialEmbedUrl ? (
                <iframe
                  src={tutorialEmbedUrl}
                  title="Story Engine MK5 tutorial video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              ) : (
                <div className="tutorial-video-placeholder">
                  <strong>Tutorial video not configured</strong>
                  <span>Set VITE_TUTORIAL_VIDEO_URL to a YouTube link and rebuild the frontend container.</span>
                </div>
              )}
            </div>
            <div className="splash-legal-placeholder">
              Legal and advertising notices will live here before public release.
            </div>
            <div className="action-row">
              <button className="btn accent" type="button" onClick={enterApp}>Enter Story Engine</button>
            </div>
          </div>
        </div>
      )}

      <audio
        ref={audioRef}
        key={currentTrack}
        preload="metadata"
        src={currentTrack}
        loop={currentMusicTracks.length === 1}
        onError={() => setError(`Unable to load music track: ${currentTrack}`)}
        onEnded={advanceMusicTrack}
      >
        <source src={currentTrack} type="audio/mpeg" />
      </audio>

      <header className="hero hero--phase1">
        <div>
          <div className="eyebrow">Story Engine MK5</div>
          <h1 className="hero-title">{headerAdventureTitle}</h1>
          <p className="hero-copy">Preparation, adventure play, and feedback now follow a simpler phase-by-phase layout built around the mission map, location cell, and GM prompting.</p>
        </div>
        <div className="status-strip status-strip--compact">
          <div className="status-card">
            <span>Music</span>
            <strong>{musicAutoplayBlocked ? "Enable Music" : `${musicPlaying ? "Playing" : "Paused"} - ${MUSIC_CUE_LABELS[musicCue]}`}</strong>
            <div className="music-controls">
              <button className="btn music-btn" type="button" onClick={() => void toggleMusicPlayback()}>
                {musicAutoplayBlocked ? "Enable Music" : musicPlaying ? "Pause" : "Play"}
              </button>
              <button className="btn music-btn" type="button" onClick={toggleMusicMuted}>
                {musicMuted ? "Unmute" : "Mute"}
              </button>
              <button className="btn music-btn" type="button" onClick={replaySplash}>
                Tutorial
              </button>
            </div>
            <div className="mobile-tts-controls">
              <span className={`tts-status tts-status--${ttsState}`}>AI Voice: {TTS_STATUS_LABELS[ttsState]}</span>
              <button className="btn music-btn" type="button" onClick={() => void playReply()} disabled={!latestEligibleReply || ttsState === "loading"}>
                Play
              </button>
              <button
                className={ttsAutoPlay ? "btn music-btn accent-toggle active" : "btn music-btn accent-toggle"}
                type="button"
                onClick={toggleTtsAutoPlay}
              >
                Auto: {ttsAutoPlay ? "On" : "Off"}
              </button>
            </div>
          </div>
        </div>
      </header>

      <nav className="tabs">
        <button className={tab === 1 ? "tab active" : "tab"} onClick={() => setTab(1)}>Preparation</button>
        <button className={tab === 2 ? "tab active" : "tab"} onClick={() => setTab(2)} disabled={!detail.session.tab1_locked}>Adventure</button>
        <button className={tab === 3 ? "tab active" : "tab"} onClick={() => setTab(3)} disabled={!detail.session.tab1_locked}>Feedback</button>
      </nav>

      {error && <div className="error-banner">{error}</div>}

      {tab === 1 && (
        <PreparationTab
          catalogBoot={catalogBoot}
          detail={detail}
          adventureId={adventureId}
          setAdventureId={setAdventureId}
          selectedPlayerIds={selectedPlayerIds}
          classByPlayer={classByPlayer}
          selectedAdventureSummary={selectedAdventureSummary}
          selectedAdventure={selectedAdventure}
          loading={loading}
          chapterStarting={chapterStarting}
          startReady={startReady}
          startChapterHint={startChapterHint}
          loadingPulse={loadingPulse}
          onTogglePlayer={togglePlayer}
          onSetPlayerClass={setPlayerClass}
          onApplyRecommendedParty={applyRecommendedParty}
          onStartChapter={() => void startChapter()}
          onResetChapter={() => void resetChapter()}
          displayAdventureTitle={displayAdventureTitle}
        />
      )}

      {tab === 2 && (
        <div ref={adventureTabTopRef}>
          <AdventureTab
            detail={detail}
            transcript={transcript}
            transcriptChars={transcriptChars}
            transcriptRef={transcriptRef}
            latestEligibleReply={latestEligibleReply}
            currentTtsReply={currentTtsReply}
            ttsState={ttsState}
            ttsAutoPlay={ttsAutoPlay}
            ttsStatusLabels={TTS_STATUS_LABELS}
            ttsError={ttsError}
            userPrompt={userPrompt}
            activeAgentSlot={activeAgentSlot}
            activeOpposition={activeOpposition}
            locationOppositionState={oppositionState}
            activeLocation={activeLocation}
            adventureLocations={adventureLocations}
            gmMonsters={gmMonsters}
            encounterModalOpen={encounterModalOpen}
            encounterMonsterId={encounterMonsterId}
            encounterMonsterIndex={encounterMonsterIndex}
            encounterQuantity={encounterQuantity}
            selectedEncounterMonster={selectedEncounterMonster}
            loading={loading || spawnLoading || dismissLoading || promptNarrationPending}
            longRestLoading={longRestLoading}
            celebrationLoading={celebrationLoading}
            celebrationSong={activeCelebrationSong}
            travelLoading={travelLoading}
            allPlayersDown={allPlayersDown}
            worldMapImageUrl={catalogBoot.map_image_url}
            worldMapAltText={`${ACTIVE_GAME_PACK_UI.title} world map`}
            homeBaseName={ACTIVE_GAME_PACK_UI.homeBaseName}
            encounterImageUrl={encounterLocationImageUrl}
            encounterLocationTitle={encounterLocationTitle}
            locationView={locationView}
            onboardingGuideStep={activeOnboardingGuideStep}
            playedAttackEventIds={playedAttackEventIds}
            animationLocked={animationLocked}
            onPlayReply={() => void playReply()}
            onAnimationStateChange={setAnimationLocked}
            onAnimationSettled={refresh}
            onMarkAttackAnimationPlayed={(eventId) => {
              setPlayedAttackEventIds((current) => (
                current.includes(eventId) ? current : [...current, eventId]
              ));
            }}
            onToggleTtsAutoPlay={toggleTtsAutoPlay}
            onSubmitPrompt={submitPrompt}
            onSetUserPrompt={setUserPrompt}
            starterPromptText={starterPromptText}
            onSubmitStarterPrompt={() => void submitStarterPrompt()}
            onDismissStarterPrompt={() => {
              setStarterPromptDismissed(true);
              dismissOnboardingGuide();
            }}
            onSetActiveAgentSlot={setActiveAgentSlot}
            onTakeLongRest={() => void takeLongRest()}
            onEndChapter={() => void endChapter()}
            onSetLocationView={setGuidedLocationView}
            onSetActiveLocationId={setGuidedActiveLocationId}
            onTravelToSelectedLocation={() => void travelToSelectedLocation()}
            onReturnHomeBase={() => void returnToHomeBase()}
            onOpenEncounterModal={() => {
              openEncounterModal();
              setOnboardingGuideStep((current) => (current === "trigger-encounter" ? "start-encounter" : "complete"));
            }}
            onCloseEncounterModal={() => setEncounterModalOpen(false)}
            onSetEncounterMonsterId={setEncounterMonsterId}
            onCycleEncounterMonster={cycleEncounterMonster}
            onSetEncounterQuantity={setEncounterQuantity}
            onTriggerEncounter={() => void triggerEncounter()}
            onGenerateCelebrationSong={() => void generateCelebrationSong()}
            onFleeEncounter={() => void fleeEncounter()}
            onSearchLocation={() => void searchLocation()}
            onUseItem={(itemName, targetId) => void useSelectedItem(itemName, targetId)}
            onStartOver={startOver}
            displayAdventureTitle={displayAdventureTitle}
          />
        </div>
      )}

      {tab === 3 && (
        <FeedbackTab
          detail={detail}
          feedbackText={feedbackText}
          feedbackSubmitting={feedbackSubmitting}
          feedbackSubmittedAt={feedbackSubmittedAt}
          selectedAdventure={selectedAdventure}
          selectedAdventureSummary={selectedAdventureSummary}
          onSetFeedbackText={setFeedbackText}
          onSubmitFeedback={() => void submitFeedback()}
          displayAdventureTitle={displayAdventureTitle}
        />
      )}
    </div>
  );
}
