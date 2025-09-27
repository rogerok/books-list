import './app-link.scss';

import { cn } from '@bem-react/classname';
import { createLink, type LinkComponent } from '@tanstack/react-router';
import { type AnchorHTMLAttributes, forwardRef, type ReactNode } from 'react';

const cnAppLink = cn('AppLink');
type AppLinkVariant = 'primary' | 'secondary';

interface AppLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children: ReactNode;
  className?: string;
  variant?: AppLinkVariant;
}

const Link = forwardRef<HTMLAnchorElement, AppLinkProps>((props, ref) => {
  const { className, variant = 'primary' } = props;

  return (
    <a
      {...props}
      className={cnAppLink({ [variant]: true }, [className])}
      ref={ref}
    />
  );
});

const CreatedLink = createLink(Link);

export const AppLink: LinkComponent<typeof Link> = (props) => {
  return <CreatedLink {...props} />;
};
