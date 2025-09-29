import { EmailSchema } from '@shared/lib/validation/schemas.ts';
import { z } from 'zod';

export const UserCreateRequestSchema = z.object({
  email: EmailSchema,
  id: z.string(),
  name: z.string().max(255),
});

export type UserCreateRequestModel = z.infer<typeof UserCreateRequestSchema>;
