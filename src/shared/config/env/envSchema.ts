import { z } from 'zod';

export const EnvSchema = z.object({
  VITE_SUPABASE_KEY: z.string({
    error: 'Не задана переменная окружения VITE_SUPABASE_URL',
  }),
  VITE_SUPABASE_URL: z.string({
    error: 'Не задана переменная окружения VITE_SUPABASE_URL',
  }),
});
