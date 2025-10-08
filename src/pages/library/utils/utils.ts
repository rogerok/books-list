import {
  BookStatusFilterEnumSchema,
  type BookStatusFilterModel,
} from '@shared/models/book.ts';

export const createBookStatusTabsOptions = (
  counters: Record<BookStatusFilterModel, number>,
) => {
  return [
    {
      counter: counters.all,
      id: BookStatusFilterEnumSchema.enum.all,
      label: 'Все',
    },
    {
      counter: counters.read,
      id: BookStatusFilterEnumSchema.enum.read,
      label: 'Прочитано',
    },
    {
      counter: counters.reading,
      id: BookStatusFilterEnumSchema.enum.reading,
      label: 'Читаю',
    },

    {
      counter: counters.toRead,
      id: BookStatusFilterEnumSchema.enum.toRead,
      label: 'К чтению',
    },
  ];
};
