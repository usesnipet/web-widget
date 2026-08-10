import { useState } from "react";

import { ChatBubble } from "./components/chat-bubble";
import { ChatWindow } from "./components/chat-window";

import type { Config } from "./config"

type Props = {
  config: Config
}
export const Chat = ({ config }: Props) => {
  const [open, setOpen] = useState(false)

  return (
    <div className={`snipet-root snipet-pos-${config.position}`}>
      {open && <ChatWindow config={config} onClose={() => setOpen(false)} />}
      <ChatBubble open={open} onToggle={() => setOpen((v) => !v)} />
    </div>
  )
}