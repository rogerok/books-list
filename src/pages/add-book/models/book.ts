import { BookCreateRequestSchema } from '@shared/models/book.ts';
import { z } from 'zod';

export const BookCreateFormSchema = BookCreateRequestSchema.extend({
  outerCoverUrl: z.string(),
});

export type BookCreateFormModel = z.infer<typeof BookCreateFormSchema>;
