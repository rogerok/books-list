import { cn } from '@bem-react/classname';

import './add-book-form.scss';
import { AddBookOuterCoverField } from '@pages/add-book/components/add-book-form/add-book-outer-cover-field.tsx';
import { GenresSelect } from '@pages/add-book/components/add-book-form/genres-select.tsx';
import { PreviewCover } from '@pages/add-book/components/add-book-form/preview-cover.tsx';
import { FormTitle } from '@pages/add-book/components/form-title/form-title.tsx';
import { useAddBookStore } from '@pages/add-book/store/add-book-store.ts';
import { DropzoneField } from '@shared/components/dropzone-field/dropzone-field.tsx';
import { Form } from '@shared/components/form/form.tsx';
import { TextField } from '@shared/components/text-field/text-field.tsx';
import { BucketsNames } from '@shared/constants/storage.ts';
import { ColorConstant } from '@shared/constants/style-system/colors.ts';
import { Button } from '@shared/ui/button/button.tsx';
import { Card } from '@shared/ui/card/card.tsx';
import { IconComponent } from '@shared/ui/icon-component/icon-component.tsx';
import { Loader } from '@shared/ui/loader/loader.tsx';
import { Typography } from '@shared/ui/typography/typography.tsx';
import { VStack } from '@shared/ui/vstack/vstack.tsx';
import { observer } from 'mobx-react-lite';
import { type FC } from 'react';

const cnAddBookForm = cn('AddBookForm');

interface AddBookFormProps {
  className?: string;
}

export const AddBookForm: FC<AddBookFormProps> = observer((props) => {
  const { className } = props;

  const { form, isFormSubmitting } = useAddBookStore();

  return (
    <Card className={cnAddBookForm(undefined, [className])} elevation={'md'}>
      {isFormSubmitting && <Loader />}

      <FormTitle
        background={'green-100'}
        icon={
          <IconComponent
            color={ColorConstant.Green600}
            name={'bookIcon'}
            size={'xs'}
          />
        }
        subtitle={'Пополните свою библиотеку'}
        title={'Добавить новую книгу'}
      />

      <Form className={cnAddBookForm('Form')} methods={form}>
        <TextField
          fullWidth
          label={'Название книги'}
          name={'title'}
          placeholder={'Введите название книги'}
          required
        />
        <TextField
          fullWidth
          label={'Автор'}
          name={'author'}
          placeholder={'Введите имя автора'}
          required
        />
        <GenresSelect />
        <AddBookOuterCoverField />
        <VStack fullWidth gap={'12'}>
          <DropzoneField bucketName={BucketsNames.covers} name={'coverUrl'} />
          <Typography size={'3xs'} variant={'light'}>
            Загрузите файл изображения, вставьте ссылку или используйте кнопку
            &#34;Найти&#34;
          </Typography>
        </VStack>
        <PreviewCover />
        <Button
          addonLeft={<IconComponent name={'saveIcon'} size={'xxs'} />}
          className={cnAddBookForm('SubmitButton')}
          disabled={isFormSubmitting}
          fullWidth
          type={'submit'}
        >
          Добавить книгу
        </Button>
      </Form>
    </Card>
  );
});
