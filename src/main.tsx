import { createRoot } from "react-dom/client";

import { getConfig } from "./config";
import { App } from "./app";

import variablesCss from "./index.css?inline";
import sessionCss from "./session/style.css?inline";
import sessionBubbleCss from "./features/session/components/session-bubble/style.css?inline";
import sessionWindowCss from "./features/session/components/session-window/style.css?inline";
import sessionSelectCss from "./features/session/components/session-select/style.css?inline";
import sessionContainerCss from "./features/session/components/session-container/style.css?inline";
import sessionEmptyStateCss from "./features/session/components/session-empty-state/style.css?inline";
import messageListCss from "./features/session/components/message-list/style.css?inline";
import messageCss from "./features/session/components/message/style.css?inline";
import messageInputCss from "./features/session/components/message-input/style.css?inline";

const cssText = [
  variablesCss,
  sessionCss,
  sessionBubbleCss,
  sessionWindowCss,
  sessionSelectCss,
  sessionContainerCss,
  sessionEmptyStateCss,
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