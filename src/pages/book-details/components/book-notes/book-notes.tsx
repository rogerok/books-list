import { useBookDetailsStore } from '@pages/book-details/stores/book-details-store.ts';
import { Form } from '@shared/components/form/form.tsx';
import { TextAreaField } from '@shared/components/text-area-field/text-area-field.tsx';
import { Button } from '@shared/ui/button/button.tsx';
import { HStack } from '@shared/ui/hstack/hstack.tsx';
import { IconComponent } from '@shared/ui/icon-component/icon-component.tsx';
import { Skeleton } from '@shared/ui/skeleton/skeleton.tsx';
import { Typography } from '@shared/ui/typography/typography.tsx';
import { observer } from 'mobx-react-lite';
import { type FC } from 'react';

export const BookNotes: FC = observer(() => {
  const { bookNotesEditable, isLoading, notesForm } = useBookDetailsStore();

  if (isLoading) {
    return <Skeleton height={80} />;
  }

  return (
    <>
      <HStack flexJustify={'between'}>
        <Typography as={'h6'} size={'lg'} weight={'medium'}>
          Заметки
        </Typography>
        <IconComponent
          name={'pencilIcon'}
          onClick={bookNotesEditable.toggle}
          size={'xxs'}
        />
      </HStack>
      {bookNotesEditable.value ? (
        <Form methods={notesForm}>
          <HStack gap={'12'}>
            <TextAreaField fullWidth name={'notes'} />
            <HStack gap={'8'}>
              <Button type={'submit'} variant={'dark'}>
                Сохранить
              </Button>
              <Button onClick={bookNotesEditable.setFalse} variant={'clear'}>
                Отмена
              </Button>
            </HStack>
          </HStack>
        </Form>
      ) : (
        <Typography size={'sm'} variant={'lightDark'}>
          {notesForm.values.notes}
        </Typography>
      )}
    </>
  );
});
