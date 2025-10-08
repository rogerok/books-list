import type { FC } from 'react';

import './add-book-outer-cover-field.scss';
import { cn } from '@bem-react/classname';
import { useAddBookStore } from '@pages/add-book/store/add-book-store.ts';
import { TextField } from '@shared/components/text-field/text-field.tsx';
import { ColorConstant } from '@shared/constants/style-system/colors.ts';
import { Button } from '@shared/ui/button/button.tsx';
import { IconComponent } from '@shared/ui/icon-component/icon-component.tsx';
import { observer } from 'mobx-react-lite';

const cnAddBookOuterCoverField = cn('AddBookOuterCoverField');

interface AddBookOuterCoverFieldProps {
  className?: string;
}

export const AddBookOuterCoverField: FC<AddBookOuterCoverFieldProps> = observer(
  (props) => {
    const { className } = props;
    const { form, setPreviewCoverUrl } = useAddBookStore();

    return (
      <div className={cnAddBookOuterCoverField(undefined, [className])}>
        <TextField
          fullWidth
          label={'Обложка книги'}
          name={'outerCoverUrl'}
          placeholder={'Вставьте ссылку на изображение'}
        />
        <Button
          addonLeft={
            <IconComponent
              color={ColorConstant.Neutral550}
              name={'searchIcon'}
              size={'xxs'}
            />
          }
          className={cnAddBookOuterCoverField('SearchButton')}
          onClick={() => setPreviewCoverUrl(form.values.outerCoverUrl)}
          variant={'outline'}
        >
          Найти
        </Button>
      </div>
    );
  },
);
