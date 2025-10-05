import type { FC } from 'react';

import { SelectField } from '@shared/components/select-field/select-field.tsx';
import {
  BookStatusEnumSchema,
  type BookStatusType,
} from '@shared/models/book.ts';

const bookStatusOptions: {
  id: BookStatusType;
  label: string;
}[] = [
  {
    id: BookStatusEnumSchema.enum.read,
    label: 'Прочитано',
  },
  {
    id: BookStatusEnumSchema.enum.toRead,
    label: 'Хочу прочитать',
  },
  {
    id: BookStatusEnumSchema.enum.reading,
    label: 'Читаю',
  },
];

export const BookStatusSelect: FC = () => {
  return (
    <SelectField
      isClearable={false}
      label={'Выберите статус книги'}
      labelField={'label'}
      name={'status'}
      options={bookStatusOptions}
      placeholder={'Выберите статус книги'}
      valueField={'id'}
    />
  );
};
