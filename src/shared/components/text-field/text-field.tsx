import { Controller } from '@shared/lib/mobx/mobx-form/controller';
import { useFormContext } from '@shared/lib/mobx/mobx-form/useFormContext.ts';
import { Input } from '@shared/ui/input/input';
import { observer } from 'mobx-react-lite';
import { type ComponentProps, type FC } from 'react';

type HTMLInputProps = Omit<
  ComponentProps<typeof Input>,
  'onChange' | 'readOnly' | 'value'
>;

interface TextFieldProps extends HTMLInputProps {
  name: string;
  className?: string;
  description?: string;
  label?: string;
}

export const TextField: FC<TextFieldProps> = observer((props) => {
  const { className, name, type = 'text', ...rest } = props;
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <Input
          {...rest}
          {...field}
          className={className}
          error={fieldState.error?.message}
          type={type}
        />
      )}
    />
  );
});
