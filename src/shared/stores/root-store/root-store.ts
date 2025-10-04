import { createStoreContext } from '@shared/lib/mobx/store-factory.tsx';
import { AppRouter } from '@shared/lib/router/app-router.ts';
import { BooleanToggleStore } from '@shared/lib/toggle-boolean-store/booleanToggleStore.ts';
import { AuthStore } from '@shared/stores/auth-store/auth-store.ts';
import { ScreenStore } from '@shared/stores/screen-store.ts';
import { UserStore } from '@shared/stores/user-store/user-store.ts';
import { makeAutoObservable } from 'mobx';

class RootStore {
  user = new UserStore();
  auth = new AuthStore(AppRouter, this.user);
  navbar = new BooleanToggleStore(false);
  screen = new ScreenStore();

  constructor() {
    makeAutoObservable(this);
  }
}

const { createProvider, useStore } = createStoreContext<RootStore>();

export const useRootStore = useStore;

export const RootStoreProvider = createProvider(() => new RootStore());
