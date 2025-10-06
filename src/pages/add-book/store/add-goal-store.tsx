import type { GoalStore } from '@shared/stores/goal-store/goal-store.ts';
import type { UserStore } from '@shared/stores/user-store/user-store.ts';

import { zodResolver } from '@hookform/resolvers/zod';
import {
  GoalCreateFormSchema,
  type GoalCreateFormType,
} from '@pages/add-book/models/goal.ts';
import { createGoal } from '@shared/api/goal/goal.ts';
import { MobxForm } from '@shared/lib/mobx/mobx-form/mobx-form.ts';
import { Notifier } from '@shared/lib/notifier/notifier.ts';
import { RequestStore } from '@shared/lib/request-store/request-store.ts';
import { makeAutoObservable, reaction } from 'mobx';

export class AddGoalStore {
  createGoalRequest = new RequestStore(createGoal, {
    onError: () => Notifier.success('Ошибка обновления цели'),
    onSuccess: () => Notifier.success('Цель успешно обновлена'),
  });

  form = new MobxForm({
    defaultValues: {
      targetBooks: 1,
    },
    onSubmit: (data) => this.submitForm(data),
    resolver: zodResolver(GoalCreateFormSchema),
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

    reaction(
      () => this.goal.data?.targetBooks,
      (targetBooks) => {
        this.form.setValue('targetBooks', targetBooks ?? 1);
      },
    );
  }

  async submitForm(formData: GoalCreateFormType) {
    if (!this.user.id) {
      return;
    }

    const { status } = await this.createGoalRequest.execute({
      targetBooks: formData.targetBooks,
      userId: this.user.id,
    });

    if (status === 'success') {
      await this.goal.fetchGoal();
    }
  }
}
