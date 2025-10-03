import './select.scss';

import { cn } from '@bem-react/classname';
import { ColorConstant } from '@shared/constants/style-system/colors.ts';
import { IconComponent } from '@shared/ui/icon-component/icon-component.tsx';
import { Typography } from '@shared/ui/typography/typography';
import { VStack } from '@shared/ui/vstack/vstack';
import { useId } from 'react';
import ReactSelect, {
  components,
  type DropdownIndicatorProps,
  type GroupBase,
  type Props as ReactSelectProps,
  type SingleValue,
} from 'react-select';

const cnSelect = cn('Select');

export type SelectOptionType = {
  id: number | string;
  [key: string]: unknown;
};

type SelectProps<T extends SelectOptionType> = {
  labelField: keyof T;
  options: T[];
  valueField: keyof T;
  className?: string;
  disabled?: boolean;
  error?: string;
  fullWidth?: boolean;
  isLoading?: boolean;
  label?: string;
  placeholder?: string;
  value?: T | null;
  onChange: (option: T | null) => void;
} & Omit<
  ReactSelectProps<T, false, GroupBase<T>>,
  'onChange' | 'options' | 'value'
>;

const DropdownIndicator = <T,>(
  props: DropdownIndicatorProps<T, false, GroupBase<T>>,
) => {
  return (
    <components.DropdownIndicator {...props}>
      <IconComponent
        color={ColorConstant.Neutral500}
        name={'dropdownArrowIcon'}
        size={'xxs'}
      />
    </components.DropdownIndicator>
  );
};

export const Select = <T extends SelectOptionType>(props: SelectProps<T>) => {
  const {
    className,
    disabled,
    error,
    fullWidth,
    isLoading,
    label,
    labelField,
    onChange,
    options,
    placeholder,
    required,
    value,
    valueField,
    ...rest
  } = props;

  const id = useId();

  return (
    <VStack
      className={cnSelect(
        { disabled: disabled, error: !!error, fullWidth: fullWidth },
        [className],
      )}
      gap={'8'}
    >
      {label && (
        <label className={cnSelect('Label')} htmlFor={id}>
          <Typography size={'xs'} variant={'dark'} weight={'medium'}>
            {label} {required ? '*' : ''}
          </Typography>
        </label>
      )}

      <div className={cnSelect('Inner', { fullWidth: fullWidth })}>
        <ReactSelect<T, false, GroupBase<T>>
          className={cnSelect('Control', {
            error: !!error,
            fullWidth: fullWidth,
            hasValue: !!value,
          })}
          classNamePrefix="Select"
          components={{
            DropdownIndicator: DropdownIndicator,
          }}
          getOptionLabel={(opt) => String(opt[labelField])}
          getOptionValue={(opt) => String(opt[valueField])}
          inputId={id}
          isDisabled={disabled}
          isLoading={isLoading}
          onChange={(newValue: SingleValue<T>) => onChange(newValue ?? null)}
          options={options}
          placeholder={placeholder}
          required
          value={value ?? null}
          {...rest}
        />
      </div>

      {error && <Typography variant={'warn'}>{error}</Typography>}
    </VStack>
  );
};
