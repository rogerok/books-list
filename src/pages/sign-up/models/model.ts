import { PasswordSchema } from '@shared/lib/validation/schemas.ts';
import { SignUpRequestSchema } from '@shared/models/auth.ts';
import { z } from 'zod';

export const SignUpFormSchema = z
  .object({
    ...SignUpRequestSchema.shape,
    confirmPassword: PasswordSchema,
    name: z
      .string()
      .trim()
      .min(3, 'Имя должно содержать минимум 3 символа')
      .max(255),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Пароли не совпадают',
    path: ['confirmPassword'],
  });

export type SignUpFormType = z.infer<typeof SignUpFormSchema>;
