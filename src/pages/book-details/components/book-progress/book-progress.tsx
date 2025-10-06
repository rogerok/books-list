import { useBookDetailsStore } from '@pages/book-details/stores/book-details-store.ts';
import { Form } from '@shared/components/form/form.tsx';
import { TextField } from '@shared/components/text-field/text-field.tsx';
import { Button } from '@shared/ui/button/button.tsx';
import { HStack } from '@shared/ui/hstack/hstack.tsx';
import { IconComponent } from '@shared/ui/icon-component/icon-component.tsx';
import { ProgressBar } from '@shared/ui/progress-bar/progress-bar.tsx';
import { Skeleton } from '@shared/ui/skeleton/skeleton.tsx';
import { Typography } from '@shared/ui/typography/typography.tsx';
import { observer } from 'mobx-react-lite';
import { type FC } from 'react';

interface BookProgressProps {
  className?: string;
}

export const BookProgress: FC<BookProgressProps> = observer(() => {
  const { bookProgressEditable, isLoading, progressForm } =
    useBookDetailsStore();

  if (isLoading) {
    return <Skeleton height={80} rounded={'14'} />;
  }

  return (
    <>
      <HStack flexJustify={'between'}>
        <Typography as={'h6'} size={'lg'} weight={'medium'}>
          Прогресс по чтению
        </Typography>
        <IconComponent
          name={'pencilIcon'}
          onClick={bookProgressEditable.toggle}
          size={'xxs'}
        />
      </HStack>
      {bookProgressEditable.value ? (
        <Form methods={progressForm}>
          <HStack gap={'12'}>
            <TextField name={'progress'} />
            <HStack gap={'8'}>
              <Button type={'submit'} variant={'dark'}>
                Сохранить
              </Button>
              <Button onClick={bookProgressEditable.setFalse} variant={'clear'}>
                Отмена
              </Button>
            </HStack>
          </HStack>
        </Form>
      ) : (
        <HStack as={'p'} flexJustify={'between'}>
          <Typography gutterBottom size={'2xs'} variant={'secondary'}>
            Прогресс
          </Typography>
          <Typography size={'2xs'} variant={'secondary'}>
            {progressForm.values.progress}%
          </Typography>
          <ProgressBar
            max={100}
            value={progressForm.values.progress}
            variant={'secondary'}
          />
        </HStack>
      )}
    </>
  );
});
