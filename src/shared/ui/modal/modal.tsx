import './modal.scss';

import { cn } from '@bem-react/classname';
import { ColorConstant } from '@shared/constants/style-system/colors.ts';
import { useKeyDown } from '@shared/lib/hooks/useKeyDown.ts';
import { HStack } from '@shared/ui/hstack/hstack.tsx';
import { IconComponent } from '@shared/ui/icon-component/icon-component.tsx';
import { Overlay } from '@shared/ui/overlay/overlay.tsx';
import { Portal } from '@shared/ui/portal/portal.tsx';
import { Typography } from '@shared/ui/typography/typography.tsx';
import { type FC, type MouseEvent, type ReactNode, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';

const cnModal = cn('Modal');

type ModalSize = 'fullScreen' | 'lg' | 'md' | 'sm' | 'xs';

interface ModalProps {
  children: ReactNode;
  className?: string;
  fullScreen?: boolean;
  open?: boolean;
  size?: ModalSize;
  title?: string;
  onClose?: () => void;
}

export const Modal: FC<ModalProps> = (props) => {
  const {
    children,
    className,
    fullScreen,
    onClose,
    open,
    size = 'md',
    title,
  } = props;

  const ref = useRef<HTMLDivElement | null>(null);

  const handleClose = (): void => {
    onClose?.();
  };

  useKeyDown({
    callBack: handleClose,
    keyCode: 'Escape',
  });

  const handlePressContent = (e: MouseEvent<HTMLDivElement>): void => {
    e.stopPropagation();
  };

  return (
    <Portal container={document.body.querySelector('.App') ?? document.body}>
      <CSSTransition
        classNames="Modal-Transition"
        in={open}
        nodeRef={ref}
        timeout={300}
        unmountOnExit
      >
        <div className={cnModal(undefined, [className])}>
          <Overlay className={cnModal('ModalOverlay')} onClick={handleClose} />

          <div
            className={cnModal('Content', {
              fullScreen: fullScreen,
              size: size,
            })}
            onClick={handlePressContent}
            ref={ref}
          >
            <HStack align={'center'} flexJustify={'between'} wrap={'nowrap'}>
              {title && (
                <Typography
                  as={'h4'}
                  className={cnModal('Title')}
                  size={'md'}
                  weight={'semibold'}
                >
                  {title}
                </Typography>
              )}
              <IconComponent
                className={cnModal('CloseButton')}
                color={ColorConstant.Neutral700}
                name={'cancelIcon'}
                onClick={handleClose}
                size={'md'}
              />
            </HStack>

            {children}
          </div>
        </div>
      </CSSTransition>
    </Portal>
  );
};
