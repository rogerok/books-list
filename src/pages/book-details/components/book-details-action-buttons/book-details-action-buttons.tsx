import { BookDeleteModal } from '@pages/book-details/components/book-details-action-buttons/book-delete-modal.tsx';
import { useBookDetailsStore } from '@pages/book-details/stores/book-details-store.ts';
import { ColorConstant } from '@shared/constants/style-system/colors.ts';
import { Button } from '@shared/ui/button/button.tsx';
import { IconComponent } from '@shared/ui/icon-component/icon-component.tsx';
import { observer } from 'mobx-react-lite';
import { type FC } from 'react';

export const BookDetailsActionButtons: FC = observer(() => {
  const { isBookRead, isDeleting, isReadingRequestLoad, markAsRead } =
    useBookDetailsStore();

  return (
    <>
      <Button
        addonLeft={
          <IconComponent
            color={ColorConstant.White}
            name={'doneIcon'}
            size={'xxs'}
          />
        }
        disabled={isReadingRequestLoad || isDeleting || isBookRead}
        fullWidth
        isLoading={isReadingRequestLoad}
        onClick={markAsRead}
        variant={'accent'}
      >
        Прочитано
      </Button>

      <BookDeleteModal />
    </>
  );
});
