import type { Message as ChatMessage } from "@/models/session";

import { MessageInput } from "./message-input";
import { MessageList } from "./message-list";

type Props = {
  messages: ChatMessage[];
  onSend: (text: string) => void;
  disabled?: boolean;
};

/** Chat body: a scrollable message area with the input docked at the bottom. */
export function ChatContainer({ messages, onSend, disabled }: Props) {
  return (
    <div className="snipet-chat">
      <MessageList messages={messages} />
      <MessageInput onSend={onSend} disabled={disabled} />
    </div>
  );
}
