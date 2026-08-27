import { z } from "zod";

export const authProviderSchema = z.enum(["google", "github"]);
export type AuthProvider = z.infer<typeof authProviderSchema>;


export const authenticateResponseSchema = z
  .object({
    access_token: z.string().min(1),
    access_token_expires_at: z.coerce.date(),
    refresh_token: z.string().min(1),
    refresh_token_expires_at: z.coerce.date(),
    // user: userSchema,
  })
  .strict();

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
