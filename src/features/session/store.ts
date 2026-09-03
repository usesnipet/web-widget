import type { Message, Session } from "@/models/session";
import { create } from "zustand";

interface SessionState {
  initialized: boolean;
  selectedSession: Session | null;
  setSelectedSession: (id: string) => void;
  /** Selects a session that may not be in `sessions` yet (e.g. just created). */
  selectSession: (session: Session) => void;

  sessions: Session[];
  setSessions: (sessions: Session[]) => void;

  /** True while a message is being sent and its execution is streaming. */
  isSending: boolean;
  setIsSending: (isSending: boolean) => void;

  /** The user's own message, shown immediately, before `message.added` confirms it. */
  pendingUserMessage: Message | null;
  setPendingUserMessage: (message: Message | null) => void;

  /** Messages confirmed via `message.added` during the current execution, not yet in the query cache. */
  liveMessages: Message[];
  addLiveMessage: (message: Message) => void;
  clearLiveMessages: () => void;

  /** The assistant reply being built from `message.delta` chunks, before it is confirmed. */
  streamingMessage: Message | null;
  appendStreamingDelta: (messageId: string, delta: string) => void;
  clearStreamingMessage: (messageId?: string) => void;
}

export const useSessionStore = create<SessionState>((set) => ({
  initialized: false,
  sessions: [],
  setSessions: (sessions: Session[]) => {
    set((state) => ({
      ...state,
      sessions,
      selectedSession: sessions.find((session) => session.id === state.selectedSession?.id) || null,
      initialized: true,
    }));
  },

  selectedSession: null,
  setSelectedSession: (id: string) => {
    set((state) => ({
      ...state,
      selectedSession: state.sessions.find((session) => session.id === id) || null,
      liveMessages: [],
      streamingMessage: null,
      pendingUserMessage: null,
    }));
  },
  selectSession: (session: Session) => {
    set((state) => {
      const exists = state.sessions.some((s) => s.id === session.id);
      const sessions = exists
        ? state.sessions.map((s) => (s.id === session.id ? session : s))
        : [session, ...state.sessions];

      return {
        ...state,
        sessions,
        selectedSession: session,
        liveMessages: [],
        streamingMessage: null,
        pendingUserMessage: null,
      };
    });
  },

  isSending: false,
  setIsSending: (isSending: boolean) => set((state) => ({ ...state, isSending })),

  pendingUserMessage: null,
  setPendingUserMessage: (message: Message | null) =>
    set((state) => ({ ...state, pendingUserMessage: message })),

  liveMessages: [],
  addLiveMessage: (message: Message) =>
    set((state) => ({
      ...state,
      liveMessages: [...state.liveMessages, message],
      streamingMessage: state.streamingMessage?.id === message.id ? null : state.streamingMessage,
      pendingUserMessage: message.role === "user" ? null : state.pendingUserMessage,
    })),
  clearLiveMessages: () => set((state) => ({ ...state, liveMessages: [] })),

  streamingMessage: null,
  appendStreamingDelta: (messageId: string, delta: string) =>
    set((state) => {
      const current = state.streamingMessage?.id === messageId ? state.streamingMessage : null;
      const streamingMessage: Message = current
        ? { ...current, content: current.content + delta }
        : {
            id: messageId,
            sequence: 0,
            role: "assistant",
            content: delta,
            final: false,
            timestamp: new Date(),
          };

      return { ...state, streamingMessage };
    }),
  clearStreamingMessage: (messageId?: string) =>
    set((state) =>
      messageId && state.streamingMessage?.id !== messageId
        ? state
        : { ...state, streamingMessage: null },
    ),
}));
