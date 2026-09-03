import { z } from "zod";

export interface Agent {
  id: string;
  name: string;
}

export const agentSchema: z.ZodType<Agent> = z
  .object({
    id: z.uuid(),
    name: z.string(),
  })
  .strict();

/** Join row relating an app to one of its agents; returned on the public app endpoint. */
export interface AppToAgent {
  app_id: string;
  agent_id: string;
  agent?: Agent | null;
}

export const appToAgentSchema: z.ZodType<AppToAgent> = z.lazy(() =>
  z
    .object({
      app_id: z.uuid(),
      agent_id: z.uuid(),
      agent: agentSchema.nullable().optional(),
    })
    .strict(),
);
