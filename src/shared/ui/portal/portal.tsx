import type { FC, ReactNode, ReactPortal } from 'react';

import { createPortal } from 'react-dom';

export interface PortalProps {
  children: ReactNode;
  className?: string;
  container?: DocumentFragment | Element;
}

export const Portal: FC<PortalProps> = (props): ReactPortal => {
  const { children, container = document.body } = props;

  return createPortal(children, container);
};
