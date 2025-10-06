import type { StatsResponsetModel } from '@shared/models/stats.ts';
import type { UserStore } from '@shared/stores/user-store/user-store.ts';

import { getStats } from '@shared/api/stats/stats.ts';
import { Notifier } from '@shared/lib/notifier/notifier.ts';
import { RequestStore } from '@shared/lib/request-store/request-store.ts';
import { makeAutoObservable } from 'mobx';

export class StatsStore {
  data: StatsResponsetModel | null = null;

  getStatsRequest = new RequestStore(getStats, {
    onError: () =>
      Notifier.error('Не удалось загрузить статистику пользователя'),
  });

  constructor(private user: UserStore) {
    makeAutoObservable(
      this,
      {},
      {
        autoBind: true,
      },
    );
  }

  async fetchStats() {
    if (this.user.id) {
      const { response, status } = await this.getStatsRequest.execute(
        this.user.id,
      );

      if (status === 'success' && response.data) {
        this.data = response.data;
      }
    }
  }

  get isLoading() {
    return this.getStatsRequest.isLoading;
  }

  get total() {
    if (!this.data) {
      return;
    }

    return Object.values(this.data).reduce((acc, item) => acc + item, 0);
  }
}
