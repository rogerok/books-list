import type { ScreenStore } from '@shared/stores/screen-store/screen-store.ts';

import { BooleanToggleStore } from '@shared/lib/toggle-boolean-store/booleanToggleStore.ts';
import { makeAutoObservable } from 'mobx';

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
  }

  close() {
    this.booleanToggle.setValue(false);
  }

  closeOnDownMdScreen() {
    if (this.screen.downMd) {
      this.close();
    }
  }

  open() {
    this.booleanToggle.setTrue();
  }

  get isOpen() {
    return this.booleanToggle.value;
  }
}
