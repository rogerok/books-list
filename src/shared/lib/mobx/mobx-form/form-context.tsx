import type { AnyForm } from '@shared/lib/mobx/mobx-form/types';

import { createContext } from 'react';

export const FormContext = createContext<AnyForm | null>(null);
