import type { Session } from "@/models/session";
import { useSessions } from "../../hooks";
import { useSessionStore } from "../../store";

const sessionLabel = (session: Session, index: number) =>
  session.metadata?.name?.trim() || `Sessão ${index + 1}`;

/**
 * Header control that stands in for the app name:
 * - no sessions yet → static "Nova sessão" label;
 * - one or more     → a `<select>` plus a `+` button to start a new one.
 */
export function SessionSelect() {
  const { data: sessionsPage, isLoading } = useSessions();
  const selectedSession = useSessionStore((state) => state.selectedSession);
  const setActiveSession = useSessionStore((state) => state.setSelectedSession);

  const sessions = sessionsPage?.data ?? [];
  if (isLoading) return null;

  if (sessions.length === 0) {
    return <span className="snipet-session-select__empty">Nova sessão</span>;
  }

  return (
    <div className="snipet-session-select">
      <select
        className="snipet-session-select__control"
        value={selectedSession?.id}
        onChange={(event) => setActiveSession(event.target.value)}
        aria-label="Selecionar sessão"
      >
        {sessions.map((session, index) => (
          <option key={session.id} value={session.id}>
            {sessionLabel(session, index)}
          </option>
        ))}
      </select>
      {/* Wiring for starting a new session comes later. */}
      <button
        type="button"
        className="snipet-session-select__add"
        aria-label="Nova sessão"
      >
        +
      </button>
    </div>
  );
}
