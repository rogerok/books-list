import type { ComponentProps, FC, ReactNode } from 'react';

import { cn } from '@bem-react/classname';
import { Badge } from '@shared/ui/badge/badge';

import './form-title.scss';
import { Typography } from '@shared/ui/typography/typography.tsx';

const cnFormTitle = cn('FormTitle');

interface FormTitleProps {
  background: ComponentProps<typeof Badge>['background'];
  icon: ReactNode;
  subtitle: string;
  title: string;
  className?: string;
}

export const FormTitle: FC<FormTitleProps> = (props) => {
  const { background, className, icon, subtitle, title } = props;

  return (
    <div className={cnFormTitle(undefined, [className])}>
      <Badge
        background={background}
        className={cnFormTitle('Icon')}
        rounded={'10'}
        size={'md'}
      >
        {icon}
      </Badge>
      <div>
        <Typography
          as={'h2'}
          className={cnFormTitle('Title')}
          weight={'semibold'}
        >
          {title}
        </Typography>
        <Typography size={'sm'} variant={'secondary'}>
          {subtitle}
        </Typography>
      </div>
    </div>
  );
};
