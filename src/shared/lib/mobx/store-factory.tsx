import {
  createContext,
  type FC,
  type ReactNode,
  useContext,
  useRef,
} from 'react';

export function createStoreContext<StoreType>(): {
  createProvider: (makeStore: () => StoreType) => FC<{
    children: ReactNode;
  }>;
  useStore: () => StoreType;
} {
  const Context = createContext<StoreType | null>(null);

  const useStore = (): StoreType => {
    const value = useContext(Context);

    if (!value) {
      throw new Error('useStore must be used within its Provider');
    }

    return value;
  };

  const createProvider = (
    makeStore: () => StoreType,
  ): FC<{ children: ReactNode }> => {
    return ({ children }) => {
      const storeRef = useRef<StoreType | null>(null);

      if (!storeRef.current) {
        storeRef.current = makeStore();
      }

      return (
        <Context.Provider value={storeRef.current}>{children}</Context.Provider>
      );
    };
  };

  return {
    createProvider,
    useStore,
  };
}
