import { z } from 'zod';

export const BookStateEnumSchema = z.enum(['read', 'reading', 'toRead']);

export type BookStateType = z.infer<typeof BookStateEnumSchema>;

export const BookCreateRequestSchema = z.object({
  author: z.string().min(0).max(255),
  coverUrl: z.string().optional(),
  genre: z.string().uuid().optional(),
  title: z.string().min(0).max(255),
});

export type BookCreateRequestModel = z.infer<typeof BookCreateRequestSchema>;

export const UserBookCreateRequestSchema = z.object({
  bookId: z.string().uuid(),
  userId: z.string().uuid(),
});
export type UserBookRequestModel = z.infer<typeof UserBookCreateRequestSchema>;
