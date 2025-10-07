import type { UserStore } from '@shared/stores/user-store/user-store.ts';

import { DefaultTabsCounters } from '@pages/books/constants/constants.ts';
import { createBookStatusTabsOptions } from '@pages/books/utils/utils.ts';
import { getBooks } from '@shared/api/book/book.ts';
import { getStats } from '@shared/api/stats/stats.ts';
import { createStoreContext } from '@shared/lib/mobx/store-factory.tsx';
import { RequestStore } from '@shared/lib/request-store/request-store.ts';
import { createTabManager } from '@shared/lib/tabs-manager/tabs-manager.ts';
import {
  type BookResponseModel,
  BookStatusFilterEnumSchema,
  type BookStatusFilterModel,
} from '@shared/models/book.ts';
import { useRootStore } from '@shared/stores/root-store/root-store.ts';
import { debounce } from '@shared/utils/debounce.ts';
import { makeAutoObservable, reaction, runInAction } from 'mobx';
import { z } from 'zod';

export class BooksPageStore {
  data: BookResponseModel[] = [];
  private getBooksRequest = new RequestStore(getBooks);
  private getStatsRequest = new RequestStore(getStats);
  searchTerm = '';
  searchTermErrorMsg: string | undefined = '';
  tabManager = createTabManager({
    fallbackTab: BookStatusFilterEnumSchema.enum.all,
    onChangeActiveTab: this.fetchBooks,
    tabs: createBookStatusTabsOptions(DefaultTabsCounters),
  });

  constructor(private user: UserStore) {
    makeAutoObservable(
      this,
      {},
      {
        autoBind: true,
      },
    );

    reaction(
      () => this.searchTerm,
      debounce(() => {
        if (!this.validateSearchTerm()) {
          return;
        }

        this.fetchTabsStats();
        this.fetchBooks(this.tabManager.activeTab);
      }, 500),
    );
  }

  async fetchBooks(bookStatus: BookStatusFilterModel) {
    if (!this.user.id) {
      return;
    }

    const { response, status } = await this.getBooksRequest.execute({
      searchTerm: this.searchTerm,
      status: bookStatus,
      userId: this.user.id,
    });

    if (status === 'success') {
      runInAction(() => {
        this.data = response.data;
      });
    }
  }

  async fetchTabsStats() {
    if (!this.user.id) {
      return;
    }

    const { response, status } = await this.getStatsRequest.execute({
      searchTerm: this.searchTerm,
      userId: this.user.id,
    });

    if (status === 'success') {
      this.tabManager.setTabs(
        createBookStatusTabsOptions({
          ...response.data,
          all: Object.values(response.data).reduce((acc, val) => acc + val, 0),
        }),
      );
    }
  }

  setSearchTerm(value: string) {
    this.searchTerm = value;
  }

  private validateSearchTerm() {
    const result = z.string().min(2).max(50).trim().safeParse(this.searchTerm);

    runInAction(() => {
      this.searchTermErrorMsg = result.success
        ? undefined
        : result.error.errors[0].message;
    });

    return result.success;
  }
}

const { createProvider, useStore } = createStoreContext<BooksPageStore>();

export const useBooksPageStore = useStore;

export const BooksPageStoreProvider = createProvider(
  () => new BooksPageStore(useRootStore().user),
);
