import type { BooksStore } from '@shared/stores/book-store/books-store.ts';
import type { GoalStore } from '@shared/stores/goal-store/goal-store.ts';
import type { StatsStore } from '@shared/stores/stats-store/stats-store.ts';
import type { UserStore } from '@shared/stores/user-store/user-store.ts';

import { zodResolver } from '@hookform/resolvers/zod';
import {
  deleteBook,
  getBook,
  setBookStatus,
  updateBookNotes,
  updateBookProgress,
  updateBookRating,
} from '@shared/api/book/book.ts';
import { routes } from '@shared/config/router/routes.ts';
import { MobxForm } from '@shared/lib/mobx/mobx-form/mobx-form.ts';
import { createStoreContext } from '@shared/lib/mobx/store-factory.tsx';
import { Notifier } from '@shared/lib/notifier/notifier.ts';
import { RequestStore } from '@shared/lib/request-store/request-store.ts';
import {
  AppRouter,
  type RouterController,
} from '@shared/lib/router/app-router.ts';
import { BooleanToggleStore } from '@shared/lib/toggle-boolean-store/booleanToggleStore.ts';
import {
  type BookNotesUpdateRequestModel,
  BookNotesUpdateRequestSchema,
  type BookProgressUpdateModel,
  BookProgressUpdateRequestSchema,
  type BookResponseModel,
  BookStatusEnumSchema,
} from '@shared/models/book.ts';
import { useRootStore } from '@shared/stores/root-store/root-store.ts';
import { makeAutoObservable } from 'mobx';

interface BookDetailsStoreParams {
  books: BooksStore;
  goal: GoalStore;
  router: RouterController;
  stats: StatsStore;
  user: UserStore;
}

export class BookDetailsStore {
  bookNotesEditable = new BooleanToggleStore(false);
  bookProgressEditable = new BooleanToggleStore(false);

  data: BookResponseModel | null = null;

  private deleteBookRequest = new RequestStore(deleteBook, {
    onError: () => Notifier.error('Не удалось удалить книгу'),
    onSuccess: () => Notifier.success('Книга удалена'),
  });

  private getBookDetailsRequest = new RequestStore(getBook);

  private markAsReadRequest = new RequestStore(setBookStatus, {
    onError: () =>
      Notifier.error(
        'Не удалось отметить книгу как прочитанную. Попробуйте ещё раз.',
      ),
    onSuccess: () => Notifier.success('Книга прочитана! Так держать!'),
  });

  notesForm = new MobxForm({
    defaultValues: {
      bookId: '',
      notes: '',
    },
    onSubmit: (data) => this.submitNotesForm(data),
    resolver: zodResolver(BookNotesUpdateRequestSchema),
  });

  progressForm = new MobxForm({
    defaultValues: {
      bookId: '',
      progress: 0,
    },
    onSubmit: (data) => this.submitProgressForm(data),
    resolver: zodResolver(BookProgressUpdateRequestSchema),
  });

  private updateNotesRequest = new RequestStore(updateBookNotes, {
    onError: () => Notifier.error('Не удалось обновить заметку.'),
    onSuccess: () => Notifier.success('Заметка обновлена'),
  });

  private updateProgressRequest = new RequestStore(updateBookProgress);

  private updateRatingRequest = new RequestStore(updateBookRating, {
    onError: () =>
      Notifier.error('Ошибка обновления рейтинга. Попробуйте ещё раз.'),
    onSuccess: () => Notifier.success('Рейтинг успешно обновлён'),
  });

  constructor(private deps: BookDetailsStoreParams) {
    makeAutoObservable(
      this,
      {},
      {
        autoBind: true,
      },
    );
  }

  clear() {
    this.data = null;
    this.bookNotesEditable.reset();
    this.bookNotesEditable.reset();
  }

  async deleteBook() {
    if (!this.deps.user.id || !this.data?.bookId) {
      return;
    }
    const { status } = await this.deleteBookRequest.execute({
      bookId: this.data.bookId,
      userId: this.data.userId,
    });

    if (status === 'success') {
      this.deps.router.navigate({
        replace: true,
        to: routes.books(),
      });

      void this.deps.stats.fetchStats();
      void this.deps.goal.fetchGoal();
      void this.deps.books.fetchReadingBooks();
    }
  }

  async fetchBook(bookId: string) {
    if (!this.deps.user.id) {
      return;
    }

    const { response, status } = await this.getBookDetailsRequest.execute(
      this.deps.user.id,
      bookId,
    );

    if (status === 'success' && response.data) {
      this.data = response.data;

      this.progressForm.setValue('progress', response.data.progress);
      this.progressForm.setValue('bookId', response.data.bookId);

      this.notesForm.setValue('notes', response.data.notes ?? '');
      this.notesForm.setValue('bookId', response.data.bookId);
    }
  }

  async markAsRead() {
    if (!this.data?.bookId) {
      return;
    }

    const { response, status } = await this.markAsReadRequest.execute({
      bookId: this.data.bookId,
      status: BookStatusEnumSchema.enum.read,
    });

    if (status === 'success' && response.data) {
      this.data.status = response.data.status;
      this.data.progress = response.data.progress;
      this.progressForm.setValue('progress', response.data.progress);

      void this.deps.stats.fetchStats();
      void this.deps.books.fetchReadingBooks();
      void this.deps.goal.fetchGoal();
    }
  }

  async submitNotesForm(formData: BookNotesUpdateRequestModel) {
    if (!this.data) {
      return;
    }

    const { response, status } =
      await this.updateNotesRequest.execute(formData);

    if (status === 'success' && response.data) {
      this.data.notes = response.data.notes;
      this.notesForm.setValue('notes', this.data.notes ?? '');
      this.bookNotesEditable.setFalse();
    }
  }

  async submitProgressForm(formData: BookProgressUpdateModel) {
    if (!this.data) {
      return;
    }
    const { response, status } =
      await this.updateProgressRequest.execute(formData);

    if (status === 'success' && response.data) {
      this.data.progress = response.data.progress;
      this.data.status = response.data.status;
      this.bookProgressEditable.setFalse();

      if (response.data.status !== BookStatusEnumSchema.enum.reading) {
        void this.deps.goal.fetchGoal();
      }

      void this.deps.stats.fetchStats();
      void this.deps.books.fetchReadingBooks();
    }
  }

  async updateRating(rating: number) {
    if (!this.data?.bookId) {
      return;
    }

    const { response, status } = await this.updateRatingRequest.execute(
      this.data.bookId,
      rating,
    );

    if (status === 'success' && response.data) {
      this.data.rating = response.data.rating;
    }
  }

  get isBookRead() {
    return this.data?.status === BookStatusEnumSchema.enum.read;
  }

  get isDeleting() {
    return this.deleteBookRequest.isLoading;
  }

  get isLoading() {
    return this.getBookDetailsRequest.isLoading;
  }

  get isReadingRequestLoad() {
    return this.markAsReadRequest.isLoading;
  }
}

const { createProvider, useStore } = createStoreContext<BookDetailsStore>();

export const useBookDetailsStore = useStore;

export const BookDetailsStoreProvider = createProvider(() => {
  const { books, goal, stats, user } = useRootStore();

  return new BookDetailsStore({
    books: books,
    goal: goal,
    router: AppRouter,
    stats: stats,
    user: user,
  });
});
