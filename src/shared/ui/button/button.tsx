import './button.scss';

import { cn } from '@bem-react/classname';
import { type ButtonHTMLAttributes, type FC, type ReactNode } from 'react';

const cnButton = cn('Button');

type ButtonVariantsType =
  | 'accent'
  | 'clear'
  | 'dark'
  | 'light'
  | 'outline'
  | 'primary'
  | 'secondary';

export type ButtonProps = {
  addonLeft?: ReactNode;
  addonRight?: ReactNode;
  className?: string;
  disabled?: boolean;
  fullWidth?: boolean;
  isLoading?: boolean;
  variant?: ButtonVariantsType;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button: FC<ButtonProps> = (props) => {
  const {
    addonLeft,
    addonRight,
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
      <p className={cnButton('Content')}>
        {addonLeft && (
          <span className={cnButton('AddonLeft')}>{addonLeft}</span>
        )}

        <span>{children}</span>
        {addonRight && (
          <span className={cnButton('AddonRight')}>{addonRight}</span>
        )}
        {isLoading && <span className={cnButton('Spinner')} />}
      </p>
    </button>
  );
};
