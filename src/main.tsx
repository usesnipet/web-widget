import { createRoot } from "react-dom/client";

import { getConfig } from "./config";
import cssText from "./index.css?inline";
import { App } from "./app";

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