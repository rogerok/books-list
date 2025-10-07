import type { FC } from 'react';

import './navbar-nav.scss';
import { cn } from '@bem-react/classname';
import { routes } from '@shared/config/router/routes.ts';
import { useRootStore } from '@shared/stores/root-store/root-store.ts';
import { AppLink } from '@shared/ui/app-link/app-link.tsx';
import { IconComponent } from '@shared/ui/icon-component/icon-component.tsx';
import { observer } from 'mobx-react-lite';

const cnNavbarNav = cn('NavbarNav');

interface NavbarNavProps {
  className?: string;
}

export const NavbarNav: FC<NavbarNavProps> = observer((props) => {
  const { navbar, stats } = useRootStore();

  return (
    <nav className={cnNavbarNav(undefined, [props.className])}>
      <AppLink
        activeOptions={{
          exact: true,
        }}
        className={cnNavbarNav('Link')}
        onClick={navbar.closeOnDownMdScreen}
        to={routes.home()}
      >
        <IconComponent name={'homeIcon'} size={'xs'} />
        <span>Главная</span>
      </AppLink>
      <AppLink
        activeOptions={{
          exact: true,
        }}
        className={cnNavbarNav('Link')}
        onClick={navbar.closeOnDownMdScreen}
        to={routes.books()}
      >
        <IconComponent name={'booksIcon'} size={'xs'} />
        <span>Моя библиотека</span>
        {stats.total && stats.total >= 0 && (
          <span className={cnNavbarNav('BooksCount')}>{stats.total}</span>
        )}
      </AppLink>
      <AppLink
        activeOptions={{
          exact: true,
        }}
        className={cnNavbarNav('Link')}
        onClick={navbar.closeOnDownMdScreen}
        to={routes.addBook()}
      >
        <IconComponent name={'plusIcon'} size={'xs'} />
        <span>Добавить книгу</span>
      </AppLink>
    </nav>
  );
});
