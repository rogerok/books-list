import { z } from 'zod';

export const GoalCreateRequestSchema = z.object({
  targetBooks: z.coerce.number().min(1).max(99999999),
  userId: z.string().uuid(),
});

export type GoalCreateRequestModel = z.infer<typeof GoalCreateRequestSchema>;

export const GoalResponseSchema = z.object({
  createdAt: z.string(),
  id: z.string().uuid(),
  readCount: z.number(),
  targetBooks: z.number(),
  targetDate: z.string(),
  userId: z.string(),
});

export type GoalResponseModel = z.infer<typeof GoalResponseSchema>;
