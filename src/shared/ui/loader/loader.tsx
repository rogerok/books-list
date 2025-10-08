import './loader.scss';

import { cn } from '@bem-react/classname';
import { Dots } from '@shared/ui/loader/dots/dots.tsx';
import { Pulse } from '@shared/ui/loader/pulse/pulse.tsx';
import { Spinner } from '@shared/ui/loader/spinner/spinner.tsx';
import { Typography } from '@shared/ui/typography/typography.tsx';
import { type FC, type ReactNode, useEffect, useRef } from 'react';

const cnLoader = cn('Loader');

interface LoaderProps {
  className?: string;
  fullPage?: boolean;
  message?: ReactNode;
  overlay?: boolean;
  preventScroll?: boolean;
  variant?: 'dots' | 'pulse' | 'spinner';
}

export const Loader: FC<LoaderProps> = ({
  className,
  fullPage,
  message = 'Загрузка...',
  overlay,
  preventScroll,
  variant = 'spinner',
}) => {
  const nodeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (preventScroll && fullPage) {
      const originalStyle = window.getComputedStyle(document.body).overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalStyle;
      };
    }
  }, [preventScroll, fullPage]);

  const renderLoader = (): ReactNode => {
    switch (variant) {
      case 'dots':
        return <Dots />;
      case 'pulse':
        return <Pulse />;
      case 'spinner':
      default:
        return <Spinner />;
    }
  };

  return (
    <div className={cnLoader({ fullPage, overlay }, [className])} ref={nodeRef}>
      <div className={cnLoader('Container')}>
        {renderLoader()}

        {message && (
          <Typography className={cnLoader('Message')} size={'md'}>
            {message}
          </Typography>
        )}
      </div>
    </div>
  );
};
