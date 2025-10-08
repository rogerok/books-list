import { cn } from '@bem-react/classname';

import './main-layout.scss';
import { Outlet, useRouter } from '@tanstack/react-router';
import { BooksListWidget } from '@widgets/book/components/books-list-widget.tsx';
import { GoalWidget } from '@widgets/goal';
import { Header } from '@widgets/header';
import { Navbar } from '@widgets/navbar';
import { StatisticWidget } from '@widgets/statistic';
import { UserMenu } from '@widgets/user-menu';
import { type FC, useEffect, useRef } from 'react';

const cnMainLayout = cn('MainLayout');

interface MainLayoutProps {
  className?: string;
}

export const MainLayout: FC<MainLayoutProps> = (props) => {
  const contentRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();

  useEffect(() => {
    return router.subscribe('onResolved', () => {
      if (contentRef.current) {
        contentRef.current.scrollTo({ behavior: 'smooth', top: 0 });
      }
    });
  }, [router]);

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

      <main className={cnMainLayout('Content')} ref={contentRef}>
        <Outlet />
      </main>
    </div>
  );
};
