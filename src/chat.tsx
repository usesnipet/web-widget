import { useState } from "react";

import { ChatBubble } from "./components/chat-bubble";
import { ChatWindow } from "./components/chat-window";

import type { Config } from "./config"
import { useTheme } from "./hooks/use-theme";

type Props = {
  config: Config
}
export const Chat = ({ config }: Props) => {
  const [open, setOpen] = useState(false)
  const theme = useTheme(config.color)

  const positionClass = config.position === "bottom-left"
    ? "snipet-position-left"
    : "snipet-position-right"

  const toggleChat = () => {
    setOpen(!open)
  }

  const closeChat = () => {
    setOpen(false)
  }

  return (
    <div className={`snipet-root ${theme === "dark" ? "dark" : ""} ${positionClass}`}>
      {open && <ChatWindow config={config} onClose={closeChat} />}
      <ChatBubble open={open} onToggle={toggleChat} />
    </div>
  )
}