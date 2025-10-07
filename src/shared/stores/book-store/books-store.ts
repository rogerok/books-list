import type { UserStore } from '@shared/stores/user-store/user-store.ts';

import { getBooks } from '@shared/api/book/book.ts';
import { RequestStore } from '@shared/lib/request-store/request-store.ts';
import {
  type BookResponseModel,
  BookStatusFilterEnumSchema,
} from '@shared/models/book.ts';
import { makeAutoObservable, runInAction } from 'mobx';

export class BooksStore {
  data: BookResponseModel[] = [];
  private getBooksRequest = new RequestStore(getBooks);

  constructor(private user: UserStore) {
    makeAutoObservable(
      this,
      {},
      {
        autoBind: true,
      },
    );
  }

  async fetchReadingBooks() {
    if (!this.user.id) {
      return;
    }

    const { response, status } = await this.getBooksRequest.execute({
      searchTerm: '',
      status: BookStatusFilterEnumSchema.enum.reading,
      userId: this.user.id,
    });

    if (status === 'success') {
      runInAction(() => {
        this.data = response.data;
      });
    }
  }

  async initialLoad() {
    if (!this.isLoading) {
      await this.fetchReadingBooks();
    }
  }

  get isLoading() {
    return this.getBooksRequest.isLoading;
  }
}
