import type { FC } from 'react';

import './main-layout.scss';
import { cn } from '@bem-react/classname';
import { Outlet } from '@tanstack/react-router';
import { BooksListWidget } from '@widgets/book/components/books-list-widget.tsx';
import { GoalWidget } from '@widgets/goal';
import { Header } from '@widgets/header';
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
        bookWidget={<BooksListWidget variant={'compact'} />}
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
