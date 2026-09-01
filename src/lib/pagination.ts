import { z } from "zod";

/** Shared `{ data, skip, take, total }` envelope returned by every paginated list endpoint. */
export interface Page<T> {
  data: T[];
  skip: number;
  take: number;
  total: number;
}

/** Wraps an item schema into a `Page<T>` response schema. */
export const pageSchema = <T>(item: z.ZodType<T>): z.ZodType<Page<T>> =>
  z.object({
    data: z.array(item),
    skip: z.number().int(),
    take: z.number().int(),
    total: z.number().int(),
  });

/** Query params common to paginated list endpoints (`?take=&skip=`). */
export const paginationParamsSchema = z
  .object({
    take: z.number().int().positive().optional(),
    skip: z.number().int().nonnegative().optional(),
  })
  .strict();

export type PaginationParams = z.infer<typeof paginationParamsSchema>;
