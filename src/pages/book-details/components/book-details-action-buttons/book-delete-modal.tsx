import { useBookDetailsStore } from '@pages/book-details/stores/book-details-store.ts';
import { BooleanToggleStore } from '@shared/lib/toggle-boolean-store/booleanToggleStore.ts';
import { useRootStore } from '@shared/stores/root-store/root-store.ts';
import { Button } from '@shared/ui/button/button.tsx';
import { HStack } from '@shared/ui/hstack/hstack.tsx';
import { Modal } from '@shared/ui/modal/modal.tsx';
import { Typography } from '@shared/ui/typography/typography.tsx';
import { VStack } from '@shared/ui/vstack/vstack.tsx';
import { observer } from 'mobx-react-lite';
import { type FC, useState } from 'react';

export const BookDeleteModal: FC = observer(() => {
  const { deleteBook, isDeleting, isReadingRequestLoad } =
    useBookDetailsStore();

  const { screen } = useRootStore();

  const [modalStore] = useState(() => new BooleanToggleStore(false));

  return (
    <>
      <Button
        disabled={isReadingRequestLoad || isDeleting}
        fullWidth
        isLoading={isDeleting}
        onClick={modalStore.setTrue}
        variant={'warn'}
      >
        Удалить
      </Button>
      <Modal
        fullScreen={screen.downMd}
        onClose={modalStore.setFalse}
        open={modalStore.value}
        title={'Удалить книгу'}
      >
        <VStack align={'center'} as={'p'} flexJustify={'center'} gap={'16'}>
          <Typography align={'center'} size={'md'} weight={'semibold'}>
            Внимание!
          </Typography>
          <Typography variant={'warn'} weight={'semibold'}>
            При удалении книги так же будет удалена статистика
          </Typography>
        </VStack>
        <HStack flexJustify={'between'} gap={'32'}>
          <Button
            disabled={isDeleting}
            fullWidth={screen.downMd}
            isLoading={isDeleting}
            onClick={deleteBook}
            variant={'warn'}
          >
            Удалить
          </Button>
          <Button
            disabled={isDeleting}
            fullWidth={screen.downMd}
            onClick={modalStore.setFalse}
          >
            Отмена
          </Button>
        </HStack>
      </Modal>
    </>
  );
});
