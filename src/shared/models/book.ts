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

export const UserBookCreateRequestSchema = z.object({
  bookId: z.string().uuid(),
  status: BookStatusEnumSchema,
  userId: z.string().uuid(),
});

export type UserBookRequestModel = z.infer<typeof UserBookCreateRequestSchema>;

export const BookResponseSchema = z.object({
  author: z.string(),
  bookCreatedAt: z.string(),
  bookId: z.string(),
  bookUpdatedAt: z.string(),
  coverUrl: z.string().nullable(),
  createdAt: z.string(),
  genreId: z.string().nullable(),
  genreName: z.string().nullable(),
  id: z.string().uuid(),
  notes: z.string().nullable(),
  progress: z.number(),
  rating: z.number().nullable(),
  // TODO: Find out how get from supabase response as enum of book's status
  // status: BookStatusEnumSchema,
  status: z.string(),
  title: z.string(),
  updatedAt: z.string(),
  userId: z.string(),
});

export type BookResponseModel = z.infer<typeof BookResponseSchema>;

export const BookProgressUpdateRequestSchema = z.object({
  bookId: z.string().uuid(),
  progress: z.coerce.number().min(0),
});

export type BookProgressUpdateModel = z.infer<
  typeof BookProgressUpdateRequestSchema
>;

export const BookStatusUpdateRequestSchema = z.object({
  bookId: z.string().uuid(),
  status: BookStatusEnumSchema,
});

export type BookStatusUpdateRequestModel = z.infer<
  typeof BookStatusUpdateRequestSchema
>;

export const BookNotesUpdateRequestSchema = z.object({
  bookId: z.string().uuid(),
  notes: z.string().max(500),
});

export type BookNotesUpdateRequestModel = z.infer<
  typeof BookNotesUpdateRequestSchema
>;

export const BookGetListRequestSchema = z.object({
  status: BookStatusEnumSchema.or(EmptyStringSchema),
  title: z.string().or(EmptyStringSchema),
  userId: z.string().uuid(),
});

export type BookGetListRequestModel = z.infer<typeof BookGetListRequestSchema>;
