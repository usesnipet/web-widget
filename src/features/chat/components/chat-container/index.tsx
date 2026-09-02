import { useActiveSession } from "@/context/session";
import type { Message as ChatMessage } from "@/models/session";

import { ChatEmptyState } from "../chat-empty-state";
import { MessageInput } from "../message-input";
import { MessageList } from "../message-list";

type Props = {
  messages: ChatMessage[];
  onSend: (text: string) => void;
  disabled?: boolean;
};

/**
 * Chat body: a scrollable message area with the input docked at the bottom.
 * Without an active session, the message area is replaced by a fallback
 * prompting the user to ask something.
 */
export function ChatContainer() {
  const { activeSessionId, isLoading } = useActiveSession();

  return (
    <div className="snipet-chat">
      {isLoading ? null : activeSessionId ? (
        <MessageList />
      ) : (
        <ChatEmptyState />
      )}
      <MessageInput />
    </div>
  );
}
