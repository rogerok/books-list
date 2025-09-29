import type { Database } from '@shared/types/supabase.ts';

import { createClient } from '@supabase/supabase-js';

export const apiClient = createClient<Database>(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_KEY,
);
