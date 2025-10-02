import './error-component.scss';

import type { FC } from 'react';

import { cn } from '@bem-react/classname';
import { routes } from '@shared/config/router/routes.ts';
import { Button } from '@shared/ui/button/button.tsx';
import { Typography } from '@shared/ui/typography/typography.tsx';
import { VStack } from '@shared/ui/vstack/vstack.tsx';
import { useNavigate } from '@tanstack/react-router';

const cnErrorComponent = cn('ErrorComponent');

interface ErrorComponentProps {
  reset: () => void;
}

export const ErrorComponent: FC<ErrorComponentProps> = (props) => {
  const navigate = useNavigate();

  const handleReset = (): void => {
    props.reset();

    navigate({
      to: routes.main(),
    });
  };

  return (
    <VStack
      align={'center'}
      as={'section'}
      className={cnErrorComponent()}
      flexJustify={'center'}
      gap={'32'}
    >
      <Typography align={'center'} as={'h1'} size={'xl'} variant={'warn'}>
        Что-то пошло не так
      </Typography>
      <Button onClick={handleReset}>На главную</Button>
    </VStack>
  );
};
