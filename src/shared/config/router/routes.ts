import type { ObjectValues } from '@shared/utils/ts-utils/ts-utils.ts';

export const routes = {
  addBook: () => '/books/add' as const,
  bookDetails: () => '/library/$bookId' as const,
  books: () => '/library' as const,
  home: () => '/home' as const,
  main: () => '/' as const,
  signIn: () => '/sign-in' as const,
  signUp: () => '/sign-up' as const,
} as const;

export type RoutesValues = ReturnType<ObjectValues<typeof routes>>;
