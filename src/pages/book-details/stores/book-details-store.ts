import { getBook } from '@shared/api/book/book.ts';
import { RequestStore } from '@shared/lib/request-store/request-store.ts';
import { makeAutoObservable } from 'mobx';

export class BookDetailsStore {
  getBookDetailsRequest = new RequestStore(getBook);

  constructor() {
    makeAutoObservable(
      this,
      {},
      {
        autoBind: true,
      },
    );
  }

  async fetchBook(userId: string, bookId: string) {
    const { response, status } = await this.getBookDetailsRequest.execute(
      userId,
      bookId,
    );
  }
}
