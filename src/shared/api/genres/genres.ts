import { apiClient } from '@shared/api/client.ts';

export const getGenres = async () => {
  return apiClient.from('genres').select('*').order('name').throwOnError();
};
