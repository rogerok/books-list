import { createStoreContext } from '@shared/lib/mobx/store-factory.tsx';
import { makeAutoObservable } from 'mobx';

export class BooksPageStore {
  constructor() {
    makeAutoObservable(this);
  }
}

const { createProvider, useStore } = createStoreContext<BooksPageStore>();

export const useBooksPageStore = useStore;

export const BooksPageStoreProvider = createProvider(
  () => new BooksPageStore(),
);
