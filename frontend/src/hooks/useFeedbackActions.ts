import { useState } from "react";
import { api } from "../api";
import { FeedbackCreateResponse } from "../appTypes";

type UseFeedbackActionsOptions = {
  sessionId: string;
  setError: (error: string) => void;
};

export function useFeedbackActions({ sessionId, setError }: UseFeedbackActionsOptions) {
  const [feedbackSubmitting, setFeedbackSubmitting] = useState(false);
  const [feedbackSubmittedAt, setFeedbackSubmittedAt] = useState("");
  const [feedbackText, setFeedbackText] = useState("");

  async function submitFeedback() {
    if (!sessionId || !feedbackText.trim()) return;
    setFeedbackSubmitting(true);
    setError("");
    try {
      const response = await api<FeedbackCreateResponse>(`/session/${sessionId}/feedback`, {
        method: "POST",
        body: JSON.stringify({ feedback_text: feedbackText.trim() }),
      });
      setFeedbackSubmittedAt(response.created_at);
      setFeedbackText("");
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setFeedbackSubmitting(false);
    }
  }

  return {
    feedbackText,
    setFeedbackText,
    feedbackSubmitting,
    feedbackSubmittedAt,
    submitFeedback,
  };
}
