import './app.scss';
import type { FC } from 'react';

import { cn } from '@bem-react/classname';
import { createRouter, RouterProvider } from '@tanstack/react-router';

import { routeTree } from '../routeTree.gen.ts';

const router = createRouter({
  context: {
    authController: undefined,
    isAuth: false,
  },
  // defaultPendingComponent: () => <Loader fullPage />,
  routeTree,
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

const cnApp = cn('App');

export const App: FC = () => {
  return (
    <div className={cnApp()}>
      <RouterProvider
        // context={{
        //   authController: authController,
        //   isAuth: userService.isAuth,
        // }}
        router={router}
      />
    </div>
  );
};
