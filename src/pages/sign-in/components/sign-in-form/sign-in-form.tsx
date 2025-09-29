import { cn } from '@bem-react/classname';
import { zodResolver } from '@hookform/resolvers/zod';
import { SignInRequestSchema } from '@pages/sign-in/model/model.ts';
import { Form } from '@shared/components/form/form.tsx';
import { TextField } from '@shared/components/text-field/text-field.tsx';
import { routes } from '@shared/config/router/routes.ts';
import { ColorConstant } from '@shared/constants/style-system/colors.ts';

import './sign-in-form.scss';
import { MobxForm } from '@shared/lib/mobx/mobx-form/mobx-form.ts';
import { AppLink } from '@shared/ui/app-link/app-link.tsx';
import { Button } from '@shared/ui/button/button.tsx';
import { Card } from '@shared/ui/card/card.tsx';
import { Divider } from '@shared/ui/divider/divider.tsx';
import { HStack } from '@shared/ui/hstack/hstack.tsx';
import { IconComponent } from '@shared/ui/icon-component/icon-component.tsx';
import { Typography } from '@shared/ui/typography/typography.tsx';
import { VStack } from '@shared/ui/vstack/vstack.tsx';
import { type FC, useState } from 'react';

const cnSignInForm = cn('SignInForm');

interface SignInFormProps {
  className?: string;
}

export const SignInForm: FC<SignInFormProps> = (props) => {
  const { className } = props;

  const [form] = useState(
    () =>
      new MobxForm({
        defaultValues: {
          email: '',
          password: '',
        },
        resolver: zodResolver(SignInRequestSchema),
      }),
  );

  return (
    <Card className={cnSignInForm(undefined, [className])}>
      <VStack gap={'8'}>
        <Typography as={'h2'} size={'xl'} weight={'semibold'}>
          Добро пожаловать!
        </Typography>
        <Typography size={'sm'} variant={'secondary'}>
          Войдите в свой аккаунт, чтобы продолжить чтение
        </Typography>
      </VStack>

      <Form className={cnSignInForm('Form')} methods={form}>
        <TextField
          fullWidth
          label={'Электронная почта'}
          name={'email'}
          placeholder={'example@email.com'}
        />
        <TextField
          fullWidth
          label={'Пароль'}
          name={'password'}
          placeholder={'Введите пароль'}
        />
        <Button
          className={cnSignInForm('FormButton')}
          fullWidth
          type={'submit'}
          variant={'primary'}
        >
          <IconComponent
            color={ColorConstant.White}
            name={'signInIcon'}
            size={'xs'}
          />
          <Typography variant={'white'} weight={'medium'}>
            Войти
          </Typography>
        </Button>
      </Form>
      <VStack gap={'8'}>
        <HStack
          align={'center'}
          flexJustify={'center'}
          gap={'8'}
          wrap={'nowrap'}
        >
          <Divider flexItem />
          <Typography size={'2xs'} variant={'secondary'}>
            Или
          </Typography>
          <Divider flexItem />
        </HStack>

        <Typography align={'center'} size={'2xs'} variant={'secondary'}>
          Нет аккаунта?
        </Typography>
        <AppLink
          className={cnSignInForm('Link')}
          to={routes.signIn()}
          variant={'outline'}
        >
          <Typography variant={'lightDark'}>Создать аккаунт</Typography>
          <IconComponent
            color={ColorConstant.Neutral800}
            name={'arrowRightIcon'}
            size={'xs'}
          />
        </AppLink>
      </VStack>
    </Card>
  );
};
