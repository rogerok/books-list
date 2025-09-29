import './app-image.scss';

import { cn } from '@bem-react/classname';
import { Typography } from '@shared/ui/typography/typography.tsx';
import {
  type ImgHTMLAttributes,
  memo,
  type ReactElement,
  useEffect,
  useState,
} from 'react';

const cnAppImage = cn('AppImage');

interface AppImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  alt: string;
  className?: string;
  errorFallback?: ReactElement;
  fallback?: ReactElement;
  rounded?: Rounded;
}

type Rounded = '10' | '14' | '16';

export const AppImage = memo((props: AppImageProps) => {
  const {
    alt,
    className,
    errorFallback,
    fallback,
    height,
    rounded,
    src,
    width,
    ...otherProps
  } = props;
  const [status, setStatus] = useState<'error' | 'loaded' | 'loading'>(
    'loading',
  );

  useEffect(() => {
    if (!src) {
      setStatus('error');
      return;
    }

    let isCancelled = false;
    const img = new Image();
    img.src = src;

    img.onload = (): void => {
      if (!isCancelled) {
        setStatus('loaded');
      }
    };

    img.onerror = (): void => {
      if (!isCancelled) {
        setStatus('error');
      }
    };

    return () => {
      isCancelled = true;
    };
  }, [src]);

  if (status === 'loading' && fallback) {
    return fallback;
  }

  if (status === 'error') {
    return (
      errorFallback ?? (
        <Typography variant={'primary'}>
          🖼️ Ошибка загрузки изображения
        </Typography>
      )
    );
  }

  return (
    <div
      className={cnAppImage(undefined, [className])}
      style={{
        maxHeight: height,
        maxWidth: width,
      }}
    >
      <img
        alt={alt}
        className={cnAppImage('Img', {
          rounded: rounded,
        })}
        src={src}
        {...otherProps}
      />
    </div>
  );
});
