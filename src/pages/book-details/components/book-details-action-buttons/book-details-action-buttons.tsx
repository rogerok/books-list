import type { FC } from 'react';

import { useBookDetailsStore } from '@pages/book-details/stores/book-details-store.ts';
import { ColorConstant } from '@shared/constants/style-system/colors.ts';
import { Button } from '@shared/ui/button/button.tsx';
import { IconComponent } from '@shared/ui/icon-component/icon-component.tsx';
import { observer } from 'mobx-react-lite';

export const BookDetailsActionButtons: FC = observer(() => {
  const {
    deleteBook,
    isBookRead,
    isDeleting,
    isReadingRequestLoad,
    markAsRead,
  } = useBookDetailsStore();

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
      <Button
        disabled={isReadingRequestLoad || isDeleting}
        fullWidth
        isLoading={isDeleting}
        onClick={deleteBook}
        variant={'warn'}
      >
        Удалить
      </Button>
    </>
  );
});
