import type { GoalStore } from '@shared/stores/goal-store/goal-store.ts';
import type { UserStore } from '@shared/stores/user-store/user-store.ts';

import { zodResolver } from '@hookform/resolvers/zod';
import { createGoal } from '@shared/api/goal/goal.ts';
import { MobxForm } from '@shared/lib/mobx/mobx-form/mobx-form.ts';
import { Notifier } from '@shared/lib/notifier/notifier.ts';
import { RequestStore } from '@shared/lib/request-store/request-store.ts';
import {
  type GoalCreateRequestModel,
  GoalCreateRequestSchema,
} from '@shared/models/goal.ts';
import { makeAutoObservable } from 'mobx';

export class AddGoalStore {
  createGoalRequest = new RequestStore(createGoal, {
    onError: () => Notifier.success('Ошибка обновления цели'),
    onSuccess: () => Notifier.success('Цель успешно обновлена'),
  });

  form = new MobxForm({
    defaultValues: {
      targetBooks: 0,
      userId: '',
    },
    onSubmit: (data) => this.submitForm(data),
    resolver: zodResolver(GoalCreateRequestSchema),
  });

  constructor(
    private user: UserStore,
    private goal: GoalStore,
  ) {
    makeAutoObservable(
      this,
      {},
      {
        autoBind: true,
      },
    );
  }

  async prepareForm() {
    if (this.user.id) {
      this.form.setValue('userId', this.user.id);
      this.form.setValue('targetBooks', this.goal.data?.targetBooks ?? 0);
    }
  }

  async submitForm(formData: GoalCreateRequestModel) {
    const { status } = await this.createGoalRequest.execute({
      targetBooks: formData.targetBooks,
      userId: formData.userId,
    });

    if (status === 'success') {
      await this.goal.fetchGoal();
    }
  }
}
