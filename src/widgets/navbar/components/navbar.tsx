import type { FC, ReactNode } from 'react';

import { cn } from '@bem-react/classname';
import { ColorConstant } from '@shared/constants/style-system/colors.ts';
import { useRootStore } from '@shared/stores/root-store/root-store.ts';

import './navbar.scss';
import { IconComponent } from '@shared/ui/icon-component/icon-component.tsx';
import { Typography } from '@shared/ui/typography/typography.tsx';
import { VStack } from '@shared/ui/vstack/vstack.tsx';
import { NavbarNav } from '@widgets/navbar/components/navbar-nav/navbar-nav.tsx';
import { observer } from 'mobx-react-lite';

interface NavbarProps {
  bookWidget: ReactNode;
  goalWidget: ReactNode;
  statisticWidget: ReactNode;
  userMenu: ReactNode;
  className?: string;
}

const cnNavbar = cn('Navbar');

const Navbar: FC<NavbarProps> = observer((props) => {
  const { bookWidget, className, goalWidget, statisticWidget, userMenu } =
    props;

  const { navbar } = useRootStore();

  return (
    <>
      <aside
        className={cnNavbar(
          {
            open: navbar.value,
          },
          [className, navbar.value ? 'open' : ''],
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
            <IconComponent
              className={cnNavbar('CloseButton')}
              color={ColorConstant.Neutral900}
              name={'cancelIcon'}
              onClick={navbar.setFalse}
              size={'md'}
            />
          </div>

          <div className={cnNavbar('UserMenu')}>{userMenu}</div>

          <NavbarNav />

          <div className={cnNavbar('GoalWidget')}>{goalWidget}</div>

          <VStack className={cnNavbar('BookWidget')} gap={'12'}>
            <Typography as={'h6'} size={'sm'} weight={'medium'}>
              Сейчас читаю
            </Typography>
            <div>{bookWidget}</div>
          </VStack>
          <div className={cnNavbar('StatisticWidget')}>{statisticWidget}</div>
        </div>
      </aside>

      <div
        className={cnNavbar('Overlay', {
          open: navbar.value,
        })}
        onClick={navbar.setFalse}
      />
    </>
  );
});
export default Navbar;
