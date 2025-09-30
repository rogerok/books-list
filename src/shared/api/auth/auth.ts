import type {
  SignInRequestModel,
  SignUpRequestModel,
} from '@shared/models/auth.ts';

import { apiClient } from '@shared/api/client.ts';

export const signUpRequest = async (data: SignUpRequestModel) => {
  return apiClient.auth.signUp({
    email: data.email,
    password: data.password,
  });
};

export const signInRequest = async (data: SignInRequestModel) => {
  return apiClient.auth.signInWithPassword({
    email: data.email,
    password: data.password,
  });
};

export const getSessionRequest = async () => {
  return apiClient.auth.getSession();
};

export const signOutRequest = async () => {
  return apiClient.auth.signOut();
};
