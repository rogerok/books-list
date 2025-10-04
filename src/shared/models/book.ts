import { EmptyStringSchema } from '@shared/lib/validation/schemas.ts';
import { z } from 'zod';

export const BookStatusEnumSchema = z.enum(['read', 'reading', 'toRead']);

export type BookStatusType = z.infer<typeof BookStatusEnumSchema>;

export const BookCreateRequestSchema = z.object({
  author: z.string().min(2).max(255),
  coverUrl: z.string().or(EmptyStringSchema),
  genre: z.string().or(EmptyStringSchema).nullable(),
  title: z.string().min(2).max(255),
});

export type BookCreateRequestModel = z.infer<typeof BookCreateRequestSchema>;

export const BookCreateFormSchema = BookCreateRequestSchema.extend({
  outerCoverUrl: z.string(),
  status: BookStatusEnumSchema,
});

export type BookCreateFormModel = z.infer<typeof BookCreateFormSchema>;

export const UserBookCreateRequestSchema = z.object({
  bookId: z.string().uuid(),
  status: BookStatusEnumSchema,
  userId: z.string().uuid(),
});

export type UserBookRequestModel = z.infer<typeof UserBookCreateRequestSchema>;
