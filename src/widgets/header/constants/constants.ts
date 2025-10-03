import { routes, type RoutesValues } from '@shared/config/router/routes.ts';

export const titlesMap: Partial<Record<RoutesValues, string>> = {
  [routes.addBook()]: 'Добавить книгу',
  [routes.bookDetails()]: 'Детали книги',
  [routes.books()]: 'Моя библиотека',
  [routes.home()]: 'Главная',
} as const;
