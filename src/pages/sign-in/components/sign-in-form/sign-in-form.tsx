import { cn } from '@bem-react/classname';
import { useSignInStore } from '@pages/sign-in/stores/sign-in-store.ts';
import { Form } from '@shared/components/form/form.tsx';
import { TextField } from '@shared/components/text-field/text-field.tsx';
import { routes } from '@shared/config/router/routes.ts';

import './sign-in-form.scss';
import { ColorConstant } from '@shared/constants/style-system/colors.ts';
import { AppLink } from '@shared/ui/app-link/app-link.tsx';
import { Button } from '@shared/ui/button/button.tsx';
import { Card } from '@shared/ui/card/card.tsx';
import { Divider } from '@shared/ui/divider/divider.tsx';
import { HStack } from '@shared/ui/hstack/hstack.tsx';
import { IconComponent } from '@shared/ui/icon-component/icon-component.tsx';
import { Loader } from '@shared/ui/Loader/loader.tsx';
import { Typography } from '@shared/ui/typography/typography.tsx';
import { VStack } from '@shared/ui/vstack/vstack.tsx';
import { observer } from 'mobx-react-lite';
import { type FC } from 'react';

const cnSignInForm = cn('SignInForm');

interface SignInFormProps {
  className?: string;
}

export const SignInForm: FC<SignInFormProps> = observer((props) => {
  const { className } = props;
  const { form } = useSignInStore();

  return (
    <Card className={cnSignInForm(undefined, [className])} elevation={'sm'}>
      {form.isSubmitting && <Loader overlay />}

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
        {/*TODO add show/hide button*/}
        <TextField
          fullWidth
          label={'Пароль'}
          name={'password'}
          placeholder={'Введите пароль'}
        />
        <Button
          addonLeft={
            <IconComponent
              color={ColorConstant.White}
              name={'signInIcon'}
              size={'xxs'}
            />
          }
          className={cnSignInForm('FormButton')}
          disabled={form.isSubmitting}
          fullWidth
          type={'submit'}
          variant={'primary'}
        >
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
            или
          </Typography>
          <Divider flexItem />
        </HStack>

        <Typography align={'center'} size={'2xs'} variant={'secondary'}>
          Нет аккаунта?
        </Typography>
        <AppLink
          className={cnSignInForm('Link')}
          disabled={form.isSubmitting}
          to={routes.signUp()}
          variant={'outline'}
        >
          <Typography variant={'lightDark'}>Создать аккаунт</Typography>
          <IconComponent
            color={ColorConstant.Neutral800}
            name={'arrowRightIcon'}
            size={'xxs'}
          />
        </AppLink>
      </VStack>
    </Card>
  );
});
