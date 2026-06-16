import { Dispatch, SetStateAction, useRef, useState } from "react";
import { api } from "../api";
import { PromptResponse, SessionDetail } from "../appTypes";
import { nextSelectableSlot, selectableAgentSlotsForDetail } from "../sessionView";

type UsePromptFlowOptions = {
  sessionId: string;
  detail: SessionDetail | null;
  refresh: (id?: string) => Promise<SessionDetail>;
  setDetail: Dispatch<SetStateAction<SessionDetail | null>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
  setError: Dispatch<SetStateAction<string>>;
  setUserPrompt: Dispatch<SetStateAction<string>>;
  setStarterPromptDismissed: Dispatch<SetStateAction<boolean>>;
  setActiveAgentSlot: Dispatch<SetStateAction<number>>;
};

function mergePromptEvents(current: SessionDetail | null, response: PromptResponse) {
  if (!current) return current;
  const mergedEvents = [
    ...current.events,
    response.user_event,
    ...(response.agent_event ? [response.agent_event] : []),
    ...response.system_events,
    ...(response.extra_events ?? []),
  ];
  const dedupedEvents = mergedEvents.filter((eventItem, index, all) => (
    all.findIndex((candidate) => candidate.event_id === eventItem.event_id) === index
  ));
  return {
    ...current,
    session: response.session,
    events: dedupedEvents,
  };
}

export function usePromptFlow({
  sessionId,
  detail,
  refresh,
  setDetail,
  setLoading,
  setError,
  setUserPrompt,
  setStarterPromptDismissed,
  setActiveAgentSlot,
}: UsePromptFlowOptions) {
  const narrationPollTokenRef = useRef(0);
  const partyFollowupPollTokenRef = useRef(0);
  const [promptNarrationPending, setPromptNarrationPending] = useState(false);

  async function waitForPromptNarration(promptIndex: number, agentSlot: number, id = sessionId) {
    const pollToken = narrationPollTokenRef.current + 1;
    narrationPollTokenRef.current = pollToken;
    for (let attempt = 0; attempt < 60; attempt += 1) {
      await new Promise((resolve) => window.setTimeout(resolve, 500));
      const refreshed = await refresh(id);
      const foundAgentReply = refreshed.events.some((event) => (
        event.prompt_index === promptIndex
        && event.role === "agent"
        && event.agent_slot === agentSlot
        && event.kind === "transcript"
      ));
      if (narrationPollTokenRef.current !== pollToken) {
        return;
      }
      if (foundAgentReply) {
        setPromptNarrationPending(false);
        return;
      }
    }
    if (narrationPollTokenRef.current === pollToken) {
      setPromptNarrationPending(false);
      setError("Agent narration is taking longer than expected. Try refreshing the session state.");
    }
  }

  async function waitForPartyFollowups(promptIndex: number, initialAgentEventId: string | null, expectedAgentEvents: number, id = sessionId) {
    if (!expectedAgentEvents) return;
    const pollToken = partyFollowupPollTokenRef.current + 1;
    partyFollowupPollTokenRef.current = pollToken;
    for (let attempt = 0; attempt < 90; attempt += 1) {
      await new Promise((resolve) => window.setTimeout(resolve, 400));
      const refreshed = await refresh(id);
      if (partyFollowupPollTokenRef.current !== pollToken) {
        return;
      }
      const followupAgentEvents = refreshed.events.filter((event) => (
        event.prompt_index === promptIndex
        && event.role === "agent"
        && event.kind === "transcript"
        && event.event_id !== initialAgentEventId
      ));
      if (followupAgentEvents.length >= expectedAgentEvents) {
        return;
      }
    }
  }

  async function sendPromptToAgent(agentSlot: number, text: string) {
    if (!sessionId || !text.trim() || !detail || promptNarrationPending) return;
    if (!selectableAgentSlotsForDetail(detail).includes(agentSlot)) return;
    setLoading(true);
    setError("");
    try {
      const response = await api<PromptResponse>(`/session/${sessionId}/prompt`, {
        method: "POST",
        body: JSON.stringify({ agent_slot: agentSlot, user_text: text.trim() }),
      });
      const nextDetail = mergePromptEvents(detail, response);
      setDetail(nextDetail);
      setUserPrompt("");
      setStarterPromptDismissed(true);
      if (nextDetail) {
        setActiveAgentSlot(nextSelectableSlot(nextDetail, agentSlot));
      }
      if (response.narration_pending) {
        setPromptNarrationPending(true);
        void waitForPromptNarration(response.user_event.prompt_index, agentSlot, sessionId).catch((pollError: Error) => {
          setPromptNarrationPending(false);
          setError(pollError.message);
        });
      } else {
        setPromptNarrationPending(false);
      }
      if (response.followup_pending) {
        void waitForPartyFollowups(
          response.user_event.prompt_index,
          response.agent_event?.event_id ?? null,
          response.followup_expected_agent_events ?? 0,
          sessionId,
        ).catch((pollError: Error) => {
          setError(pollError.message);
        });
      }
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  }

  return {
    promptNarrationPending,
    sendPromptToAgent,
  };
}
