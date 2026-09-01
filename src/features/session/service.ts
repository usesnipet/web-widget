import http from "@/lib/http";
import type {
  ServiceDeleteOptions,
  ServiceGetOptions,
  ServicePostOptions,
  ServicePutOptions,
} from "@/lib/services";

import {
  createSessionSchema,
  getSessionParamsSchema,
  listSessionMessagesParamsSchema,
  listSessionsParamsSchema,
  sessionMessagesPageSchema,
  sessionResponseSchema,
  sessionsPageSchema,
  updateSessionSchema,
} from "./schemas";
import type {
  CreateSessionInput,
  GetSessionParams,
  ListSessionMessagesParams,
  ListSessionsParams,
  SessionMessagesPage,
  SessionResponse,
  SessionsPage,
  UpdateSessionInput,
} from "./schemas";

const sessionUrl = (code: string) => `/api/apps/${code}/session`;

/** `GET /apps/{code}/session` — lists the app's sessions, with optional pagination/includes. */
const list = async (
  code: string,
  params: ListSessionsParams = {},
  opts: ServiceGetOptions<SessionsPage, ListSessionsParams> = {},
): Promise<SessionsPage> => {
  return http.get<SessionsPage, ListSessionsParams>({
    url: sessionUrl(code),
    searchParams: params,
    schemas: {
      searchParams: listSessionsParamsSchema,
      response: sessionsPageSchema,
    },
    ...opts,
  });
};

/** `POST /apps/{code}/session` — creates a new session for the app. */
const create = async (
  code: string,
  body: CreateSessionInput,
  opts: ServicePostOptions<CreateSessionInput, SessionResponse> = {},
): Promise<SessionResponse> => {
  return http.post<SessionResponse, CreateSessionInput>({
    url: sessionUrl(code),
    body,
    schemas: {
      body: createSessionSchema,
      response: sessionResponseSchema,
    },
    ...opts,
  });
};

/** `GET /apps/{code}/session/{id}` — returns a single session by ID. */
const get = async (
  code: string,
  id: string,
  params: GetSessionParams = {},
  opts: ServiceGetOptions<SessionResponse, GetSessionParams> = {},
): Promise<SessionResponse> => {
  return http.get<SessionResponse, GetSessionParams>({
    url: `${sessionUrl(code)}/${id}`,
    searchParams: params,
    schemas: {
      searchParams: getSessionParamsSchema,
      response: sessionResponseSchema,
    },
    ...opts,
  });
};

/** `PUT /apps/{code}/session/{id}` — updates a session by ID (responds `204`). */
const update = async (
  code: string,
  id: string,
  body: UpdateSessionInput,
  opts: ServicePutOptions<UpdateSessionInput, void> = {},
): Promise<void> => {
  await http.put<void, UpdateSessionInput>({
    url: `${sessionUrl(code)}/${id}`,
    body,
    schemas: {
      body: updateSessionSchema,
    },
    ...opts,
  });
};

/** `DELETE /apps/{code}/session/{id}` — deletes a session by ID (responds `204`). */
const remove = async (
  code: string,
  id: string,
  opts: ServiceDeleteOptions<void> = {},
): Promise<void> => {
  await http.delete<void>({
    url: `${sessionUrl(code)}/${id}`,
    ...opts,
  });
};

/** `GET /apps/{code}/session/{id}/messages` — lists a session's execution messages. */
const listMessages = async (
  code: string,
  id: string,
  params: ListSessionMessagesParams = {},
  opts: ServiceGetOptions<SessionMessagesPage, ListSessionMessagesParams> = {},
): Promise<SessionMessagesPage> => {
  return http.get<SessionMessagesPage, ListSessionMessagesParams>({
    url: `${sessionUrl(code)}/${id}/messages`,
    searchParams: params,
    schemas: {
      searchParams: listSessionMessagesParamsSchema,
      response: sessionMessagesPageSchema,
    },
    ...opts,
  });
};

// `POST /apps/{code}/session/{id}/run` streams via SSE — intentionally not implemented yet.

export const sessionService = {
  list,
  create,
  get,
  update,
  remove,
  listMessages,
};
