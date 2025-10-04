import type { UserStore } from '@shared/stores/user-store/user-store.ts';

import { zodResolver } from '@hookform/resolvers/zod';
import { createBook, createUserBook } from '@shared/api/book/book.ts';
import { routes } from '@shared/config/router/routes.ts';
import { MobxForm } from '@shared/lib/mobx/mobx-form/mobx-form.ts';
import { createStoreContext } from '@shared/lib/mobx/store-factory.tsx';
import { RequestStore } from '@shared/lib/request-store/request-store.ts';
import {
  AppRouter,
  type RouterController,
} from '@shared/lib/router/app-router.ts';
import {
  type BookCreateRequestModel,
  BookCreateRequestSchema,
} from '@shared/models/book.ts';
import { useRootStore } from '@shared/stores/root-store/root-store.ts';
import { makeAutoObservable } from 'mobx';

class AddBookStore {
  bookCreateRequest = new RequestStore(createBook);
  form = new MobxForm<BookCreateRequestModel>({
    defaultValues: {
      author: '',
      coverUrl: '',
      genre: undefined,
      title: '',
    },
    onSubmit: (data) => this.submitForm(data, this.user.data?.id),
    resolver: zodResolver(BookCreateRequestSchema),
  });

  userBookCreateRequest = new RequestStore(createUserBook);

  constructor(
    private user: UserStore,
    private router: RouterController,
  ) {
    makeAutoObservable(this);
  }

  async submitForm(
    formData: BookCreateRequestModel,
    userId?: string,
  ): Promise<void> {
    const bookResp = await this.bookCreateRequest.execute(formData);

    if (bookResp.status === 'success' && bookResp.response.data && userId) {
      const userResp = await this.userBookCreateRequest.execute({
        bookId: bookResp.response.data.id,
        userId: userId,
      });

      if (userResp.status === 'success') {
        this.router.navigate({
          params: {
            bookId: bookResp.response.data.id,
          },
          to: routes.bookDetails(),
        });
      }
    }
  }
}

const { createProvider, useStore } = createStoreContext<AddBookStore>();

export const useAddBookStore = useStore;

export const AddBookStoreProvider = createProvider(() => {
  const { user } = useRootStore();

  return new AddBookStore(user, AppRouter);
});
