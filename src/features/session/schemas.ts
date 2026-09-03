import { z } from "zod";

import { pageSchema, paginationParamsSchema, type Page } from "@/lib/pagination";
import {
  executionMessageSchema,
  sessionBaseSchema,
  sessionSchema,
  type ExecutionMessage,
  type Session,
} from "@/models/session";

/** Relations that the `include` query param can pull onto a session. */
export const sessionIncludeSchema = z.enum(["agent"]);
export type SessionInclude = z.infer<typeof sessionIncludeSchema>;

/** Body for `POST /apps/{code}/session`. */
export const createSessionSchema = sessionBaseSchema
  .pick({ agent_id: true, metadata: true })
  .partial({ metadata: true })
  .strict();

export type CreateSessionInput = z.infer<typeof createSessionSchema>;

/** Body for `PUT /apps/{code}/session/{id}`. */
export const updateSessionSchema = sessionBaseSchema
  .pick({ agent_id: true, metadata: true })
  .partial()
  .strict();

export type UpdateSessionInput = z.infer<typeof updateSessionSchema>;

/** Query params for `GET /apps/{code}/session`. */
export const listSessionsParamsSchema = paginationParamsSchema
  .extend({
    include: z.array(sessionIncludeSchema).optional(),
  })
  .strict();

export type ListSessionsParams = z.infer<typeof listSessionsParamsSchema>;

/** Query params for `GET /apps/{code}/session/{id}`. */
export const getSessionParamsSchema = z
  .object({
    include: z.array(sessionIncludeSchema).optional(),
  })
  .strict();

export type GetSessionParams = z.infer<typeof getSessionParamsSchema>;

/** Query params for `GET /apps/{code}/session/{id}/messages`. */
export const listSessionMessagesParamsSchema = paginationParamsSchema
  .extend({
    sort: z.enum(["asc", "desc"]).optional(),
  })
  .strict();

export type ListSessionMessagesParams = z.infer<typeof listSessionMessagesParamsSchema>;

/** Body for `POST /apps/{code}/session/{id}/run` — the message that starts the execution. */
export const runSessionSchema = z
  .object({
    content: z.string().min(1),
  })
  .strict();

export type RunSessionInput = z.infer<typeof runSessionSchema>;

/** Response of `GET`/`POST` for a single session — the full session model. */
export const sessionResponseSchema = sessionSchema;
export type SessionResponse = Session;

/** Response of `GET /apps/{code}/session`. */
export const sessionsPageSchema = pageSchema(sessionSchema);
export type SessionsPage = Page<Session>;

/** Response of `GET /apps/{code}/session/{id}/messages`. */
export const sessionMessagesPageSchema = pageSchema(executionMessageSchema);
export type SessionMessagesPage = Page<ExecutionMessage>;
