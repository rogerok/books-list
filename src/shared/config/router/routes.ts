import type { ObjectValues } from '@shared/utils/ts-utils/ts-utils.ts';

export const routes = {
  addBook: () => '/books/add' as const,
  bookDetails: () => '/books/$bookId' as const,
  books: () => '/books' as const,
  home: () => '/home' as const,
  main: () => '/' as const,
  signIn: () => '/sign-in' as const,
  signUp: () => '/sign-up' as const,
} as const;

export type RoutesValues = ReturnType<ObjectValues<typeof routes>>;
