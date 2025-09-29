import { createStoreContext } from '@shared/lib/mobx/store-factory.tsx';
import { AuthStore } from '@shared/stores/auth-store/auth-store.ts';
import { ScreenStore } from '@shared/stores/screen-store.ts';
import { makeAutoObservable } from 'mobx';

class RootStore {
  auth = new AuthStore();
  screen = new ScreenStore();

  constructor() {
    makeAutoObservable(this);
  }
}

const { createProvider, useStore } = createStoreContext<RootStore>();

export const useRootStore = useStore;

export const RootStoreProvider = createProvider(() => new RootStore());
