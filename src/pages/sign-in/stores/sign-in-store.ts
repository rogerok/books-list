import type { AuthStore } from '@shared/stores/auth-store/auth-store.ts';

import { zodResolver } from '@hookform/resolvers/zod';
import { MobxForm } from '@shared/lib/mobx/mobx-form/mobx-form.ts';
import { createStoreContext } from '@shared/lib/mobx/store-factory.tsx';
import {
  type SignInRequestModel,
  SignInRequestSchema,
} from '@shared/models/auth.ts';
import { useRootStore } from '@shared/stores/root-store/root-store.ts';
import { makeAutoObservable } from 'mobx';

class SignInStore {
  form = new MobxForm({
    defaultValues: {
      email: '',
      password: '',
    },
    onSubmit: (data) => this.signIn(data),
    resolver: zodResolver(SignInRequestSchema),
  });

  constructor(private authStore: AuthStore) {
    makeAutoObservable(
      this,
      {},
      {
        autoBind: true,
      },
    );
  }

  async signIn(data: SignInRequestModel): Promise<void> {
    await this.authStore.signIn(data);
  }
}

const { createProvider, useStore } = createStoreContext<SignInStore>();

export const useSignInStore = useStore;

export const SignInStoreProvider = createProvider(() => {
  const { auth } = useRootStore();

  return new SignInStore(auth);
});
