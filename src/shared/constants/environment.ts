import type { EnvVarsType } from '@shared/config/env/envSchema.ts';

export const EnvironmentVariables: EnvVarsType = {
  VITE_SUPABASE_KEY: import.meta.env.VITE_SUPABASE_KEY,
  VITE_SUPABASE_URL: import.meta.env.VITE_SUPABASE_URL,
} as const;
