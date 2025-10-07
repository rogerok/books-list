import type { StatsRequestModel } from '@shared/models/stats.ts';

import { apiClient } from '@shared/api/client.ts';

export const getStats = async (data: StatsRequestModel) => {
  return apiClient
    .rpc('getUserStats', {
      insearchterm: data.searchTerm,
      puserid: data.userId,
    })
    .single()
    .throwOnError();
};
