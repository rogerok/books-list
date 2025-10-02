import type { RoutesValues } from '@shared/config/router/routes.ts';

import { useMatchRoute } from '@tanstack/react-router';
import { titlesMap } from '@widgets/header/constants/constants.ts';

export const useHeaderTitle = (): string | undefined => {
  const matchRoute = useMatchRoute();

  for (const path in titlesMap) {
    if (matchRoute({ to: path })) {
      return titlesMap[path as RoutesValues];
    }
  }
  return undefined;
};
