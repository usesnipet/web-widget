import type { Config } from "@/config";
import { createContext, useContext } from "react";

const ConfigContext = createContext<Config | null>(null);

type Props = {
  children: React.ReactNode;
  config: Config;
}

export const ConfigProvider = ({ children, config }: Props) => {
  return (
    <ConfigContext.Provider value={config}>
      {children}
    </ConfigContext.Provider>
  );
}

export const useConfig = () => {
  const context = useContext(ConfigContext);
  if (!context) {
    throw new Error("useConfig must be used within a ConfigProvider");
  }
  return context;
}