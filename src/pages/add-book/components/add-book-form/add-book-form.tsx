import { cn } from '@bem-react/classname';

import './add-book-form.scss';
import { GenresSelect } from '@pages/add-book/components/add-book-form/genres-select.tsx';
import { FormTitle } from '@pages/add-book/components/form-title/form-title.tsx';
import { AddBookStore } from '@pages/add-book/store/add-book-store.ts';
import { DropzoneField } from '@shared/components/dropzone-field/dropzone-field.tsx';
import { Form } from '@shared/components/form/form.tsx';
import { TextField } from '@shared/components/text-field/text-field.tsx';
import { BucketsNames } from '@shared/constants/storage.ts';
import { ColorConstant } from '@shared/constants/style-system/colors.ts';
import { AppRouter } from '@shared/lib/router/app-router.ts';
import { useRootStore } from '@shared/stores/root-store/root-store.ts';
import { AppImage } from '@shared/ui/app-image/app-image.tsx';
import { Button } from '@shared/ui/button/button.tsx';
import { Card } from '@shared/ui/card/card.tsx';
import { IconComponent } from '@shared/ui/icon-component/icon-component.tsx';
import { Loader } from '@shared/ui/Loader/loader.tsx';
import { Skeleton } from '@shared/ui/skeleton/skeleton.tsx';
import { Typography } from '@shared/ui/typography/typography.tsx';
import { VStack } from '@shared/ui/vstack/vstack.tsx';
import { observer } from 'mobx-react-lite';
import { type FC, useState } from 'react';

const cnAddBookForm = cn('AddBookForm');

interface AddBookFormProps {
  className?: string;
}

export const AddBookForm: FC<AddBookFormProps> = observer((props) => {
  const { goal, stats, user } = useRootStore();

  const [store] = useState(
    () => new AddBookStore(user, AppRouter, goal, stats),
  );

  const { form, previewCoverUrl, resetPreviewCoverUrl, setPreviewCoverUrl } =
    store;

  return (
    <Card
      className={cnAddBookForm(undefined, [props.className])}
      elevation={'md'}
    >
      {form.isSubmitting && <Loader />}

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
        <div className={cnAddBookForm('CoverField')}>
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
            className={cnAddBookForm('SearchButton')}
            onClick={() => setPreviewCoverUrl(form.values.outerCoverUrl)}
            variant={'outline'}
          >
            Найти
          </Button>
        </div>

        <VStack fullWidth gap={'12'}>
          <DropzoneField bucketName={BucketsNames.covers} name={'coverUrl'} />
          <Typography size={'3xs'} variant={'light'}>
            Загрузите файл изображения, вставьте ссылку или используйте кнопку
            &#34;Найти&#34;
          </Typography>
        </VStack>

        {previewCoverUrl && (
          <VStack align={'center'} gap={'16'}>
            <AppImage
              alt={'Обложка книги'}
              fallback={<Skeleton height={192} rounded={'14'} width={128} />}
              height={192}
              rounded={'14'}
              src={previewCoverUrl}
              width={128}
            />
            <Button onClick={resetPreviewCoverUrl}>Удалить</Button>
          </VStack>
        )}
        <Button
          addonLeft={<IconComponent name={'saveIcon'} size={'xxs'} />}
          className={cnAddBookForm('SubmitButton')}
          disabled={form.isSubmitting}
          fullWidth
          type={'submit'}
        >
          Добавить книгу
        </Button>
      </Form>
    </Card>
  );
});
