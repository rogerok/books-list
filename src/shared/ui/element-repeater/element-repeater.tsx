import { cloneElement, type FC, isValidElement, type ReactNode } from 'react';

interface ElementRepeaterProps {
  children: ReactNode;
  count: number;
}

export const ElementRepeater: FC<ElementRepeaterProps> = (props) => {
  const { children, count } = props;

  return (
    isValidElement(children) && (
      <>
        {Array.from({ length: count }, (_, index) =>
          cloneElement(children, {
            key: index,
          }),
        )}
      </>
    )
  );
};
