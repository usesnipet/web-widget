import type { Message as SessionMessage } from "@/models/session";

type Props = {
  message: SessionMessage;
};

/** Renders a single session message, aligned right for the user and left for everyone else. */
export function Message({ message }: Props) {
  return (
    <div className={`snipet-message snipet-message--${message.role}`}>
      <div className="snipet-message__bubble">{message.content}</div>
    </div>
  );
}
