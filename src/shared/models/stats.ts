import { BookStatusEnumSchema } from '@shared/models/book.ts';
import { z } from 'zod';

export const StatsResponseSchema = z.object({
  [BookStatusEnumSchema.enum.read]: z.number(),
  [BookStatusEnumSchema.enum.reading]: z.number(),
  [BookStatusEnumSchema.enum.toRead]: z.number(),
});

export type StatsResponsetModel = z.infer<typeof StatsResponseSchema>;
