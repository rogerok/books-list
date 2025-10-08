import type { AuthStore } from '@shared/stores/auth-store/auth-store.ts';

import { zodResolver } from '@hookform/resolvers/zod';
import {
  SignUpFormSchema,
  type SignUpFormType,
} from '@pages/sign-up/models/model.ts';
import { signUpRequest } from '@shared/api/auth/auth.ts';
import { userCreate } from '@shared/api/user/user.ts';
import { MobxForm } from '@shared/lib/mobx/mobx-form/mobx-form.ts';
import { Notifier } from '@shared/lib/notifier/notifier.ts';
import { RequestStore } from '@shared/lib/request-store/request-store.ts';
import { makeAutoObservable } from 'mobx';

export class SignUpStore {
  form = new MobxForm({
    defaultValues: {
      confirmPassword: '',
      email: '',
      name: '',
      password: '',
    },
    onSubmit: (data) => this.processSignUp(data),
    resolver: zodResolver(SignUpFormSchema),
  });

  private signUpRequest = new RequestStore(signUpRequest);

  private userCreateRequest = new RequestStore(userCreate, {
    onError: (errorMessage) =>
      Notifier.error(errorMessage || 'Ошибка регистрации'),
    onSuccess: () =>
      Notifier.success(
        'Регистрация прошла успешно. Перенаправляем на главную страницу.',
      ),
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

  private async processSignUp(credentials: SignUpFormType): Promise<void> {
    const { email, name, password } = credentials;

    const { response, status } = await this.signUpRequest.execute({
      email: email,
      password: password,
    });

    if (status === 'success' && response?.data.user) {
      const createUserResp = await this.userCreateRequest.execute({
        email: email,
        id: response.data.user.id ?? '',
        name: name,
      });

      if (createUserResp.status === 'success') {
        await this.authStore.signIn({
          email: email,
          password: password,
        });
      }
    } else {
      Notifier.error(response?.error?.message ?? 'Ошибка регистрации');
    }
  }
}
