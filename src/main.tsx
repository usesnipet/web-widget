import { createRoot } from "react-dom/client";

import { getConfig } from "./config";
import { App } from "./app";

import variablesCss from "./index.css?inline";
import chatCss from "./chat/style.css?inline";
import chatBubbleCss from "./features/chat/components/chat-bubble/style.css?inline";
import chatWindowCss from "./features/chat/components/chat-window/style.css?inline";
import sessionSelectCss from "./features/session/components/session-select/style.css?inline";
import chatContainerCss from "./features/chat/components/chat-container/style.css?inline";
import chatEmptyStateCss from "./features/chat/components/chat-empty-state/style.css?inline";
import messageListCss from "./features/chat/components/message-list/style.css?inline";
import messageCss from "./features/chat/components/message/style.css?inline";
import messageInputCss from "./features/chat/components/message-input/style.css?inline";

const cssText = [
  variablesCss,
  chatCss,
  chatBubbleCss,
  chatWindowCss,
  sessionSelectCss,
  chatContainerCss,
  chatEmptyStateCss,
  messageListCss,
  messageCss,
  messageInputCss,
].join("\n");

function mount() {
  const config = getConfig()

  const host = document.createElement('div')
  host.id = 'snipet-widget-host'
  document.body.appendChild(host)

  const shadowRoot = host.attachShadow({ mode: 'open' })

  const style = document.createElement('style')
  style.textContent = cssText
  shadowRoot.appendChild(style)

  const appRoot = document.createElement('div')
  shadowRoot.appendChild(appRoot)

  createRoot(appRoot).render(<App config={config} />)
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", mount)
} else {
  mount()
}