import type { FC } from 'react';

import './add-book-form.scss';
import { cn } from '@bem-react/classname';
import { FormTitle } from '@pages/add-book/components/form-title/form-title.tsx';
import { Form } from '@shared/components/form/form.tsx';
import { SelectField } from '@shared/components/select-field/select-field.tsx';
import { TextField } from '@shared/components/text-field/text-field.tsx';
import { ColorConstant } from '@shared/constants/style-system/colors.ts';
import { MobxForm } from '@shared/lib/mobx/mobx-form/mobx-form.ts';
import { Button } from '@shared/ui/button/button.tsx';
import { Card } from '@shared/ui/card/card.tsx';
import { Dropzone } from '@shared/ui/dropzone/dropzone.tsx';
import { IconComponent } from '@shared/ui/icon-component/icon-component.tsx';
import { Typography } from '@shared/ui/typography/typography.tsx';
import { VStack } from '@shared/ui/vstack/vstack.tsx';
import { observer } from 'mobx-react-lite';

const cnAddBookForm = cn('AddBookForm');

interface AddBookFormProps {
  className?: string;
}

const mockForm = new MobxForm({
  defaultValues: {
    author: '',
    cover: '',
    genre: '',
    name: '',
  },
});

export const AddBookForm: FC<AddBookFormProps> = observer((props) => {
  return (
    <Card
      className={cnAddBookForm(undefined, [props.className])}
      elevation={'md'}
    >
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

      <Form className={cnAddBookForm('Form')} methods={mockForm}>
        <TextField
          fullWidth
          label={'Название книги'}
          name={'name'}
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
        <SelectField
          label={'Жанр'}
          labelField={'label'}
          name={'genre'}
          options={[
            { id: '1', label: 'Фантастика' },
            { id: '2', label: 'Художка' },
            { id: '3', label: 'Чёто ещё' },
          ]}
          placeholder={'Выберите жанр'}
          required
          valueField={'id'}
        />
        <div className={cnAddBookForm('CoverField')}>
          <TextField
            fullWidth
            label={'Обложка книги'}
            name={'cover'}
            placeholder={'Вставьте ссылку на изображение'}
            required
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
            variant={'outline'}
          >
            Найти
          </Button>
        </div>

        <VStack fullWidth gap={'12'}>
          <Dropzone name={'cover'} />
          <Typography size={'3xs'} variant={'light'}>
            Загрузите файл изображения, вставьте ссылку или используйте кнопку
            &#34;Найти&#34;
          </Typography>
        </VStack>

        <Button
          addonLeft={<IconComponent name={'saveIcon'} size={'xxs'} />}
          className={cnAddBookForm('SubmitButton')}
          fullWidth
          type={'submit'}
        >
          Добавить книгу
        </Button>
      </Form>
    </Card>
  );
});
