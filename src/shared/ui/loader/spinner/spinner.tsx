import './spinner.scss';

import type { FC } from 'react';

import { cn } from '@bem-react/classname';

const cnSpinner = cn('Spinner');

interface SpinnerProps {
  className?: string;
}

export const Spinner: FC<SpinnerProps> = (props) => {
  return (
    <div className={cnSpinner(undefined, [props.className])}>
      <div className={cnSpinner('Item')} />
      <div className={cnSpinner('Item')} />
      <div className={cnSpinner('Item')} />
      <div className={cnSpinner('Item')} />
    </div>
  );
};
