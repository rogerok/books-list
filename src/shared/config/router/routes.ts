export const routes = {
  dashboard: () => '/dashboard' as const,
  main: () => '/' as const,
  signIn: () => '/sign-in' as const,
  signUp: () => '/sign-up' as const,
} as const;
