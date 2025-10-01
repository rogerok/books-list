import type { FC } from 'react';

import './main-layout.scss';
import { cn } from '@bem-react/classname';
import { Outlet } from '@tanstack/react-router';
import { GoalBanner } from '@widgets/goal-banner';
import { Header } from '@widgets/header/components/header.tsx';
import { Navbar } from '@widgets/navbar';
import { UserMenu } from '@widgets/user-menu';

const cnMainLayout = cn('MainLayout');

interface MainLayoutProps {
  className?: string;
}

export const MainLayout: FC<MainLayoutProps> = (props) => {
  return (
    <div className={cnMainLayout(undefined, [props.className])}>
      <Navbar
        className={cnMainLayout('Navbar')}
        goalBanner={<GoalBanner />}
        userMenu={<UserMenu />}
      />

      <Header className={cnMainLayout('Header')} />

      <main className={cnMainLayout('Content')}>
        <Outlet />
      </main>
    </div>
  );
};
