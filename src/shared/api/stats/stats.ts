import { apiClient } from '@shared/api/client.ts';

export const getStats = async (userId: string) => {
  return apiClient
    .rpc('getUserStats', {
      puserid: userId,
    })
    .single()
    .throwOnError();
};
