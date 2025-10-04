import type { ComponentProps, FC } from 'react';

import { Controller } from '@shared/lib/mobx/mobx-form/controller.tsx';
import { useFormContext } from '@shared/lib/mobx/mobx-form/useFormContext.ts';
import { TextArea } from '@shared/ui/text-area/text-area.tsx';
import { observer } from 'mobx-react-lite';

type HTMLTextAreaProps = Omit<
  ComponentProps<typeof TextArea>,
  'onChange' | 'readOnly' | 'value'
>;

interface TextAreaFieldProps extends HTMLTextAreaProps {
  name: string;
  className?: string;
}

export const TextAreaField: FC<TextAreaFieldProps> = observer((props) => {
  const { className, name, ...rest } = props;
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <TextArea
          {...rest}
          {...field}
          className={className}
          error={fieldState.error?.message}
        />
      )}
    />
  );
});
