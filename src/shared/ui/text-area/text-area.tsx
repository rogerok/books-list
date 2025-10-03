import './TextArea.scss';

import { cn } from '@bem-react/classname';
import { Typography } from '@shared/ui/typography/typography';
import { VStack } from '@shared/ui/vstack/vstack';
import {
  type ChangeEvent,
  type FC,
  type TextareaHTMLAttributes,
  useId,
} from 'react';

const cnTextArea = cn('TextArea');

export type HTMLTextAreaProps = Omit<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  'onChange' | 'readOnly' | 'value'
>;

interface TextAreaProps extends HTMLTextAreaProps {
  value: number | string;
  className?: string;
  error?: string;
  fullWidth?: boolean;
  label?: string;
  readOnly?: boolean;
  onChange?: (value: number | string) => void;
}

export const TextArea: FC<TextAreaProps> = (props) => {
  const {
    className,
    disabled,
    error,
    fullWidth,
    label,
    name,
    onChange,
    required,
    value,
    ...restProps
  } = props;

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>): void => {
    onChange?.(e.target.value);
  };

  const id = useId();

  return (
    <VStack
      className={cnTextArea(
        { disabled: disabled, error: !!error, fullWidth: fullWidth },
        [className],
      )}
      gap={'8'}
    >
      {label && (
        <label className={cnTextArea('Label')} htmlFor={id}>
          <Typography
            className={cnTextArea('LabelText')}
            size={'xs'}
            variant={'dark'}
            weight={'medium'}
          >
            {label} {required ? ' *' : ''}
          </Typography>
        </label>
      )}
      <div className={cnTextArea('Inner', { fullWidth: fullWidth })}>
        <textarea
          {...restProps}
          className={cnTextArea('TextArea', {
            error: !!error,
            fullWidth: fullWidth,
            hasValue: !!value,
          })}
          disabled={disabled}
          id={id}
          name={name}
          onChange={handleChange}
          value={value}
        />
      </div>

      {error && <Typography variant={'warn'}>{error}</Typography>}
    </VStack>
  );
};
