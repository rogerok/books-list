import type { ElementType, ReactElement } from 'react';

import { Flex, type FlexProps } from '@shared/ui/flex/flex';

type VStackProps<T extends ElementType = 'div'> = FlexProps<T>;

export const VStack = <T extends ElementType = 'div'>(
  props: VStackProps<T>,
): ReactElement => {
  return <Flex {...props} direction={'column'} />;
};
