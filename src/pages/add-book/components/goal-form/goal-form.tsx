import { cn } from '@bem-react/classname';

import './goal-form.scss';

import { FormTitle } from '@pages/add-book/components/form-title/form-title.tsx';
import { AddGoalStore } from '@pages/add-book/store/add-goal-store.tsx';
import { Form } from '@shared/components/form/form.tsx';
import { TextField } from '@shared/components/text-field/text-field.tsx';
import { ColorConstant } from '@shared/constants/style-system/colors.ts';
import { useRootStore } from '@shared/stores/root-store/root-store.ts';
import { Button } from '@shared/ui/button/button.tsx';
import { Card } from '@shared/ui/card/card.tsx';
import { IconComponent } from '@shared/ui/icon-component/icon-component.tsx';
import { ProgressBar } from '@shared/ui/progress-bar/progress-bar.tsx';
import { Skeleton } from '@shared/ui/skeleton/skeleton.tsx';
import { Typography } from '@shared/ui/typography/typography.tsx';
import { capitalizeFirstLetter } from '@shared/utils/common.ts';
import { pluralize, pluralizeBooks } from '@shared/utils/pluralize.ts';
import { observer } from 'mobx-react-lite';
import { type FC, useState } from 'react';

const cnGoalForm = cn('GoalForm');

interface GoalFormProps {
  className?: string;
}

export const GoalForm: FC<GoalFormProps> = observer((props) => {
  const { goal, user } = useRootStore();

  const [goalForm] = useState(() => new AddGoalStore(user, goal));
  const { form } = goalForm;

  if (goal.isLoading) {
    return <Skeleton height={200} rounded={'16'} />;
  }

  return (
    goal.data && (
      <Card
        className={cnGoalForm(undefined, [props.className])}
        elevation={'md'}
      >
        <FormTitle
          background={'purple-100'}
          icon={
            <IconComponent
              color={ColorConstant.Purple300}
              name={'goalIcon'}
              size={'xs'}
            />
          }
          subtitle={'Установите годовую цель по количеству книг'}
          title={'Цель чтения'}
        />
        <Form methods={form}>
          <div className={cnGoalForm('GoalField')}>
            <TextField
              fullWidth
              label={`Книг к прочтению в ${goal.goalDate} году`}
              min={0}
              name={'targetBooks'}
              type={'number'}
            />

            <Button
              className={cnGoalForm('SubmitButton')}
              type={'submit'}
              variant={'outline'}
            >
              Обновить
            </Button>
          </div>
        </Form>

        <Card
          className={cnGoalForm('Progress')}
          rounded={'10'}
          variant={'light'}
        >
          <Typography
            as={'h6'}
            size={'xl'}
            variant={'accent'}
            weight={'semibold'}
          >
            {goal.data.readCount} / {goal.data.targetBooks}
          </Typography>
          <Typography
            as={'h6'}
            className={cnGoalForm('Rest')}
            size={'2xs'}
            variant={'secondary'}
          >
            {capitalizeFirstLetter(pluralizeBooks(goal.data.targetBooks))}{' '}
            {pluralize(goal.data.readCount, [
              'прочитана',
              'прочитано',
              'прочитаны',
            ])}{' '}
            за год
          </Typography>
          <ProgressBar
            max={goal.data.targetBooks}
            value={goal.data.readCount}
            variant={'purple'}
          />

          <Typography as={'h6'} size={'3xs'} variant={'secondary'}>
            {goal.isCompleted
              ? 'Цель выполнена'
              : `Осталось прочитать ${goal.restToGoal} ${pluralizeBooks(goal.restToGoal)}`}
          </Typography>
        </Card>
      </Card>
    )
  );
});
