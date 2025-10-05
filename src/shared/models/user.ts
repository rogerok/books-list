import { EmailSchema } from '@shared/lib/validation/schemas.ts';
import { z } from 'zod';

export const UserCreateRequestSchema = z.object({
  email: EmailSchema,
  id: z.string(),
  name: z.string().min(3).max(255),
});

export type UserCreateRequestModel = z.infer<typeof UserCreateRequestSchema>;

export const UserResponseSchema = z.object({
  createdAt: z.string().nullable(),
  email: EmailSchema,
  id: z.string(),
  name: z.string().min(3).max(255),
});

export type UserResponseModel = z.infer<typeof UserResponseSchema>;
