import { cn } from '@bem-react/classname';

import './sign-in-page.scss';
import { Form } from '@shared/components/form/form';
import { TextField } from '@shared/components/text-field/text-field.tsx';
import { ColorConstant } from '@shared/constants/style-system/colors';
import { MobxForm } from '@shared/lib/mobx/mobx-form/mobx-form';
import { HStack } from '@shared/ui/hstack/hstack';
import { IconComponent } from '@shared/ui/icon-component/icon-component';
import { Typography } from '@shared/ui/typography/typography';
import { VStack } from '@shared/ui/vstack/vstack';
import { observer } from 'mobx-react-lite';
import { type FC, useState } from 'react';

const cnSignInPage = cn('SignInPage');

export const SignInPage: FC = observer(() => {
  const [form] = useState(
    () =>
      new MobxForm({
        defaultValues: {
          first: '123',
        },
      }),
  );

  return (
    <VStack
      align={'center'}
      as={'main'}
      className={cnSignInPage()}
      flexJustify={'center'}
      fullHeight
      fullWidth
    >
      <HStack as={'section'} gap={'32'}>
        <VStack gap={'24'}>
          <HStack align={'center'} gap={'12'}>
            <div className={cnSignInPage('Icon')}>
              <IconComponent
                color={ColorConstant.Green600}
                name={'bookIcon'}
                size={'md'}
              />
            </div>
            <div>
              <Typography as={'h1'} size={'2xl'} weight={'semibold'}>
                Book Tracker
              </Typography>
              <Typography size={'md'} variant={'secondary'}>
                Ваш персональный трекер чтения
              </Typography>
            </div>
          </HStack>

          <VStack gap={'16'}>
            <Typography size={'xl'} weight={'medium'}>
              Отслеживайте свои книги
            </Typography>
            <Typography size={'md'} variant={'secondary'}>
              Организуйте свою библиотеку, ставьте цели чтения и следите за
              прогрессом. Создайте идеальную систему для управления вашими
              книгами.
            </Typography>
          </VStack>
        </VStack>
      </HStack>
      <Form methods={form}>
        <TextField name={'first'} />
      </Form>
    </VStack>
  );
});
