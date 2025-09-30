import { createRootRouteWithContext, Outlet } from '@tanstack/react-router';

interface RouterContext {
  isAuth: boolean;
  initAuth?: () => Promise<void>;
}

export const Route = createRootRouteWithContext<RouterContext>()({
  beforeLoad: async ({ context }) => {
    if (!context.isAuth) {
      await context.initAuth?.();
    }
  },
  component: () => <Outlet />,
  // errorComponent: ({ reset }) => <ErrorComponent reset={reset} />,
  // notFoundComponent: () => <NotFoundPage />,
});
