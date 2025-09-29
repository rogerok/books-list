import type { SignUpRequestModel } from '@shared/models/auth.ts';
import type { AuthResponse } from '@supabase/supabase-js';

import { apiClient } from '@shared/api/client.ts';

export const signUp = (data: SignUpRequestModel): Promise<AuthResponse> => {
  return apiClient.auth.signUp({
    email: data.email,
    password: data.password,
  });
};
