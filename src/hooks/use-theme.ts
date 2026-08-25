import { useEffect, useState } from "react";

import type { Config } from "../config";

type ResolvedTheme = "light" | "dark";

const getSystemTheme = (): ResolvedTheme =>
  window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";

export function useTheme(configColor: Config["color"]): ResolvedTheme {
  const color = configColor;

  const [systemTheme, setSystemTheme] = useState<ResolvedTheme>(getSystemTheme);

  useEffect(() => {
    if (color !== "auto") return;

    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = (e: MediaQueryListEvent) => setSystemTheme(e.matches ? "dark" : "light");

    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, [color]);

  return color === "auto" ? systemTheme : color;
}
