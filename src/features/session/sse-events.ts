import type { Message } from "@/models/session";

/** Event names emitted by `POST /apps/{code}/session/{id}/run`. */
export const SSE_EVENT = {
  executionStarted: "execution.started",
  executionStatusChanged: "execution.status_changed",
  executionFinished: "execution.finished",
  executionFailed: "execution.failed",
  executionMaxTurnsReached: "execution.max_turns_reached",
  executionCancelled: "execution.cancelled",

  turnStarted: "turn.started",
  turnCompleted: "turn.completed",

  messageAdded: "message.added",
  messageDelta: "message.delta",
  messageAttemptFailed: "message.attempt_failed",

  toolCallStarted: "tool_call.started",
  toolCallResult: "tool_call.result",
} as const;

export interface MessageAddedEventData {
  message: Message;
}

/** A chunk of assistant text streamed before the message is confirmed via `message.added`. */
export interface MessageDeltaEventData {
  message_id: string;
  content: string;
}

/** Signals every delta/tool event published under `message_id` must be discarded. */
export interface MessageAttemptFailedEventData {
  message_id: string;
  error: string;
}

export interface ExecutionFailedEventData {
  error: string;
}
