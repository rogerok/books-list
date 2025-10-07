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
  fit?: 'contain' | 'cover';
  height?: number | string;
  rounded?: Rounded;
  width?: number | string;
}

type Rounded = '10' | '14' | '16';

export const AppImage = memo((props: AppImageProps) => {
  const {
    alt,
    className,
    errorFallback,
    fallback,
    fit = 'contain',
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
      if (!isCancelled) setStatus('loaded');
    };
    img.onerror = (): void => {
      if (!isCancelled) setStatus('error');
    };

    return () => {
      isCancelled = true;
    };
  }, [src]);

  if (status === 'loading' && fallback) return fallback;
  if (status === 'error')
    return (
      errorFallback ?? (
        <Typography variant="primary">
          🖼️ Ошибка загрузки изображения
        </Typography>
      )
    );

  return (
    <div
      className={cnAppImage(undefined, [className])}
      style={{
        aspectRatio: width && height ? `${width} / ${height}` : undefined,
        height: height,
        maxHeight: height,
        maxWidth: width,
        width: width,
      }}
    >
      <img
        alt={alt}
        className={cnAppImage('Img', { rounded: rounded })}
        src={src}
        style={{ objectFit: fit }}
        {...otherProps}
      />
    </div>
  );
});
