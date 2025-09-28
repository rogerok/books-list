import './input.scss';

import { cn } from '@bem-react/classname';
import { Typography } from '@shared/ui/typography/typography';
import { VStack } from '@shared/ui/vstack/vstack';
import {
  type ChangeEvent,
  type FC,
  type InputHTMLAttributes,
  type ReactNode,
  useId,
} from 'react';

const cnInput = cn('Input');

export type HTMLInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'onChange' | 'readOnly' | 'value'
>;

interface InputProps extends HTMLInputProps {
  value: number | string;
  addonLeft?: ReactNode;
  addonRight?: ReactNode;
  className?: string;
  error?: string;
  fullWidth?: boolean;
  label?: string;
  readOnly?: boolean;
  onChange?: (value: number | string) => void;
}

export const Input: FC<InputProps> = (props) => {
  const {
    addonLeft,
    addonRight,
    className,
    disabled,
    error,
    fullWidth,
    label,
    name,
    onChange,
    required,
    type = 'text',
    value,
    ...restProps
  } = props;

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    onChange?.(e.target.value);
  };

  const id = useId();

  return (
    <VStack
      className={cnInput(
        { disabled: disabled, error: !!error, fullWidth: fullWidth },
        [className],
      )}
      gap={'8'}
    >
      {label && (
        <label className={cnInput('Label')} htmlFor={id}>
          <Typography size={'xs'} variant={'dark'} weight={'medium'}>
            {label} {required ? ' *' : ''}
          </Typography>
        </label>
      )}
      <div className={cnInput('Inner', { fullWidth: fullWidth })}>
        {addonLeft && <div className={cnInput('AddonLeft')}>{addonLeft}</div>}
        <input
          {...restProps}
          className={cnInput('Input', {
            error: !!error,
            fullWidth: fullWidth,
            hasValue: !!value,
            pl: !!addonLeft,
            pr: !!addonRight,
          })}
          disabled={disabled}
          id={id}
          name={name}
          onChange={handleChange}
          type={type}
          value={value}
        />
        {addonRight && (
          <div className={cnInput('AddonRight')}>{addonRight}</div>
        )}
      </div>

      {error && <Typography variant={'warn'}>{error}</Typography>}
    </VStack>
  );
};
