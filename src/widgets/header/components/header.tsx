import { cn } from '@bem-react/classname';

import './header.scss';
import { useRouterState } from '@tanstack/react-router';
import { navbarStore } from '@widgets/navbar/components/navbar.tsx';
import { observer } from 'mobx-react-lite';
import React from 'react';

const cnHeader = cn('Header');

export const Header: React.FC<{ className?: string }> = observer(
  ({ className }) => {
    const state = useRouterState();

    const pathname = state.location.pathname;

    // Простая мапа заголовков. Расширяй по нужным путям.
    const title =
      pathname === '/'
        ? 'Главная'
        : pathname.startsWith('/books')
          ? 'Книги'
          : pathname.startsWith('/profile')
            ? 'Профиль'
            : pathname.startsWith('/reports')
              ? 'Отчёты'
              : pathname.startsWith('/goals')
                ? 'Цели'
                : 'Приложение';

    return (
      <header className={cnHeader(undefined, [className])}>
        <button
          aria-label="Toggle menu"
          className={cnHeader('Burger')}
          onClick={() => navbarStore.toggle()}
          type="button"
        >
          <span aria-hidden>☰</span>
        </button>

        <h1 className={cnHeader('Title')}>{title}</h1>
      </header>
    );
  },
);
