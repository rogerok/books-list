import { EmailSchema, PasswordSchema } from '@shared/lib/validation/schemas.ts';
import { z } from 'zod';

export const SignUpRequestSchema = z.object({
  email: EmailSchema,
  password: PasswordSchema,
});

export type SignUpRequestModel = z.infer<typeof SignUpRequestSchema>;

export const SignInRequestSchema = z.object({
  email: EmailSchema,
  password: PasswordSchema,
});

export type SignInRequestModel = z.infer<typeof SignInRequestSchema>;
