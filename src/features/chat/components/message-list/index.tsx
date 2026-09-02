import { useEffect, useRef } from "react";

import { Message } from "../message";
import { useSessionMessages } from "@/features/session/hooks";
import { useActiveSession } from "@/context/session";

/** Scrollable message area; keeps the newest message in view. */
export function MessageList() {
  const endRef = useRef<HTMLDivElement>(null);
  const { activeSessionId } = useActiveSession()
  const { data: messagesPage, isLoading } = useSessionMessages(activeSessionId ?? "", { sort: "desc", skip: 0, take: 100 });
  const messages = messagesPage?.data ?? [];

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="snipet-messages">
      {isLoading ? null : messages.length === 0 ? (
        <div className="snipet-messages__empty">Nenhuma mensagem</div>
      ) : null}
      {messages.map((message) => (
        <Message key={message.id} message={message} />
      ))}
      <div ref={endRef} />
    </div>
  );
}
