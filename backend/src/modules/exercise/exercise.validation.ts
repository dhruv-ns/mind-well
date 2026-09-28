import { z } from 'zod';

export const toggleExerciseSchema = z.object({
  params: z.object({
    id: z.string().regex(/^\d+$/).transform(Number),
  }),
});

export type ToggleExerciseParams = z.infer<typeof toggleExerciseSchema>['params'];
