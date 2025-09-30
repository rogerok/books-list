import './app.scss';
import { cn } from '@bem-react/classname';
import { AppRouter } from '@shared/lib/router/app-router.ts';
import {
  RootStoreProvider,
  useRootStore,
} from '@shared/stores/root-store/root-store.ts';
import { createRouter, RouterProvider } from '@tanstack/react-router';
import { observer } from 'mobx-react-lite';
import { type FC, useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';

import { routeTree } from '../routeTree.gen.ts';

const router = createRouter({
  context: {
    initAuth: undefined,
    isAuth: false,
  },
  defaultPendingComponent: () => <div>loading...</div>,
  routeTree,
  scrollRestoration: true,
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
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const initialize = async () => {
      await auth.init();
      setIsInitialized(true);
    };

    initialize();

    return () => {
      auth.unsubscribe();
    };
  }, [auth]);

  // Wait for initialization to complete before rendering router
  if (!isInitialized || auth.sessionRequest.isLoading) {
    return <div>loading</div>;
  }

  return (
    <div className={cnApp()}>
      <RouterProvider
        context={{
          initAuth: auth.init,
          isAuth: auth.isAuthenthicated,
        }}
        router={router}
      />
    </div>
  );
});

export const App: FC = observer(() => {
  return (
    <RootStoreProvider>
      <InnerApp />
      <ToastContainer />
    </RootStoreProvider>
  );
});
