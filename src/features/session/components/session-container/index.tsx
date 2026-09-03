import { SessionEmptyState } from "../session-empty-state";
import { MessageInput } from "../message-input";
import { MessageList } from "../message-list";
import { useSessionStore } from "../../store";

/**
 * Session body: a scrollable message area with the input docked at the bottom.
 * Without an active session, the message area is replaced by a fallback
 * prompting the user to ask something.
 */
export function SessionContainer() {
  const initialized = useSessionStore(s => s.initialized);
  const selectedSession = useSessionStore(s => s.selectedSession);

  return (
    <div className="snipet-session">
      {!initialized ? null : selectedSession ? (
        <MessageList />
      ) : (
        <SessionEmptyState />
      )}
      <MessageInput />
    </div>
  );
}
