import type { AuthStore } from '@shared/stores/auth-store/auth-store.ts';

import { zodResolver } from '@hookform/resolvers/zod';
import { MobxForm } from '@shared/lib/mobx/mobx-form/mobx-form.ts';
import {
  type SignInRequestModel,
  SignInRequestSchema,
} from '@shared/models/auth.ts';
import { makeAutoObservable } from 'mobx';

export class SignInStore {
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

  get isFormSubmitting() {
    return this.form.isSubmitting;
  }
}
