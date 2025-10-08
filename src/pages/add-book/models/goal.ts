import { z } from 'zod';

export const GoalCreateFormSchema = z.object({
  targetBooks: z.coerce.number().min(1).max(99999999),
});

export type GoalCreateFormType = z.infer<typeof GoalCreateFormSchema>;
