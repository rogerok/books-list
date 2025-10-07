import './skeleton.scss';
import { cn } from '@bem-react/classname';
import {
  type CSSProperties,
  type FC,
  memo,
  type ReactElement,
  type ReactNode,
} from 'react';

const cnSkeleton = cn('Skeleton');

type Rounded = '10' | '14' | '16';

interface SkeletonProps {
  animation?: 'none' | 'pulse' | 'wave';
  animationDelay?: number;
  background?: 'dark' | 'light';
  borderRadius?: number | string;
  children?: ReactNode;
  className?: string;
  count?: number;
  height?: number | string;
  rounded?: Rounded;
  style?: CSSProperties;
  variant?: 'circle' | 'none';
  width?: number | string;
}

export const Skeleton: FC<SkeletonProps> = memo((props) => {
  const {
    animation = 'pulse',
    animationDelay = 0,
    background = 'light',
    borderRadius,
    children,
    className,
    count = 1,
    height,
    rounded,
    style = {},
    variant = 'none',
    width,
  } = props;

  const baseStyles: CSSProperties = {
    borderRadius: variant === 'circle' ? `${width}px` : `${borderRadius}px`,
    height: `${height}px`,
    width: width ? `${width}px` : '100%',
    ...style,
  };

  const createSkeleton = (key: number): ReactElement => (
    <div
      className={cnSkeleton(
        {
          animation: animation,
          background: background,
          rounded: rounded,
          variant: variant,
        },
        [className],
      )}
      key={key}
      style={{ ...baseStyles, animationDelay: `${animationDelay * key}s` }}
    >
      {children}
    </div>
  );

  if (count > 1) {
    return (
      <>{Array.from({ length: count }, (_, index) => createSkeleton(index))}</>
    );
  }

  return createSkeleton(0);
});
