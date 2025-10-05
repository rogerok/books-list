import type { UserCreateRequestModel } from '@shared/models/user.ts';

import { apiClient } from '@shared/api/client.ts';

export const userCreate = async (data: UserCreateRequestModel) => {
  return apiClient
    .from('users')
    .insert([{ email: data.email, id: data.id, name: data.name }])
    .throwOnError();
};

export const getUSer = async (id: string) => {
  return apiClient
    .from('users')
    .select('*')
    .eq('id', id)
    .single()
    .throwOnError();
};
