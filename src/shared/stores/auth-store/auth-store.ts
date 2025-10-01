import type { SignInRequestModel } from '@shared/models/auth.ts';
import type { Session, Subscription } from '@supabase/supabase-js';

import {
  getSessionRequest,
  signInRequest,
  signOutRequest,
} from '@shared/api/auth/auth.ts';
import { apiClient } from '@shared/api/client.ts';
import { routes } from '@shared/config/router/routes.ts';
import { Notifier } from '@shared/lib/notifier/notifier.ts';
import { RequestStore } from '@shared/lib/request-store/request-store.ts';
import { RouterController } from '@shared/lib/router/app-router.ts';
import { makeAutoObservable, runInAction } from 'mobx';

export class AuthStore {
  session: Session | null = null;
  sessionRequest = new RequestStore(getSessionRequest);
  signInRequest = new RequestStore(signInRequest);
  signOutRequest = new RequestStore(signOutRequest);

  subscription: Subscription | undefined;

  constructor(private router: RouterController) {
    makeAutoObservable(
      this,
      {},
      {
        autoBind: true,
      },
    );
  }

  async init() {
    const { response, status } = await this.sessionRequest.execute();

    if (status === 'success' && response?.data.session) {
      this.session = response.data.session;

      const subscription = apiClient.auth.onAuthStateChange(
        (_event, session) => {
          if (session) {
            runInAction(() => {
              this.session = session;
            });
          } else {
            this.router.toSignIn();
            // TODO: maybe remove

            window.location.reload();
          }
        },
      );
      this.subscription = subscription.data.subscription;
    }
  }

  async logout(): Promise<void> {
    await this.signOutRequest.execute();
    this.session = null;
    this.router.toSignIn();
    // TODO: maybe remove
    window.location.reload();
  }

  async signIn(credentials: SignInRequestModel) {
    const { response, status } = await this.signInRequest.execute(credentials);

    if (status === 'success' && response?.data.user) {
      this.router.navigate({
        to: routes.home(),
      });
    } else {
      Notifier.error('Ошибка авторизации. Попробуйте войти заново.');

      this.router.navigate({
        to: routes.signIn(),
      });
    }
  }

  unsubscribe() {
    this.subscription?.unsubscribe();
  }

  get isAuthenticated(): boolean {
    return !!this.session?.user;
  }
}
