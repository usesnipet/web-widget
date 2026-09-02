import { useActiveSession } from "@/context/session";
import type { Message } from "@/models/session";

import { SessionEmptyState } from "../session-empty-state";
import { MessageInput } from "../message-input";
import { MessageList } from "../message-list";

type Props = {
  messages: Message[];
  onSend: (text: string) => void;
  disabled?: boolean;
};

/**
 * Session body: a scrollable message area with the input docked at the bottom.
 * Without an active session, the message area is replaced by a fallback
 * prompting the user to ask something.
 */
export function SessionContainer() {
  const { activeSessionId, isLoading } = useActiveSession();

  return (
    <div className="snipet-session">
      {isLoading ? null : activeSessionId ? (
        <MessageList />
      ) : (
        <SessionEmptyState />
      )}
      <MessageInput />
    </div>
  );
}
