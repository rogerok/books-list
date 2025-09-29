import { passwordRegex } from '@shared/lib/validation/validation.ts';
import { z } from 'zod';

export const EmptyStringSchema = z.string().length(0);

export const EmailSchema = z.email().toLowerCase().max(255).trim();
export const PasswordSchema = z
  .string()
  .regex(passwordRegex, {
    error:
      'Пароль должен содержать только латинские буквы, цифры и спец символы. Должны быть минимум 1 строчная, 1 заглавная, 1 цифра и 1 один спецсимвол',
  })
  .min(6)
  .max(255);
