import type { UserResponseModel } from '@shared/models/user.ts';

import { getUser } from '@shared/api/user/user.ts';
import { RequestStore } from '@shared/lib/request-store/request-store.ts';
import { makeAutoObservable } from 'mobx';

export class UserStore {
  data: UserResponseModel | null = null;

  getUserRequest = new RequestStore(getUser);

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

  get id() {
    return this.data?.id ?? null;
  }

  get isLoading(): boolean {
    return this.getUserRequest.isLoading;
  }
}
