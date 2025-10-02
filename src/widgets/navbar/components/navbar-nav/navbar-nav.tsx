import type { FC } from 'react';

import './navbar-nav.scss';
import { cn } from '@bem-react/classname';
import { routes } from '@shared/config/router/routes.ts';
import { AppLink } from '@shared/ui/app-link/app-link.tsx';
import { IconComponent } from '@shared/ui/icon-component/icon-component.tsx';

const cnNavbarNav = cn('NavbarNav');

interface NavbarNavProps {
  className?: string;
}

export const NavbarNav: FC<NavbarNavProps> = (props) => {
  return (
    <nav className={cnNavbarNav(undefined, [props.className])}>
      <AppLink className={cnNavbarNav('Link')} to={routes.home()}>
        <IconComponent name={'homeIcon'} size={'xs'} />
        <span>Главная</span>
      </AppLink>
      <AppLink className={cnNavbarNav('Link')} to={routes.books()}>
        <IconComponent name={'booksIcon'} size={'xs'} />
        <span>Моя библиотека</span>
        <span className={cnNavbarNav('BooksCount')}>4</span>
      </AppLink>
      <AppLink className={cnNavbarNav('Link')} to={routes.addBook()}>
        <IconComponent name={'plusIcon'} size={'xs'} />
        <span>Добавить книгу</span>
      </AppLink>
    </nav>
  );
};
