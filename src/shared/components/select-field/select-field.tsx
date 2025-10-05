import type { ComponentProps } from 'react';

import { Controller } from '@shared/lib/mobx/mobx-form/controller';
import { useFormContext } from '@shared/lib/mobx/mobx-form/useFormContext.ts';
import { Select, type SelectOptionType } from '@shared/ui/select/select.tsx';
import { observer } from 'mobx-react-lite';

type SelectFieldProps<T extends SelectOptionType> = {
  name: string;
} & Omit<ComponentProps<typeof Select<T>>, 'onChange'>;

export const SelectField = observer(
  <T extends SelectOptionType>(props: SelectFieldProps<T>) => {
    const {
      className,
      disabled,
      isLoading,
      label,
      labelField,
      name,
      options,
      placeholder,
      required,
      valueField,
      ...rest
    } = props;

    const { control } = useFormContext();

    return (
      <Controller
        control={control}
        name={name}
        render={({ field, fieldState }) => (
          <Select<T>
            {...rest}
            className={className}
            disabled={disabled}
            error={fieldState.error?.message}
            isLoading={isLoading}
            label={label}
            labelField={labelField}
            onChange={(option) =>
              field.onChange(option ? option[valueField] : null)
            }
            options={options}
            placeholder={placeholder}
            required={required}
            value={
              options.find((opt) => opt[valueField] === field.value) ?? null
            }
            valueField={valueField}
          />
        )}
      />
    );
  },
);
