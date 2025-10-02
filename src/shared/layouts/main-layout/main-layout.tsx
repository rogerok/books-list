import type { FC } from 'react';

import './main-layout.scss';
import { cn } from '@bem-react/classname';
import { Outlet } from '@tanstack/react-router';
import { BookWidget } from '@widgets/book';
import { GoalWidget } from '@widgets/goal';
import { Header } from '@widgets/header/components/header.tsx';
import { Navbar } from '@widgets/navbar';
import { StatisticWidget } from '@widgets/statistic';
import { UserMenu } from '@widgets/user-menu';

const cnMainLayout = cn('MainLayout');

interface MainLayoutProps {
  className?: string;
}

export const MainLayout: FC<MainLayoutProps> = (props) => {
  return (
    <div className={cnMainLayout(undefined, [props.className])}>
      <Navbar
        bookWidget={<BookWidget variant={'compact'} />}
        className={cnMainLayout('Navbar')}
        goalWidget={<GoalWidget variant={'small'} />}
        statisticWidget={<StatisticWidget />}
        userMenu={<UserMenu />}
      />

      <Header className={cnMainLayout('Header')} />

      <main className={cnMainLayout('Content')}>
        <Outlet />
      </main>
    </div>
  );
};
