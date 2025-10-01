export const routes = {
  addBook: () => '/add-book' as const,
  home: () => '/home' as const,
  library: () => '/library' as const,
  main: () => '/' as const,
  signIn: () => '/sign-in' as const,
  signUp: () => '/sign-up' as const,
} as const;
