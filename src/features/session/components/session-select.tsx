import type { Session } from "@/models/session";

import { useSessions } from "../hooks";

const sessionLabel = (session: Session, index: number) =>
  session.metadata?.name?.trim() || `Sessão ${index + 1}`;

type Props = {
  /** Currently selected session id; defaults to the first session. */
  value?: string;
  onChange?: (sessionId: string) => void;
  /** Fired by the `+` button — wiring comes later. */
  onCreate?: () => void;
};

/**
 * Header control that stands in for the app name:
 * - no sessions yet → static "Nova sessão" label;
 * - one or more     → a `<select>` plus a `+` button to start a new one.
 */
export function SessionSelect({ value, onChange, onCreate }: Props) {
  const { data, isLoading } = useSessions();
  const sessions = data?.data ?? [];

  if (isLoading) return null;

  if (sessions.length === 0) {
    return <span className="snipet-session-select__empty">Nova sessão</span>;
  }

  return (
    <div className="snipet-session-select">
      <select
        className="snipet-session-select__control"
        value={value ?? sessions[0].id}
        onChange={(event) => onChange?.(event.target.value)}
        aria-label="Selecionar sessão"
      >
        {sessions.map((session, index) => (
          <option key={session.id} value={session.id}>
            {sessionLabel(session, index)}
          </option>
        ))}
      </select>
      <button
        type="button"
        className="snipet-session-select__add"
        onClick={onCreate}
        aria-label="Nova sessão"
      >
        +
      </button>
    </div>
  );
}
