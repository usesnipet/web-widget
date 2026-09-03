import { useEffect, useRef } from "react";

import { Message } from "../message";
import { useSessionMessages } from "@/features/session/hooks";
import { useSessionStore } from "../../store";

/** Scrollable message area; keeps the newest message in view. */
export function MessageList() {
  const endRef = useRef<HTMLDivElement>(null);
  const selectedSession = useSessionStore(s => s.selectedSession);
  const liveMessages = useSessionStore(s => s.liveMessages);
  const pendingUserMessage = useSessionStore(s => s.pendingUserMessage);
  const streamingMessage = useSessionStore(s => s.streamingMessage);
  const { data: messagesPage, isLoading } = useSessionMessages(selectedSession?.id ?? "", { sort: "desc", skip: 0, take: 100 });

  const persisted = messagesPage?.data ?? [];
  const persistedIds = new Set(persisted.map((message) => message.id));
  const liveNotPersisted = liveMessages.filter((message) => !persistedIds.has(message.id));

  const messages = [
    ...[...persisted].reverse(),
    ...liveNotPersisted,
    ...(pendingUserMessage ? [pendingUserMessage] : []),
    ...(streamingMessage ? [streamingMessage] : []),
  ];

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length, streamingMessage?.content]);

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
