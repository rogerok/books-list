import type { GoalStore } from '@shared/stores/goal-store/goal-store.ts';
import type { StatsStore } from '@shared/stores/stats-store/stats-store.ts';
import type { UserStore } from '@shared/stores/user-store/user-store.ts';

import { zodResolver } from '@hookform/resolvers/zod';
import {
  type BookCreateFormModel,
  BookCreateFormSchema,
} from '@pages/add-book/models/book.ts';
import { createBook, createUserBook } from '@shared/api/book/book.ts';
import { getPublicUrl } from '@shared/api/storage/storage.ts';
import { routes } from '@shared/config/router/routes.ts';
import { BucketsNames } from '@shared/constants/storage.ts';
import { MobxForm } from '@shared/lib/mobx/mobx-form/mobx-form.ts';
import { createStoreContext } from '@shared/lib/mobx/store-factory.tsx';
import { Notifier } from '@shared/lib/notifier/notifier.ts';
import { RequestStore } from '@shared/lib/request-store/request-store.ts';
import {
  AppRouter,
  type RouterController,
} from '@shared/lib/router/app-router.ts';
import { useRootStore } from '@shared/stores/root-store/root-store.ts';
import { makeAutoObservable, reaction } from 'mobx';

export class AddBookStore {
  private bookCreateRequest = new RequestStore(createBook);
  previewCoverUrl: string = '';
  form = new MobxForm<BookCreateFormModel>({
    defaultValues: {
      author: '',
      coverUrl: '',
      genre: '',
      outerCoverUrl: this.previewCoverUrl,
      title: '',
    },
    onSubmit: (data) => this.submitForm(data),
    resolver: zodResolver(BookCreateFormSchema),
  });
  private getPublicImageUrl = new RequestStore(getPublicUrl, {
    onError: () => Notifier.error('Ошибка получения изображения'),
  });
  private userBookCreateRequest = new RequestStore(createUserBook, {
    onError: () => Notifier.error('Ошибка создания книги'),
    onSuccess: () =>
      Notifier.success('Книга создана. Перенаправляем к деталям книги.'),
  });

  constructor(
    private user: UserStore,
    private goal: GoalStore,
    private stats: StatsStore,
    private router: RouterController,
  ) {
    makeAutoObservable(
      this,
      {},
      {
        autoBind: true,
      },
    );

    reaction(
      () => this.form.values.coverUrl,
      async (cover) => {
        if (cover) {
          const { response } = await this.getPublicImageUrl.execute(
            BucketsNames.covers,
            cover,
          );

          if (response?.data.publicUrl) {
            this.setPreviewCoverUrl(response.data.publicUrl);
            this.form.setValue('outerCoverUrl', '');
          }
        } else {
          this.previewCoverUrl = '';
        }
      },
    );
  }

  resetPreviewCoverUrl() {
    this.form.setValue('coverUrl', '');
    this.form.setValue('outerCoverUrl', '');
  }

  setPreviewCoverUrl(url: string) {
    this.previewCoverUrl = url;
  }

  async submitForm(formData: BookCreateFormModel): Promise<void> {
    const bookResp = await this.bookCreateRequest.execute({
      author: formData.author,
      coverUrl: this.previewCoverUrl,
      genre: formData.genre,
      title: formData.title,
    });

    if (
      bookResp.status === 'success' &&
      bookResp.response.data &&
      this.user.data?.id
    ) {
      const userResp = await this.userBookCreateRequest.execute({
        bookId: bookResp.response.data.id,
        userId: this.user.data?.id,
      });

      if (userResp.status === 'success') {
        void this.goal.fetchGoal();
        void this.stats.fetchStats();

        this.router.navigate({
          params: {
            bookId: bookResp.response.data.id,
          },
          to: routes.bookDetails(),
        });
      }
    }
  }

  get isFormSubmitting() {
    return this.form.isSubmitting;
  }
}

const { createProvider, useStore } = createStoreContext<AddBookStore>();

export const useAddBookStore = useStore;

export const AddBookStoreProvider = createProvider(() => {
  const { goal, stats, user } = useRootStore();

  return new AddBookStore(user, goal, stats, AppRouter);
});
