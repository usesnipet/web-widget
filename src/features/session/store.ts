import type { Session } from "@/models/session";
import { create } from "zustand";

interface SessionState {
  initialized: boolean;
  selectedSession: Session | null;
  setSelectedSession: (id: string) => void;

  sessions: Session[];
  setSessions: (sessions: Session[]) => void;
}

export const useSessionStore = create<SessionState>((set) => ({
  initialized: false,
  sessions: [],
  setSessions:(sessions: Session[]) => {
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
    }));
  }
}));
