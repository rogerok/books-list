import './app.scss';
import { cn } from '@bem-react/classname';
import { AppRouter } from '@shared/lib/router/app-router.ts';
import {
  RootStoreProvider,
  useRootStore,
} from '@shared/stores/root-store/root-store.ts';
import { createRouter, RouterProvider } from '@tanstack/react-router';
import { observer } from 'mobx-react-lite';
import { type FC, useEffect } from 'react';
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

  useEffect(() => {
    auth.init();

    return () => {
      auth.unsubscribe();
    };
  }, [auth]);

  return (
    <RouterProvider
      context={{
        initAuth: auth.init,
        isAuth: auth.isAuthenthicated,
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
