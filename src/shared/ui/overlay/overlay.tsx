import './overlay.scss';

import { cn } from '@bem-react/classname';
import { type FC, memo } from 'react';

const cnOverlay = cn('Overlay');

interface OverlayProps {
  className?: string;
  onClick?: () => void;
}

export const Overlay: FC<OverlayProps> = memo((props) => {
  const { className, onClick } = props;

  return (
    <div className={cnOverlay(undefined, [className])} onClick={onClick} />
  );
});
