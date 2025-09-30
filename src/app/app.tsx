import './app.scss';
import type { FC } from 'react';

import { cn } from '@bem-react/classname';
import { AppRouter } from '@shared/lib/router/app-router.ts';
import {
  RootStoreProvider,
  useRootStore,
} from '@shared/stores/root-store/root-store.ts';
import { createRouter, RouterProvider } from '@tanstack/react-router';
import { observer } from 'mobx-react-lite';
import { ToastContainer } from 'react-toastify';

import { routeTree } from '../routeTree.gen.ts';

const router = createRouter({
  context: {
    initAuth: undefined,
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

AppRouter.init(router);

const cnApp = cn('App');

const InnerApp: FC = observer(() => {
  const { auth } = useRootStore();

  return (
    <RouterProvider
      context={{
        initAuth: auth.init,
        isAuth: !!auth.session,
      }}
      router={router}
    />
  );
});

export const App: FC = observer(() => {
  return (
    <>
      <RootStoreProvider>
        <div className={cnApp()}>
          <InnerApp />
        </div>
      </RootStoreProvider>
      <ToastContainer />
    </>
  );
});
