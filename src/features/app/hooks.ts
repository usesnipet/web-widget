import type { ServiceGetOptions } from "@/lib/services";
import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import { appService } from "./service";
import type { PublicApp } from "./schema";
import { useConfig } from "@/context/config";

const BASE_QUERY_KEY = "app";

export const findPublicAppQueryKey = (code: string) => [BASE_QUERY_KEY, "findPublicApp", code];
export const useFindPublicApp = (opts: ServiceGetOptions<PublicApp> = {}): UseQueryResult<PublicApp, Error> => {
  const config = useConfig();
  const code = config.appCode;

  return useQuery({
    queryKey: findPublicAppQueryKey(code),
    queryFn: (): Promise<PublicApp> => appService.findPublicApp(code, opts),
    enabled: !!code,
  })
}