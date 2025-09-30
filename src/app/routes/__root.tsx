import { createRootRouteWithContext, Outlet } from '@tanstack/react-router';

interface RouterContext {
  isAuth: boolean;
  initAuth?: () => Promise<void>;
}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: () => <Outlet />,
  // // errorComponent: ({ reset }) => <ErrorComponent reset={reset} />,
  // // notFoundComponent: () => <NotFoundPage />,
});
