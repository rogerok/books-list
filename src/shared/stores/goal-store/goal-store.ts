import type { GoalResponseModel } from '@shared/models/goal.ts';
import type { UserStore } from '@shared/stores/user-store/user-store.ts';

import { getGoal } from '@shared/api/goal/goal.ts';
import { RequestStore } from '@shared/lib/request-store/request-store.ts';
import { makeAutoObservable } from 'mobx';

export class GoalStore {
  data: GoalResponseModel | null = null;
  getGoalRequest = new RequestStore(getGoal);

  constructor(private user: UserStore) {
    makeAutoObservable(
      this,
      {},
      {
        autoBind: true,
      },
    );
  }

  async fetchGoal() {
    if (!this.user.id) {
      return;
    }

    const { response, status } = await this.getGoalRequest.execute(
      this.user.id,
    );

    if (status === 'success') {
      this.data = response.data;
    }
  }

  async initialLoad() {
    if (!this.isLoading) {
      await this.fetchGoal();
    }
  }

  get goalYear() {
    return this.data?.targetDate
      ? new Date(this.data.targetDate).getFullYear()
      : new Date().getFullYear();
  }

  get isCompleted() {
    return this.restToGoal <= 0;
  }

  get isLoading() {
    return this.getGoalRequest.isLoading;
  }

  get percentageCompleted() {
    if (!this.data || (!this.data.readCount && !this.data.targetBooks)) {
      return 0;
    }

    if (!this.data.targetBooks && this.data.readCount) {
      return 100;
    }

    return parseFloat(
      ((this.data.readCount / this.data.targetBooks) * 100).toFixed(2),
    );
  }

  get restToGoal() {
    if (this.data) {
      return this.data.targetBooks - this.data.readCount;
    }

    return 0;
  }
}
