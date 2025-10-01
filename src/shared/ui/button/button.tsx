import './button.scss';

import { cn } from '@bem-react/classname';
import { type ButtonHTMLAttributes, type FC } from 'react';

const cnButton = cn('Button');

type ButtonVariantsType =
  | 'accent'
  | 'clear'
  | 'light'
  | 'primary'
  | 'secondary';

export type ButtonProps = {
  className?: string;
  disabled?: boolean;
  fullWidth?: boolean;
  isLoading?: boolean;
  variant?: ButtonVariantsType;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button: FC<ButtonProps> = (props) => {
  const {
    children,
    className,
    disabled,
    fullWidth,
    isLoading,
    type = 'button',
    variant = 'primary',
    ...otherProps
  } = props;

  const mods = {
    disabled: disabled,
    fullWidth: fullWidth,
    loading: isLoading,
    variant: variant,
  };

  return (
    <button
      {...otherProps}
      className={cnButton(mods, [className])}
      disabled={disabled}
      type={type}
    >
      <span className={cnButton('Content')}>{children}</span>
      {isLoading && <span className={cnButton('Spinner')} />}
    </button>
  );
};
