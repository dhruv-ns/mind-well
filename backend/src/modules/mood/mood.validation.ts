import { z } from 'zod';

export const createMoodSchema = z.object({
  body: z.object({
    score: z.number().min(1).max(5),
    note: z.string().optional(),
    factors: z.array(z.string()).optional().default([]),
  }),
});

export const getMoodsSchema = z.object({
  query: z.object({
    days: z.string().regex(/^\d+$/).default('30').transform(Number),
  }),
});

export type CreateMoodInput = z.infer<typeof createMoodSchema>['body'];
export type GetMoodsQuery = z.infer<typeof getMoodsSchema>['query'];
