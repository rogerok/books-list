import { routes } from '@shared/config/router/routes.ts';
import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/_protected')({
  beforeLoad: async ({ context }) => {
    if (!context.isAuth) {
      throw redirect({
        to: routes.signIn(),
      });
    }
  },
});
