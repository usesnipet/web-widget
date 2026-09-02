import type { Message as ChatMessage } from "@/models/session";

type Props = {
  message: ChatMessage;
};

/** Renders a single chat message, aligned right for the user and left for everyone else. */
export function Message({ message }: Props) {
  return (
    <div className={`snipet-message snipet-message--${message.role}`}>
      <div className="snipet-message__bubble">{message.content}</div>
    </div>
  );
}
