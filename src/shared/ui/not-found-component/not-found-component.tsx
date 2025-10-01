import { cn } from '@bem-react/classname';
import { AppLink } from '@shared/ui/app-link/app-link.tsx';
import { PageMeta } from '@shared/ui/page-meta/page-meta.tsx';
import { Typography } from '@shared/ui/typography/typography.tsx';
import { VStack } from '@shared/ui/vstack/vstack.tsx';
import { type FC } from 'react';

const cnNotFoundComponent = cn('NotFoundComponent');

interface NotFoundComponentProps {
  className?: string;
}

export const NotFoundComponent: FC<NotFoundComponentProps> = (props) => {
  const { className } = props;

  return (
    <main className={cnNotFoundComponent(undefined, [className])}>
      <PageMeta title={'Страница не найдена'} />
      <VStack align={'center'} as={'p'} flexJustify={'center'} gap={'32'}>
        <Typography align={'center'} as={'h1'} size={'xl'}>
          Страница не найдена
        </Typography>
        <AppLink to={'/'} variant={'outline'}>
          На главную
        </AppLink>
      </VStack>
    </main>
  );
};
