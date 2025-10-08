import './pulse.scss';

import type { FC } from 'react';

import { cn } from '@bem-react/classname';

const cnPulse = cn('Pulse');

interface PulseProps {
  className?: string;
}

export const Pulse: FC<PulseProps> = (props) => {
  return <div className={cnPulse(undefined, [props.className])} />;
};
