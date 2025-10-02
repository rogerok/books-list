import type { FC } from 'react';

import './add-book-form.scss';
import { cn } from '@bem-react/classname';
import { Form } from '@shared/components/form/form.tsx';
import { SelectField } from '@shared/components/select-field/select-field.tsx';
import { TextField } from '@shared/components/text-field/text-field.tsx';
import { ColorConstant } from '@shared/constants/style-system/colors.ts';
import { MobxForm } from '@shared/lib/mobx/mobx-form/mobx-form.ts';
import { Card } from '@shared/ui/card/card.tsx';
import { HStack } from '@shared/ui/hstack/hstack.tsx';
import { IconComponent } from '@shared/ui/icon-component/icon-component.tsx';
import { Typography } from '@shared/ui/typography/typography.tsx';

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

export const AddBookForm: FC<AddBookFormProps> = (props) => {
  return (
    <Card
      className={cnAddBookForm(undefined, [props.className])}
      elevation={'md'}
    >
      <HStack align={'center'} gap={'12'}>
        {/*TODO: вынести в отдельный компонент*/}
        <div className={cnAddBookForm('Icon')}>
          <IconComponent
            color={ColorConstant.Green600}
            name={'bookIcon'}
            size={'xs'}
          />
        </div>
        <div>
          <Typography as={'h1'} size={'xl'} weight={'semibold'}>
            Добавить новую книгу
          </Typography>
          <Typography size={'sm'} variant={'secondary'}>
            Пополните свою библиотеку
          </Typography>
        </div>
      </HStack>
      <Form methods={mockForm}>
        <TextField
          label={'Название книги'}
          name={'name'}
          placeholder={'Введите название книги'}
          required
        />
        <TextField
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
      </Form>
    </Card>
  );
};
