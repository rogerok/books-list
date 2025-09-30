export const routes = {
  home: () => '/home' as const,
  main: () => '/' as const,
  signIn: () => '/sign-in' as const,
  signUp: () => '/sign-up' as const,
} as const;
