import { BooleanToggleStore } from '@shared/lib/toggle-boolean-store/booleanToggleStore.ts';
import { Button } from '@shared/ui/button/button.tsx';
import { HStack } from '@shared/ui/hstack/hstack.tsx';
import { IconComponent } from '@shared/ui/icon-component/icon-component.tsx';
import { Input } from '@shared/ui/input/input.tsx';
import { ProgressBar } from '@shared/ui/progress-bar/progress-bar.tsx';
import { Typography } from '@shared/ui/typography/typography.tsx';
import { observer } from 'mobx-react-lite';
import { type FC, useState } from 'react';

interface BookProgressProps {
  className?: string;
}

export const BookProgress: FC<BookProgressProps> = observer(() => {
  const [editable] = useState(() => new BooleanToggleStore(false));

  return (
    <>
      <HStack flexJustify={'between'}>
        <Typography as={'h6'} size={'lg'} weight={'medium'}>
          Прогресс по чтению
        </Typography>
        <IconComponent
          name={'pencilIcon'}
          onClick={editable.toggle}
          size={'xxs'}
        />
      </HStack>
      {editable.value ? (
        // TODO: replace with form
        <HStack gap={'12'}>
          <Input name={'progress'} value={65} />
          <HStack gap={'8'}>
            <Button variant={'dark'}>Сохранить</Button>
            <Button onClick={editable.setFalse} variant={'clear'}>
              Отмена
            </Button>
          </HStack>
        </HStack>
      ) : (
        <HStack as={'p'} flexJustify={'between'}>
          <Typography gutterBottom size={'2xs'} variant={'secondary'}>
            Прогресс
          </Typography>
          <Typography size={'2xs'} variant={'secondary'}>
            65%
          </Typography>
          <ProgressBar max={100} value={65} variant={'secondary'} />
        </HStack>
      )}
    </>
  );
});
