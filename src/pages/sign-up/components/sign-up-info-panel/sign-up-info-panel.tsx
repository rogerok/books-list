import type { FC } from 'react';

import { cn } from '@bem-react/classname';
import { ColorConstant } from '@shared/constants/style-system/colors.ts';
import { HeroImage } from '@shared/ui/hero-image/hero-image.tsx';
import { HStack } from '@shared/ui/hstack/hstack.tsx';
import { IconComponent } from '@shared/ui/icon-component/icon-component.tsx';

import './sign-up-info-panel.scss';
import { Typography } from '@shared/ui/typography/typography.tsx';
import { VStack } from '@shared/ui/vstack/vstack.tsx';

const cnSignUpInfoPanel = cn('SignUpInfoPanel');

interface SSignUpInfoPanelProps {
  className?: string;
}

export const SignUpInfoPanel: FC<SSignUpInfoPanelProps> = (props) => {
  const { className } = props;

  return (
    <div className={cnSignUpInfoPanel(undefined, [className])}>
      <VStack as={'section'} gap={'24'}>
        <HStack align={'center'} gap={'12'}>
          <div className={cnSignUpInfoPanel('Icon')}>
            <IconComponent
              color={ColorConstant.Purple300}
              name={'bookIcon'}
              size={'md'}
            />
          </div>
          <div>
            <Typography as={'h1'} size={'2xl'} weight={'semibold'}>
              Book Tracker
            </Typography>
            <Typography size={'md'} variant={'secondary'}>
              Начните свой читательский путь
            </Typography>
          </div>
        </HStack>

        <VStack gap={'16'}>
          <Typography size={'xl'} weight={'medium'}>
            Присоединяйтесь к сообществу читателей
          </Typography>
          <Typography size={'md'} variant={'secondary'}>
            Создайте свой персональный трекер книг и начните организовывать свою
            библиотеку уже сегодня. Ставьте цели и достигайте их!
          </Typography>
          <ul className={cnSignUpInfoPanel('FeaturesList')}>
            <li className={cnSignUpInfoPanel('FeatureListItem')}>
              Отслеживание прогресса чтения
            </li>
            <li className={cnSignUpInfoPanel('FeatureListItem')}>
              Организация личной библиотеки
            </li>
            <li className={cnSignUpInfoPanel('FeatureListItem')}>
              Постановка и достижение целей
            </li>
          </ul>
        </VStack>
        <HeroImage className={cnSignUpInfoPanel('HeroImage')} />
      </VStack>
    </div>
  );
};
