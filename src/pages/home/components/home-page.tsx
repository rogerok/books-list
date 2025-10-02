import { cn } from '@bem-react/classname';

import './home-page.scss';
import { LastActivity } from '@pages/home/components/last-activity/last-activity.tsx';
import { routes } from '@shared/config/router/routes.ts';
import { ColorConstant } from '@shared/constants/style-system/colors.ts';
import { AppLink } from '@shared/ui/app-link/app-link.tsx';
import { IconComponent } from '@shared/ui/icon-component/icon-component.tsx';
import { Typography } from '@shared/ui/typography/typography.tsx';
import { VStack } from '@shared/ui/vstack/vstack.tsx';
import { BookWidget } from '@widgets/book';
import { GoalWidget } from '@widgets/goal';

const cnHomePage = cn('HomePage');

export const HomePage = () => {
  return (
    <section className={cnHomePage()}>
      <header className={cnHomePage('Header')}>
        <Typography as={'h1'} size={'3xl'} weight={'semibold'}>
          Привет! 📚
        </Typography>
        <Typography as={'p'} size={'md'} variant={'secondary'}>
          Сохрани свои любимые книги
        </Typography>
      </header>

      <section className={cnHomePage('Goal')}>
        <GoalWidget variant={'large'} />
      </section>

      <div className={cnHomePage('Actions')}>
        <AppLink
          className={cnHomePage('ActionLink', {
            green: true,
          })}
          to={routes.addBook()}
        >
          <IconComponent
            color={ColorConstant.White}
            name={'plusIcon'}
            size={'xxs'}
          />
          <Typography
            align={'center'}
            size={'md'}
            variant={'white'}
            weight={'medium'}
          >
            Добавить книгу
          </Typography>
        </AppLink>

        <AppLink className={cnHomePage('ActionLink')} to={routes.books()}>
          <IconComponent
            color={ColorConstant.Neutral700}
            name={'plusIcon'}
            size={'xxs'}
          />
          <Typography
            align={'center'}
            size={'md'}
            variant={'secondary'}
            weight={'medium'}
          >
            Библиотека
          </Typography>
        </AppLink>
      </div>

      <VStack as={'section'} className={cnHomePage('Current')} gap={'16'}>
        <Typography as={'h6'} size={'lg'} weight={'semibold'}>
          Текущие книги
        </Typography>
        <BookWidget variant={'wide'} />
      </VStack>

      <section className={cnHomePage('Activities')}>
        <Typography as={'h5'} size={'lg'} weight={'semibold'}>
          Последние активности
        </Typography>
        <LastActivity />
      </section>
    </section>
  );
};
