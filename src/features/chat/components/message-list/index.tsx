import { useEffect, useRef } from "react";

import type { Message as ChatMessage } from "@/models/session";

import { Message } from "../message";

type Props = {
  messages: ChatMessage[];
};

/** Scrollable message area; keeps the newest message in view. */
export function MessageList({ messages }: Props) {
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="snipet-messages">
      {messages.map((message) => (
        <Message key={message.id} message={message} />
      ))}
      <div ref={endRef} />
    </div>
  );
}
