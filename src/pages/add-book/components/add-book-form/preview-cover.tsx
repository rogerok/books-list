import type { FC } from 'react';

import { cn } from '@bem-react/classname';
import { useAddBookStore } from '@pages/add-book/store/add-book-store.ts';
import { AppImage } from '@shared/ui/app-image/app-image.tsx';
import { Button } from '@shared/ui/button/button.tsx';
import { Skeleton } from '@shared/ui/skeleton/skeleton.tsx';
import { VStack } from '@shared/ui/vstack/vstack.tsx';
import { observer } from 'mobx-react-lite';

const cnPreviewCover = cn('PreviewCover');

interface PreviewCoverProps {
  className?: string;
}

export const PreviewCover: FC<PreviewCoverProps> = observer((props) => {
  const { previewCoverUrl, resetPreviewCoverUrl } = useAddBookStore();

  if (!previewCoverUrl) {
    return null;
  }

  return (
    <VStack
      align={'center'}
      className={cnPreviewCover(undefined, [props.className])}
      gap={'16'}
    >
      <AppImage
        alt={'Обложка книги'}
        fallback={<Skeleton height={192} rounded={'14'} width={128} />}
        height={192}
        rounded={'14'}
        src={previewCoverUrl}
        width={128}
      />
      <Button onClick={resetPreviewCoverUrl} variant={'warn'}>
        Удалить
      </Button>
    </VStack>
  );
});
