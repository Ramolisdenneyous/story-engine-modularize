export type OnboardingGuideStep = "starter" | "adventure-map" | "location-one" | "travel" | "trigger-encounter" | "start-encounter" | "opposition-prompt" | "complete";

const DEFAULT_TUTORIAL_VIDEO_URL = "https://www.youtube.com/watch?v=eJarez0LH-E";

export const TUTORIAL_VIDEO_URL = import.meta.env.VITE_TUTORIAL_VIDEO_URL || DEFAULT_TUTORIAL_VIDEO_URL;

