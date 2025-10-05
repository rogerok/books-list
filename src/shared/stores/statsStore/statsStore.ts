import type { StatsResponsetModel } from '@shared/models/stats.ts';

import { getStats } from '@shared/api/stats/stats.ts';
import { Notifier } from '@shared/lib/notifier/notifier.ts';
import { RequestStore } from '@shared/lib/request-store/request-store.ts';
import { makeAutoObservable } from 'mobx';

export class StatsStore {
  getStatsRequest = new RequestStore(getStats, {
    onError: () =>
      Notifier.error('Не удалось загрузить статистику пользователя'),
  });

  stats: StatsResponsetModel | null = null;

  constructor() {
    makeAutoObservable(
      this,
      {},
      {
        autoBind: true,
      },
    );
  }

  async fetchStats(userId: string) {
    const { response, status } = await this.getStatsRequest.execute(userId);

    if (status === 'success' && response.data) {
      this.stats = response.data;
    }
  }
}
