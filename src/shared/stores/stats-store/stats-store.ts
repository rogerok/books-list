import type { StatsResponseModel } from '@shared/models/stats.ts';
import type { UserStore } from '@shared/stores/user-store/user-store.ts';

import { getStats } from '@shared/api/stats/stats.ts';
import { Notifier } from '@shared/lib/notifier/notifier.ts';
import { RequestStore } from '@shared/lib/request-store/request-store.ts';
import { makeAutoObservable, runInAction } from 'mobx';

export class StatsStore {
  data: StatsResponseModel | null = null;

  private getStatsRequest = new RequestStore(getStats, {
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
    if (!this.user.id) {
      return;
    }
    const { response, status } = await this.getStatsRequest.execute({
      searchTerm: '',
      userId: this.user.id,
    });

    if (status === 'success') {
      runInAction(() => {
        this.data = response.data;
      });
    }
  }

  async initialFetch() {
    if (!this.isLoading && !this.data) {
      await this.fetchStats();
    }
  }

  get isLoading() {
    return this.getStatsRequest.isLoading;
  }

  get total() {
    return this.data
      ? Object.values(this.data).reduce((acc, item) => acc + item, 0)
      : 0;
  }
}
