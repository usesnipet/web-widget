import { useEffect, useState } from "react";

import { ChatBubble } from "../features/chat/components/chat-bubble";
import { ChatWindow } from "../features/chat/components/chat-window";

import { useTheme } from "../hooks/use-theme";
import { useFindPublicApp } from "../features/app/hooks";
import { useAuthFlow } from "../features/auth/hooks";
import { useConfig } from "../context/config";
import { SessionProvider } from "../context/session";

export const Chat = () => {
  const [open, setOpen] = useState(false);
  const config = useConfig();
  const { isLoading, error } = useFindPublicApp();
  const { isLoading: authLoading, error: authError } = useAuthFlow();
  const theme = useTheme(config.color);

  const positionClass = config.position === "bottom-left"
    ? "snipet-position-left"
    : "snipet-position-right"

  const toggleChat = () => {
    setOpen(!open)
  }

  const closeChat = () => {
    setOpen(false)
  }

  useEffect(() => { if (error) console.error(error) }, [error]);
  useEffect(() => { if (authError) console.error(authError) }, [authError]);

  if (isLoading || authLoading || error) return null;

  return (
    <div className={`snipet-root ${theme === "dark" ? "dark" : ""} ${positionClass}`}>
      <SessionProvider>
        {open && <ChatWindow config={config} onClose={closeChat} />}
        <ChatBubble open={open} onToggle={toggleChat} />
      </SessionProvider>
    </div>
  )
}