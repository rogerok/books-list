import {
  BookCreateRequestSchema,
  BookStatusEnumSchema,
} from '@shared/models/book.ts';
import { z } from 'zod';

export const BookCreateFormSchema = BookCreateRequestSchema.extend({
  outerCoverUrl: z.string(),
  status: BookStatusEnumSchema,
});

export type BookCreateFormModel = z.infer<typeof BookCreateFormSchema>;
