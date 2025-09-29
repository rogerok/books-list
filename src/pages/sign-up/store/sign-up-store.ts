import type { AuthStore } from '@shared/stores/auth-store/auth-store.ts';

import { zodResolver } from '@hookform/resolvers/zod';
import {
  SignUpFormSchema,
  type SignUpFormType,
} from '@pages/sign-up/model/model.ts';
import { signUp } from '@shared/api/auth/auth.ts';
import { MobxForm } from '@shared/lib/mobx/mobx-form/mobx-form.ts';
import { createStoreContext } from '@shared/lib/mobx/store-factory.tsx';
import { RequestStore } from '@shared/lib/request-store/request-store.ts';
import { useRootStore } from '@shared/stores/root-store/root-store.ts';

export class SignUpStore {
  authStore: AuthStore;

  form = new MobxForm({
    defaultValues: {
      confirmPassword: '',
      email: '',
      name: '',
      password: '',
    },
    onSubmit: (data) => this.submitForm(data),
    resolver: zodResolver(SignUpFormSchema),
  });

  signUpRequest = new RequestStore(signUp);

  constructor(authStore: AuthStore) {
    this.authStore = authStore;
  }

  async submitForm(data: SignUpFormType): Promise<void> {
    await this.signUpRequest.execute({
      email: data.email,
      password: data.password,
    });
  }
}

const { createProvider, useStore } = createStoreContext<SignUpStore>();

export const useSignUpStore = useStore;

export const SignUpStoreProvider = createProvider(() => {
  const { auth } = useRootStore();

  return new SignUpStore(auth);
});
