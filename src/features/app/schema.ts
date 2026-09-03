import { appBaseSchema } from "@/models/app";
import { appToAgentSchema, type AppToAgent } from "@/models/agent";
import { z } from "zod";

export interface PublicApp {
    name: string;
    description: string;
    code: string;
    app_to_agents: AppToAgent[];
}

export const publicAppSchema: z.ZodType<PublicApp> = appBaseSchema
    .pick({
        code: true,
        name: true,
        description: true,
    })
    .extend({
        app_to_agents: z.array(appToAgentSchema),
    });

/** The agent a new session should be created with, until apps can pick among several. */
export const getDefaultAgentId = (app?: PublicApp | null): string | undefined =>
    app?.app_to_agents[0]?.agent_id;
