import type { AuthStore } from '@shared/stores/auth-store/auth-store.ts';

import { ErrorComponent } from '@shared/ui/error-component/error-component.tsx';
import { NotFoundComponent } from '@shared/ui/not-found-component/not-found-component.tsx';
import { createRootRouteWithContext, Outlet } from '@tanstack/react-router';

interface RouterContext {
  authStore?: AuthStore;
}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: () => <Outlet />,
  errorComponent: ({ reset }) => <ErrorComponent reset={reset} />,
  notFoundComponent: () => <NotFoundComponent />,
});
