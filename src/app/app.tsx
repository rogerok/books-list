import './app.scss';
import { cn } from '@bem-react/classname';
import { AppRouter } from '@shared/lib/router/app-router.ts';
import {
  RootStoreProvider,
  useRootStore,
} from '@shared/stores/root-store/root-store.ts';
import { Loader } from '@shared/ui/Loader/loader.tsx';
import { createRouter, RouterProvider } from '@tanstack/react-router';
import { observer } from 'mobx-react-lite';
import { type FC, Suspense, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';

import { routeTree } from '../routeTree.gen.ts';

const router = createRouter({
  context: {
    authStore: undefined,
  },
  defaultPendingComponent: () => <Loader fullPage />,
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

  useEffect(() => {
    return () => {
      auth.unsubscribe();
    };
  }, [auth]);

  return (
    <div className={cnApp()}>
      <RouterProvider
        context={{
          authStore: auth,
        }}
        router={router}
      />
    </div>
  );
});

export const App: FC = observer(() => {
  return (
    <Suspense fallback={<Loader fullPage />}>
      <RootStoreProvider>
        <InnerApp />
        <ToastContainer />
      </RootStoreProvider>
    </Suspense>
  );
});
