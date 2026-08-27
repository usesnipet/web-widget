import http from "@/lib/http";
import { publicAppSchema, type PublicApp } from "./schema";
import type { ServiceGetOptions } from "@/lib/services";


const appsUrl = (code: string) => `/api/apps/${code}`;

const findPublicApp = async (code: string, opts: ServiceGetOptions<PublicApp>): Promise<PublicApp> => {
  return http.get<PublicApp>({
    url: appsUrl(code),
    schemas: {
      response: publicAppSchema,
    },
    ...opts,
  });
}

export const appService = {
  findPublicApp,
}