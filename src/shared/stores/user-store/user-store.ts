import type { UserGetRequestModel } from '@shared/models/user.ts';

import { getUSer } from '@shared/api/user/user.ts';
import { RequestStore } from '@shared/lib/request-store/request-store.ts';
import { makeAutoObservable } from 'mobx';

export class UserStore {
  data: UserGetRequestModel | null = null;

  getUserRequest = new RequestStore(getUSer);

  constructor() {
    makeAutoObservable(this);
  }

  async fetchUser(id: string): Promise<void> {
    const { response, status } = await this.getUserRequest.execute(id);

    if (status === 'success') {
      this.data = response.data
        ? {
            createdAt: response.data.createdAt,
            email: response.data.email,
            id: response.data.id,
            name: response.data.name,
          }
        : null;
    }
  }

  get isLoading(): boolean {
    return this.getUserRequest.isLoading;
  }
}
