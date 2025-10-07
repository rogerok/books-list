import type { BooksGetLastRatedResponseModel } from '@shared/models/book.ts';
import type { UserStore } from '@shared/stores/user-store/user-store.ts';

import { getLastRatedBooks } from '@shared/api/book/book.ts';
import { RequestStore } from '@shared/lib/request-store/request-store.ts';
import { makeAutoObservable, runInAction } from 'mobx';

export class LastRatedStore {
  data: BooksGetLastRatedResponseModel[] = [];
  private getLastRatedRequest = new RequestStore(getLastRatedBooks);
  private ratedBooksLimit = 2;

  constructor(private user: UserStore) {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  async fetchLastRated() {
    if (!this.user.id) {
      return;
    }
    const { response, status } = await this.getLastRatedRequest.execute({
      limit: this.ratedBooksLimit,
      userId: this.user.id,
    });

    if (status === 'success') {
      runInAction(() => {
        this.data = response.data;
      });
    }
  }

  get isLoading() {
    return this.getLastRatedRequest.isLoading;
  }
}
