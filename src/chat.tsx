import { useState } from "react";

import { ChatBubble } from "./components/chat-bubble";
import { ChatWindow } from "./components/chat-window";
import { useTheme } from "./hooks/use-theme";

import type { Config } from "./config"

type Props = {
  config: Config
}
export const Chat = ({ config }: Props) => {
  const [open, setOpen] = useState(false)
  const theme = useTheme(config.color)

  const positionClass = config.position === "bottom-left"
    ? "left-5 items-start"
    : "right-5 items-end"

  return (
    <div className={`snipet-root ${theme === "dark" ? "dark" : ""} fixed bottom-5 z-[2147483000] flex flex-col gap-3 text-sm leading-normal ${positionClass}`}>
      {open && <ChatWindow config={config} onClose={() => setOpen(false)} />}
      <ChatBubble open={open} onToggle={() => setOpen((v) => !v)} />
    </div>
  )
}