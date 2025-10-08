import type { ScreenStore } from '@shared/stores/screen-store/screen-store.ts';
import type { ObjectValues } from '@shared/utils/ts-utils/ts-utils.ts';

import { BooleanToggleStore } from '@shared/lib/toggle-boolean-store/booleanToggleStore.ts';
import { makeAutoObservable } from 'mobx';

const OverflowBodyConstant = {
  auto: 'auto',
  hidden: 'hidden',
} as const;

type OverflowBodyValues = ObjectValues<typeof OverflowBodyConstant>;

export class NavbarStore {
  booleanToggle = new BooleanToggleStore(false);

  constructor(private screen: ScreenStore) {
    makeAutoObservable(
      this,
      {},
      {
        autoBind: true,
      },
    );
    window.addEventListener('resize', this.handleResize);
  }

  close() {
    this.booleanToggle.setValue(false);
    this.setBodyOverflow(OverflowBodyConstant.auto);
  }

  closeOnDownMdScreen() {
    if (this.screen.downMd) {
      this.close();
    }
  }

  open() {
    this.booleanToggle.setTrue();

    this.setBodyOverflow(OverflowBodyConstant.hidden);
  }

  get isOpen() {
    return this.booleanToggle.value;
  }

  handleResize = (): void => {
    if (this.screen.downMd) {
      this.booleanToggle.setFalse();
    }
  };

  setBodyOverflow = (overflow: OverflowBodyValues) => {
    document.body.style = overflow;
  };
}
