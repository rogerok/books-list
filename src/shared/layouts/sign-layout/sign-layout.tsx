import type { FC, ReactNode } from 'react';

import './sign-layout.scss';
import { cn } from '@bem-react/classname';

const cnSignLayout = cn('SignLayout');

interface SignLayoutProps {
  form: ReactNode;
  className?: string;
  infoPanel?: ReactNode;
}

export const SignLayout: FC<SignLayoutProps> = (props) => {
  const { className, form, infoPanel } = props;
  return (
    <main className={cnSignLayout(undefined, [className])}>
      <div className={cnSignLayout('Content')}>
        {infoPanel && (
          <div className={cnSignLayout('InfoPanel')}>{infoPanel}</div>
        )}
        <div className={cnSignLayout('Form')}>{form}</div>
      </div>
    </main>
  );
};
