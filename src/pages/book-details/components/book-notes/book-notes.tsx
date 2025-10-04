import { BooleanToggleStore } from '@shared/lib/toggle-boolean-store/booleanToggleStore.ts';
import { Button } from '@shared/ui/button/button.tsx';
import { HStack } from '@shared/ui/hstack/hstack.tsx';
import { IconComponent } from '@shared/ui/icon-component/icon-component.tsx';
import { TextArea } from '@shared/ui/text-area/text-area.tsx';
import { Typography } from '@shared/ui/typography/typography.tsx';
import { observer } from 'mobx-react-lite';
import { type FC, useState } from 'react';

export const BookNotes: FC = observer(() => {
  const [editable] = useState(() => new BooleanToggleStore(false));

  return (
    <>
      <HStack flexJustify={'between'}>
        <Typography as={'h6'} size={'lg'} weight={'medium'}>
          Заметки
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
          <TextArea
            fullWidth
            value={
              'Очень нравятся философские размышления о параллельных жизнях.'
            }
          />
          <HStack gap={'8'}>
            <Button variant={'dark'}>Сохранить</Button>
            <Button onClick={editable.setFalse} variant={'clear'}>
              Отмена
            </Button>
          </HStack>
        </HStack>
      ) : (
        <Typography size={'sm'} variant={'lightDark'}>
          Очень нравятся философские размышления о параллельных жизнях.
        </Typography>
      )}
    </>
  );
});
