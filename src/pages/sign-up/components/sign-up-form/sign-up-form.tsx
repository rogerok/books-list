import { cn } from '@bem-react/classname';
import { SignUpStore } from '@pages/sign-up/stores/sign-up-store.ts';
import { Form } from '@shared/components/form/form.tsx';
import { TextField } from '@shared/components/text-field/text-field.tsx';

import './sign-up-form.scss';
import { routes } from '@shared/config/router/routes.ts';
import { ColorConstant } from '@shared/constants/style-system/colors.ts';
import { useRootStore } from '@shared/stores/root-store/root-store.ts';
import { AppLink } from '@shared/ui/app-link/app-link.tsx';
import { Button } from '@shared/ui/button/button.tsx';
import { Card } from '@shared/ui/card/card.tsx';
import { Divider } from '@shared/ui/divider/divider.tsx';
import { HStack } from '@shared/ui/hstack/hstack.tsx';
import { IconComponent } from '@shared/ui/icon-component/icon-component.tsx';
import { Loader } from '@shared/ui/loader/loader.tsx';
import { Typography } from '@shared/ui/typography/typography.tsx';
import { VStack } from '@shared/ui/vstack/vstack.tsx';
import { observer } from 'mobx-react-lite';
import { type FC, useState } from 'react';

const cnSignUpForm = cn('SignUpForm');

interface SignUpFormProps {
  className?: string;
}

export const SignUpForm: FC<SignUpFormProps> = observer((props) => {
  const { className } = props;
  const { auth } = useRootStore();

  const [store] = useState(() => new SignUpStore(auth));

  const { form } = store;

  return (
    <Card className={cnSignUpForm(undefined, [className])} elevation={'sm'}>
      {form.isSubmitting && <Loader overlay />}

      <VStack gap={'8'}>
        <Typography as={'h2'} size={'xl'} weight={'semibold'}>
          Создать аккаунт
        </Typography>
        <Typography size={'sm'} variant={'secondary'}>
          Заполните данные для создания вашего аккаунта
        </Typography>
      </VStack>

      <Form className={cnSignUpForm('Form')} methods={form}>
        <TextField
          fullWidth
          label={'Имя'}
          name={'name'}
          placeholder={'Ваше имя'}
        />
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
          placeholder={'Минимум 6 символов'}
          type={'password'}
        />
        <TextField
          fullWidth
          label={'Подтвердите пароль'}
          name={'confirmPassword'}
          placeholder={'Повторите пароль'}
          type={'password'}
        />
        <Button
          addonLeft={
            <IconComponent
              color={ColorConstant.White}
              name={'createAccountIcon'}
              size={'xxs'}
            />
          }
          className={cnSignUpForm('FormButton')}
          fullWidth
          type={'submit'}
          variant={'secondary'}
        >
          <Typography variant={'white'} weight={'medium'}>
            Создать аккаунт
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
          Уже есть аккаунт?
        </Typography>
        <AppLink
          className={cnSignUpForm('Link')}
          to={routes.signIn()}
          variant={'outline'}
        >
          <IconComponent
            color={ColorConstant.Neutral800}
            name={'arrowLeftIcon'}
            size={'xxs'}
          />
          <Typography variant={'lightDark'}>Войти в аккаунт</Typography>
        </AppLink>
        <Typography as={'p'} size={'3xs'} variant={'secondary'}>
          Создавая аккаунт, вы соглашаетесь с нашими{' '}
          <AppLink to={'/'}>
            <Typography size={'sm'} variant={'accent'} weight={'medium'}>
              Условиями использования{' '}
            </Typography>
          </AppLink>
          и
          <AppLink to={'/'}>
            <Typography size={'sm'} variant={'accent'} weight={'medium'}>
              {' '}
              Политикой конфиденциальности
            </Typography>
          </AppLink>
        </Typography>
      </VStack>
    </Card>
  );
});
