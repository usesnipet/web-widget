import { createContext, useContext, useState } from "react";

import { useSessions } from "@/features/session/hooks";
import type { Session } from "@/models/session";

type SessionContextValue = {
  sessions: Session[];
  activeSession: Session | null;
  activeSessionId: string | null;
  setActiveSessionId: (id: string) => void;
  isLoading: boolean;
};

const SessionContext = createContext<SessionContextValue | null>(null);

type Props = {
  children: React.ReactNode;
};

/**
 * Lists the app's sessions and tracks which one is active.
 * Defaults to the most recent session (the list's first item) until the
 * user explicitly picks a different one.
 */
export const SessionProvider = ({ children }: Props) => {
  const { data, isLoading } = useSessions();
  const sessions = data?.data ?? [];

  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(null);

  const activeSessionId = selectedSessionId ?? sessions[0]?.id ?? null;
  const activeSession = sessions.find((session) => session.id === activeSessionId) ?? null;

  return (
    <SessionContext.Provider
      value={{
        sessions,
        activeSession,
        activeSessionId,
        setActiveSessionId: setSelectedSessionId,
        isLoading,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};

export const useActiveSession = () => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error("useActiveSession must be used within a SessionProvider");
  }
  return context;
};
