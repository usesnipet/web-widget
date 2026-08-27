import { appBaseSchema } from "@/models/app";
import type z from "zod";

export interface PublicApp {
    name: string;
    description: string;
    code: string;
}

export const publicAppSchema: z.ZodType<PublicApp> = appBaseSchema.pick({
    code: true,
    name: true,
    description: true,
});
