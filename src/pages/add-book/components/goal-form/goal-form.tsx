import type { FC } from 'react';

import './goal-form.scss';

import { cn } from '@bem-react/classname';
import { FormTitle } from '@pages/add-book/components/form-title/form-title.tsx';
import { Form } from '@shared/components/form/form.tsx';
import { TextField } from '@shared/components/text-field/text-field.tsx';
import { ColorConstant } from '@shared/constants/style-system/colors.ts';
import { MobxForm } from '@shared/lib/mobx/mobx-form/mobx-form.ts';
import { Button } from '@shared/ui/button/button.tsx';
import { Card } from '@shared/ui/card/card.tsx';
import { IconComponent } from '@shared/ui/icon-component/icon-component.tsx';
import { ProgressBar } from '@shared/ui/progress-bar/progress-bar.tsx';
import { Typography } from '@shared/ui/typography/typography.tsx';
import { capitalizeFirstLetter } from '@shared/utils/common.ts';
import { pluralizeBooks } from '@shared/utils/pluralize.ts';
import { observer } from 'mobx-react-lite';

const cnGoalForm = cn('GoalForm');

interface GoalFormProps {
  className?: string;
}

const mockForm = new MobxForm({
  defaultValues: {
    goal: 20,
  },
});

export const GoalForm: FC<GoalFormProps> = observer((props) => {
  return (
    <Card className={cnGoalForm(undefined, [props.className])} elevation={'md'}>
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
      <Form methods={mockForm}>
        <div className={cnGoalForm('GoalField')}>
          <TextField
            fullWidth
            label={'Книг прочитано в 2024 году'}
            name={'goal'}
            required
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

      <Card className={cnGoalForm('Progress')} rounded={'10'} variant={'light'}>
        <Typography
          as={'h6'}
          size={'xl'}
          variant={'accent'}
          weight={'semibold'}
        >
          12 / 20
        </Typography>
        <Typography
          as={'h6'}
          className={cnGoalForm('Rest')}
          size={'2xs'}
          variant={'secondary'}
        >
          {capitalizeFirstLetter(pluralizeBooks(12))} прочитано за год
        </Typography>
        <ProgressBar max={20} value={12} variant={'purple'} />
        <Typography as={'h6'} size={'3xs'} variant={'secondary'}>
          Осталось прочитать 8 {pluralizeBooks(20 - 12)}
        </Typography>
      </Card>
    </Card>
  );
});
