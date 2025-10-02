import type { ReactNode } from 'react';

import { routes } from '@shared/config/router/routes.ts';
import { IconComponent } from '@shared/ui/icon-component/icon-component.tsx';
import { linkOptions } from '@tanstack/react-router';

export type NavbarLinksType = {
  icon: ReactNode;

  label: string;

  to: string;
};

export const NavbarLinks: NavbarLinksType[] = [
  linkOptions({
    icon: <IconComponent name={'homeIcon'} size={'xs'} />,
    label: 'Главная',
    to: routes.home(),
  }),
  linkOptions({
    icon: <IconComponent name={'booksIcon'} size={'xs'} />,
    label: 'Моя библиотека',
    to: routes.books(),
  }),
  linkOptions({
    icon: <IconComponent name={'plusIcon'} size={'xs'} />,
    label: 'Добавить книгу',
    to: routes.addBook(),
  }),
] as const;
