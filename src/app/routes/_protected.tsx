import { routes } from '@shared/config/router/routes.ts';
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/_protected')({
  beforeLoad: async ({ context }) => {
    await context.authStore?.init();

    if (!context.authStore?.isAuthenticated) {
      throw redirect({
        to: routes.signIn(),
      });
    }
  },
  component: () => <Outlet />,
});
