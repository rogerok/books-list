import { Flex, type FlexProps } from '@shared/ui/flex/flex';
import { type ElementType, type ReactElement } from 'react';

type HStackProps<T extends ElementType = 'div'> = FlexProps<T>;

export const HStack = <T extends ElementType = 'div'>(
  props: HStackProps<T>,
): ReactElement => {
  return <Flex {...props} direction={'row'} />;
};
