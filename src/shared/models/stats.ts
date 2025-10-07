import { EmptyStringSchema } from '@shared/lib/validation/schemas.ts';
import { BookStatusEnumSchema } from '@shared/models/book.ts';
import { z } from 'zod';

export const StatsResponseSchema = z.object({
  [BookStatusEnumSchema.enum.read]: z.number(),
  [BookStatusEnumSchema.enum.reading]: z.number(),
  [BookStatusEnumSchema.enum.toRead]: z.number(),
});

export type StatsResponseModel = z.infer<typeof StatsResponseSchema>;

export const StatsRequestSchema = z.object({
  searchTerm: z.string().max(255).or(EmptyStringSchema),
  userId: z.string().uuid(),
});

export type StatsRequestModel = z.infer<typeof StatsRequestSchema>;
