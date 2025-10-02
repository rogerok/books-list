import { Controller } from '@shared/lib/mobx/mobx-form/controller';
import { useFormContext } from '@shared/lib/mobx/mobx-form/useFormContext.ts';
import { Select, type SelectOptionType } from '@shared/ui/select/select.tsx';
import { observer } from 'mobx-react-lite';

type SelectFieldProps<T extends SelectOptionType> = {
  labelField: keyof T;
  name: string;
  options: T[];
  valueField: keyof T;
  className?: string;
  description?: string;
  disabled?: boolean;
  isLoading?: boolean;
  label?: string;
  placeholder?: string;
  required?: boolean;
};

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
    } = props;

    const { control } = useFormContext();

    return (
      <Controller
        control={control}
        name={name}
        render={({ field, fieldState }) => (
          <Select<T>
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
