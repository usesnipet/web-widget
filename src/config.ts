export type Config = {
  clientCode: string;
  position: "bottom-left" | "bottom-right";
  color: "light" | "dark";
  apiUrl: string;
}

export const DEFAULT_CONFIG: Partial<Config> = {
  position: "bottom-right",
  color: "light",
  apiUrl: "https://api.example.com",
}

const CURRENT_SCRIPT = document.currentScript

export const getConfig = (): Config => {
  const attrs: Partial<Config> = CURRENT_SCRIPT ? {
    clientCode: CURRENT_SCRIPT.getAttribute("client-code") ?? undefined,
    position: (CURRENT_SCRIPT.getAttribute("position") ?? undefined) as Config["position"] | undefined,
    color: (CURRENT_SCRIPT.getAttribute("color") ?? undefined) as Config["color"] | undefined,
    apiUrl: CURRENT_SCRIPT.getAttribute("api-url") ?? undefined,
  }: {}

  const config = {
    ...DEFAULT_CONFIG,
    ...attrs,
    ...((window as unknown as { SnipetSettings: Config }).SnipetSettings || {}),
  } as Config
  if (!config.clientCode) {
    throw new Error("client-code is required")
  }
  if (!config.apiUrl) {
    throw new Error("api-url is required")
  }
  if (!config.position) {
    throw new Error("position is required")
  }
  if (!config.color) {
    throw new Error("color is required")
  }
  return config
}