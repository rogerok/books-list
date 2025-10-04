import { z } from 'zod';

export const EnvVarsSchema = z.object({
  VITE_SUPABASE_KEY: z.string({
    message: 'Не задана переменная окружения VITE_SUPABASE_URL',
  }),
  VITE_SUPABASE_URL: z.string({
    message: 'Не задана переменная окружения VITE_SUPABASE_URL',
  }),
});

export type EnvVarsType = z.infer<typeof EnvVarsSchema>;
