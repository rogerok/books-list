import { EmailSchema, PasswordSchema } from '@shared/lib/validation/schemas.ts';
import { z } from 'zod';

export const SignUpRequestSchema = z
  .object({
    confirmPassword: PasswordSchema,
    email: EmailSchema,
    name: z.string().max(255),
    password: PasswordSchema,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Пароли не совпадают',
    path: ['confirmPassword'],
  });

export type SignUpRequestModel = z.infer<typeof SignUpRequestSchema>;
