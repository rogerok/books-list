import type { FC, ReactNode } from 'react';

import { cn } from '@bem-react/classname';
import { ColorConstant } from '@shared/constants/style-system/colors.ts';
import { IconComponent } from '@shared/ui/icon-component/icon-component.tsx';

import './navbar.scss';
import { Typography } from '@shared/ui/typography/typography.tsx';
import { NavbarNav } from '@widgets/navbar/components/navbar-nav/navbar-nav.tsx';
import { makeAutoObservable } from 'mobx';
import { observer } from 'mobx-react-lite';

interface NavbarProps {
  goalBanner: ReactNode;
  userMenu: ReactNode;
  className?: string;
}

class NavbarStore {
  isOpen = false;

  constructor() {
    makeAutoObservable(this);
  }

  close() {
    this.isOpen = false;
  }

  open() {
    this.isOpen = true;
  }

  toggle() {
    this.isOpen = !this.isOpen;
  }
}

export const navbarStore = new NavbarStore();

const cnNavbar = cn('Navbar');

export const Navbar: FC<NavbarProps> = observer((props) => {
  const { className, goalBanner, userMenu } = props;

  return (
    <>
      <aside
        className={cnNavbar(
          {
            open: navbarStore.isOpen,
          },
          [className, navbarStore.isOpen ? 'open' : ''],
        )}
      >
        <div className={cnNavbar('Inner')}>
          <div className={cnNavbar('Logo')}>
            <div className={cnNavbar('Icon')}>
              <IconComponent
                color={ColorConstant.White}
                name={'bookIcon'}
                size={'sm'}
              />
            </div>
            <div>
              <Typography as={'h2'} size={'lg'} weight={'semibold'}>
                Book Tracker
              </Typography>
              <Typography size={'2xs'} variant={'secondary'}>
                Ваш читательский журнал
              </Typography>
            </div>
          </div>

          <div className={cnNavbar('UserMenu')}>{userMenu}</div>

          <NavbarNav />

          <div className={cnNavbar('GoalBanner')}>{goalBanner}</div>
        </div>
      </aside>

      <div
        className={cnNavbar('Overlay', {
          open: navbarStore.isOpen,
        })}
        onClick={() => navbarStore.close()}
      />
    </>
  );
});
