import type { FC } from 'react';

import './sign-in-page.scss';
import { cn } from '@bem-react/classname';
import { ColorConstant } from '@shared/constants/style-system/colors.ts';
import { HStack } from '@shared/ui/hstack/hstack.tsx';
import { IconComponent } from '@shared/ui/icon-component/icon-component.tsx';
import { Typography } from '@shared/ui/typography/typography.tsx';
import { VStack } from '@shared/ui/vstack/vstack.tsx';

const cnSignInPage = cn('SignInPage');

export const SignInPage: FC = () => {
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
    </VStack>
  );
};
