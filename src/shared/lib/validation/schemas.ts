import { ValidationMessages } from '@shared/constants/validation-messages.ts';
import { passwordRegex } from '@shared/lib/validation/validation.ts';
import { z } from 'zod';

export const EmptyStringSchema = z.string().length(0);

export const EmailSchema = z.string().email().toLowerCase().max(255).trim();
export const PasswordSchema = z
  .string()
  .regex(passwordRegex, {
    message: ValidationMessages.invalidPassword(),
  })
  .min(6)
  .max(255);
