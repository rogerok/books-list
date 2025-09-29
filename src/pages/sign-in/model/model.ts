import { EmailSchema, PasswordSchema } from '@shared/lib/validation/schemas.ts';
import { z } from 'zod';

export const SignInRequestSchema = z.object({
  email: EmailSchema,
  password: PasswordSchema,
});

export type SignInRequestModel = z.infer<typeof SignInRequestSchema>;
