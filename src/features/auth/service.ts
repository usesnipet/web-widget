import http from "@/lib/http";
import type { ServiceGetOptions, ServicePostOptions } from "@/lib/services";

import {
  authenticateAnonymousSchema,
  authenticateResponseSchema,
  currentUserSchema,
  refreshSchema,
} from "./schemas";
import type {
  AuthProvider,
  AuthenticateAnonymousInput,
  AuthenticateResponse,
  CurrentUser,
  RefreshInput,
} from "./schemas";

const authUrl = (code: string) => `/api/apps/${code}`;

/** `POST /apps/{code}/auth/anonymous` — creates or authenticates an anonymous app user. */
const authenticateAnonymous = async (
  code: string,
  body: AuthenticateAnonymousInput = {},
  opts: ServicePostOptions<AuthenticateAnonymousInput, AuthenticateResponse> = {},
): Promise<AuthenticateResponse> => {
  return http.post<AuthenticateResponse, AuthenticateAnonymousInput>({
    url: `${authUrl(code)}/auth/anonymous`,
    body,
    schemas: {
      body: authenticateAnonymousSchema,
      response: authenticateResponseSchema,
    },
    ...opts,
  });
};

/** `POST /apps/{code}/authenticate/{provider_name}` — authenticates through an auth provider. */
const authenticateWithProvider = async (
  code: string,
  provider: AuthProvider,
  opts: ServicePostOptions<undefined, AuthenticateResponse> = {},
): Promise<AuthenticateResponse> => {
  return http.post<AuthenticateResponse, undefined>({
    url: `${authUrl(code)}/authenticate/${provider}`,
    schemas: {
      response: authenticateResponseSchema,
    },
    ...opts,
  });
};

/** `POST /apps/{code}/refresh` — exchanges a refresh token for a new access/refresh pair. */
const refresh = async (
  code: string,
  body: RefreshInput,
  opts: ServicePostOptions<RefreshInput, AuthenticateResponse> = {},
): Promise<AuthenticateResponse> => {
  return http.post<AuthenticateResponse, RefreshInput>({
    url: `${authUrl(code)}/refresh`,
    body,
    schemas: {
      body: refreshSchema,
      response: authenticateResponseSchema,
    },
    ...opts,
  });
};

/** `GET /apps/{code}/user/me` — returns the currently authenticated user. */
const getCurrentUser = async (
  code: string,
  opts: ServiceGetOptions<CurrentUser> = {},
): Promise<CurrentUser> => {
  return http.get<CurrentUser>({
    url: `${authUrl(code)}/user/me`,
    schemas: {
      response: currentUserSchema,
    },
    ...opts,
  });
};

export const authService = {
  authenticateAnonymous,
  authenticateWithProvider,
  refresh,
  getCurrentUser,
};
