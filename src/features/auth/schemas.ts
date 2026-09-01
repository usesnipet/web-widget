import { z } from "zod";

export const authProviderSchema = z.enum(["google", "github"]);
export type AuthProvider = z.infer<typeof authProviderSchema>;

const jsonMapSchema = z.record(z.string(), z.unknown());

/** Not `.strict()`: token responses also carry a `user` we deliberately ignore/strip. */
export const authenticateResponseSchema = z.object({
  access_token: z.string().min(1),
  access_token_expires_at: z.coerce.date(),
  refresh_token: z.string().min(1),
  refresh_token_expires_at: z.coerce.date(),
});

export type AuthenticateResponse = z.infer<typeof authenticateResponseSchema>;

export const authTokensSchema = authenticateResponseSchema
  .pick({
    access_token: true,
    access_token_expires_at: true,
    refresh_token: true,
    refresh_token_expires_at: true,
  })
  .strict();

export type AuthTokens = z.infer<typeof authTokensSchema>;

/** Body for `POST /apps/{code}/auth/anonymous`. */
export const authenticateAnonymousSchema = z
  .object({
    email: z.string().optional(),
    name: z.string().max(255).optional(),
    picture: z.string().optional(),
    metadata: jsonMapSchema.optional(),
  })
  .strict();

export type AuthenticateAnonymousInput = z.infer<typeof authenticateAnonymousSchema>;

/** Body for `POST /apps/{code}/refresh`. */
export const refreshSchema = z
  .object({
    refresh_token: z.string().min(1),
  })
  .strict();

export type RefreshInput = z.infer<typeof refreshSchema>;

/**
 * Response of `GET /apps/{code}/user/me`. Not `.strict()` on purpose: the API may
 * embed relation arrays we don't care about — they're stripped here.
 */
export const currentUserSchema = z.object({
  id: z.uuid(),
  name: z.string(),
  email: z.string().nullable().optional(),
  picture: z.string().nullable().optional(),
  metadata: jsonMapSchema.optional(),
});

export type CurrentUser = z.infer<typeof currentUserSchema>;
