import './button.scss';

import { cn } from '@bem-react/classname';
import { type ButtonHTMLAttributes, type FC, memo } from 'react';

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
  variant?: ButtonVariantsType;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button: FC<ButtonProps> = memo((props) => {
  const {
    className,
    disabled,
    fullWidth,
    type = 'button',
    variant = 'primary',
    ...otherProps
  } = props;

  const mods = {
    disabled: disabled,
    fullWidth: fullWidth,
    variant: variant,
  };

  return (
    <button
      {...otherProps}
      className={cnButton(mods, [className])}
      disabled={disabled}
      type={type}
    >
      {props.children}
    </button>
  );
});
