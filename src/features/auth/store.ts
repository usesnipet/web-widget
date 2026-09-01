import { create } from "zustand";

import { authenticateResponseSchema } from "./schemas";

import type { AuthenticateResponse, CurrentUser } from "./schemas";

const KEYS = {
  accessToken: "snipet@access-token",
  accessTokenExpiresAt: "snipet@access-token-expires-at",
  refreshToken: "snipet@refresh-token",
  refreshTokenExpiresAt: "snipet@refresh-token-expires-at",
} as const;

function readDate(key: string): Date | null {
  const raw = localStorage.getItem(key);
  if (!raw) return null;
  const date = new Date(raw);
  return Number.isNaN(date.getTime()) ? null : date;
}

function writeDate(key: string, value: Date) {
  localStorage.setItem(key, value.toISOString());
}

type AuthStore = {
  accessToken: string | null;
  accessTokenExpiresAt: Date | null;
  refreshToken: string | null;
  refreshTokenExpiresAt: Date | null;
  /** Current user — kept in memory only, always (re)loaded from `GET /user/me`. */
  user: CurrentUser | null;
  setTokens: (response: AuthenticateResponse) => void;
  setUser: (user: CurrentUser | null) => void;
  clear: () => void;
};

export const useAuthStore = create<AuthStore>((set) => ({
  accessToken: localStorage.getItem(KEYS.accessToken),
  accessTokenExpiresAt: readDate(KEYS.accessTokenExpiresAt),
  refreshToken: localStorage.getItem(KEYS.refreshToken),
  refreshTokenExpiresAt: readDate(KEYS.refreshTokenExpiresAt),
  user: null,

  setTokens: (response) => {
    const parsed = authenticateResponseSchema.parse(response);

    localStorage.setItem(KEYS.accessToken, parsed.access_token);
    writeDate(KEYS.accessTokenExpiresAt, parsed.access_token_expires_at);
    localStorage.setItem(KEYS.refreshToken, parsed.refresh_token);
    writeDate(KEYS.refreshTokenExpiresAt, parsed.refresh_token_expires_at);

    set({
      accessToken: parsed.access_token,
      accessTokenExpiresAt: parsed.access_token_expires_at,
      refreshToken: parsed.refresh_token,
      refreshTokenExpiresAt: parsed.refresh_token_expires_at,
    });
  },

  setUser: (user) => set({ user }),

  clear: () => {
    for (const key of Object.values(KEYS)) {
      localStorage.removeItem(key);
    }

    set({
      accessToken: null,
      accessTokenExpiresAt: null,
      refreshToken: null,
      refreshTokenExpiresAt: null,
      user: null,
    });
  },
}));
