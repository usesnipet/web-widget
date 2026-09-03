import {
  useMutation,
  useQuery,
  useQueryClient,
  type UseMutationResult,
  type UseQueryResult,
} from "@tanstack/react-query";

import { useConfig } from "@/context/config";
import type {
  ServiceDeleteOptions,
  ServiceGetOptions,
  ServicePostOptions,
  ServicePutOptions,
} from "@/lib/services";

import { sessionService } from "./service";
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
import { useSessionStore } from "./store";

const BASE_QUERY_KEY = "session";

export const sessionsQueryKey = (code: string, params: ListSessionsParams = {}) =>
  [BASE_QUERY_KEY, "list", code, params] as const;

export const sessionQueryKey = (code: string, id: string, params: GetSessionParams = {}) =>
  [BASE_QUERY_KEY, "detail", code, id, params] as const;

export const sessionMessagesQueryKey = (
  code: string,
  id?: string,
  params: ListSessionMessagesParams = {},
) => [BASE_QUERY_KEY, "messages", code, id, params] as const;

/** `GET /apps/{code}/session` — paginated session list; enabled once the app code is known. */
export const useSessions = (
  params: ListSessionsParams = {},
  opts: ServiceGetOptions<SessionsPage, ListSessionsParams> = {},
): UseQueryResult<SessionsPage, Error> => {
  const { appCode } = useConfig();
  const setSessions = useSessionStore((state) => state.setSessions);

  return useQuery({
    queryKey: sessionsQueryKey(appCode, params),
    queryFn: async () => {
      const result = await sessionService.list(appCode, params, opts);
      setSessions(result.data);
      return result;
    },
    enabled: !!appCode,
  });
};

/** `GET /apps/{code}/session/{id}` — a single session; enabled once code and id are known. */
export const useSession = (
  id: string,
  params: GetSessionParams = {},
  opts: ServiceGetOptions<SessionResponse, GetSessionParams> = {},
): UseQueryResult<SessionResponse, Error> => {
  const { appCode } = useConfig();

  return useQuery({
    queryKey: sessionQueryKey(appCode, id, params),
    queryFn: () => sessionService.get(appCode, id, params, opts),
    enabled: !!appCode && !!id,
  });
};

/** `GET /apps/{code}/session/{id}/messages` — a session's execution messages. */
export const useSessionMessages = (
  id: string,
  params: ListSessionMessagesParams = {},
  opts: ServiceGetOptions<SessionMessagesPage, ListSessionMessagesParams> = {},
): UseQueryResult<SessionMessagesPage, Error> => {
  const { appCode } = useConfig();

  return useQuery({
    queryKey: sessionMessagesQueryKey(appCode, id, params),
    queryFn: () => sessionService.listMessages(appCode, id, params, opts),
    enabled: !!appCode && !!id && id !== "",
  });
};

/** `POST /apps/{code}/session` — creates a session and invalidates the session list. */
export const useCreateSession = (
  opts: ServicePostOptions<CreateSessionInput, SessionResponse> = {},
): UseMutationResult<SessionResponse, Error, CreateSessionInput> => {
  const { appCode } = useConfig();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: CreateSessionInput) => sessionService.create(appCode, input, opts),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [BASE_QUERY_KEY, "list", appCode] });
    },
  });
};

/** `PUT /apps/{code}/session/{id}` — updates a session and refreshes its cached copies. */
export const useUpdateSession = (
  opts: ServicePutOptions<UpdateSessionInput, void> = {},
): UseMutationResult<void, Error, { id: string; data: UpdateSessionInput }> => {
  const { appCode } = useConfig();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateSessionInput }) =>
      sessionService.update(appCode, id, data, opts),
    onSuccess: (_result, { id }) => {
      queryClient.invalidateQueries({ queryKey: [BASE_QUERY_KEY, "list", appCode] });
      queryClient.invalidateQueries({ queryKey: [BASE_QUERY_KEY, "detail", appCode, id] });
    },
  });
};

/** `DELETE /apps/{code}/session/{id}` — deletes a session and drops it from the cache. */
export const useDeleteSession = (
  opts: ServiceDeleteOptions<void> = {},
): UseMutationResult<void, Error, string> => {
  const { appCode } = useConfig();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => sessionService.remove(appCode, id, opts),
    onSuccess: (_result, id) => {
      queryClient.invalidateQueries({ queryKey: [BASE_QUERY_KEY, "list", appCode] });
      queryClient.removeQueries({ queryKey: [BASE_QUERY_KEY, "detail", appCode, id] });
    },
  });
};
