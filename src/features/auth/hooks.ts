import { useCallback, useEffect, useRef } from "react";

import {
  useMutation,
  useQuery,
  type UseMutationResult,
  type UseQueryResult,
} from "@tanstack/react-query";

import { useConfig } from "@/context/config";
import type { ServiceGetOptions, ServicePostOptions } from "@/lib/services";

import { authService } from "./service";
import { useAuthStore } from "./store";
import type {
  AuthProvider,
  AuthenticateAnonymousInput,
  AuthenticateResponse,
  CurrentUser,
  RefreshInput,
} from "./schemas";

const BASE_QUERY_KEY = "auth";

export const currentUserQueryKey = (code: string) => [BASE_QUERY_KEY, "currentUser", code];

/** `POST /apps/{code}/auth/anonymous` — persists the returned tokens into the auth store. */
export const useAuthenticateAnonymous = (
  opts: ServicePostOptions<AuthenticateAnonymousInput, AuthenticateResponse> = {},
): UseMutationResult<AuthenticateResponse, Error, AuthenticateAnonymousInput | void> => {
  const { appCode } = useConfig();
  const setTokens = useAuthStore((state) => state.setTokens);

  return useMutation({
    mutationFn: (input: AuthenticateAnonymousInput | void = {}) =>
      authService.authenticateAnonymous(appCode, input ?? {}, opts),
    onSuccess: (data) => setTokens(data),
  });
};

/**
 * `POST /apps/{code}/authenticate/{provider_name}` — persists the returned tokens
 * into the auth store.
 */
export const useAuthenticateWithProvider = (
  opts: ServicePostOptions<undefined, AuthenticateResponse> = {},
): UseMutationResult<AuthenticateResponse, Error, AuthProvider> => {
  const { appCode } = useConfig();
  const setTokens = useAuthStore((state) => state.setTokens);

  return useMutation({
    mutationFn: (provider: AuthProvider) =>
      authService.authenticateWithProvider(appCode, provider, opts),
    onSuccess: (data) => setTokens(data),
  });
};

/**
 * `POST /apps/{code}/refresh` — exchanges the stored refresh token for a new token
 * pair and persists it into the auth store.
 */
export const useRefresh = (
  opts: ServicePostOptions<RefreshInput, AuthenticateResponse> = {},
): UseMutationResult<AuthenticateResponse, Error, void> => {
  const { appCode } = useConfig();
  const setTokens = useAuthStore((state) => state.setTokens);

  return useMutation({
    mutationFn: () => {
      const { refreshToken } = useAuthStore.getState();
      if (!refreshToken) {
        return Promise.reject(new Error("No refresh token available"));
      }
      return authService.refresh(appCode, { refresh_token: refreshToken }, opts);
    },
    onSuccess: (data) => setTokens(data),
  });
};

/** `GET /apps/{code}/user/me` — the current user; enabled only once tokens exist. */
export const useCurrentUser = (
  opts: ServiceGetOptions<CurrentUser> = {},
): UseQueryResult<CurrentUser, Error> => {
  const { appCode } = useConfig();
  const isAuthenticated = useIsAuthenticated();

  return useQuery({
    queryKey: currentUserQueryKey(appCode),
    queryFn: () => authService.getCurrentUser(appCode, opts),
    enabled: isAuthenticated && !!appCode,
  });
};

/**
 * Drives the widget's auth lifecycle:
 * - no session yet  → creates one through anonymous login;
 * - session present → loads the user from `GET /user/me`.
 *
 * The current user is mirrored into the auth store (memory only, never localStorage).
 */
export const useAuthFlow = () => {
  const isAuthenticated = useIsAuthenticated();
  const setUser = useAuthStore((state) => state.setUser);

  const anonymous = useAuthenticateAnonymous();
  const currentUser = useCurrentUser();

  const anonymousMutate = anonymous.mutate;
  const bootstrapped = useRef(false);

  useEffect(() => {
    if (isAuthenticated || anonymous.isPending || bootstrapped.current) return;
    bootstrapped.current = true;
    anonymousMutate();
  }, [isAuthenticated, anonymous.isPending, anonymousMutate]);

  useEffect(() => {
    setUser(currentUser.data ?? null);
  }, [currentUser.data, setUser]);

  const isLoading =
    (!isAuthenticated && !anonymous.isError) || (isAuthenticated && currentUser.isLoading);

  return {
    isAuthenticated,
    user: currentUser.data ?? null,
    isLoading,
    error: anonymous.error ?? currentUser.error ?? null,
  };
};

/** Logs the user out — for now this only wipes the persisted auth data. */
export const useLogout = (): (() => void) => {
  const clear = useAuthStore((state) => state.clear);
  return useCallback(() => clear(), [clear]);
};

export const useAuthUser = () => useAuthStore((state) => state.user);
export const useIsAuthenticated = () => useAuthStore((state) => !!state.accessToken);
