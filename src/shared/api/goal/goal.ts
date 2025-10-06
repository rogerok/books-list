import type { GoalCreateRequestModel } from '@shared/models/goal.ts';

import { apiClient } from '@shared/api/client.ts';

export const getGoal = async (userId: string) => {
  return apiClient
    .rpc('getUserGoal', { inuserid: userId })
    .maybeSingle()
    .throwOnError();
};

export const createGoal = async (data: GoalCreateRequestModel) => {
  return apiClient
    .rpc('upsertGoalForYear', {
      ptargetbooks: data.targetBooks,
      puserid: data.userId,
    })
    .single()
    .throwOnError();
};
