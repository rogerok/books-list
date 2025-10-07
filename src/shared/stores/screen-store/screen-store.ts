import type { ObjectValues } from '@shared/utils/ts-utils/ts-utils.ts';

import { makeAutoObservable } from 'mobx';

const BreakpointsInPxConstant = {
  Lg: 1024,
  Md: 768,
  Sm: 480,
  Xl: 1200,
  Xs: 0,
} as const;

export type BreakpointsInPxType = ObjectValues<typeof BreakpointsInPxConstant>;

export class ScreenStore {
  currentWidth: number = window.innerWidth;
  private resizeRaf?: number;

  constructor() {
    makeAutoObservable(this);
    window.addEventListener('resize', this.handleResize);
  }

  destroy() {
    window.removeEventListener('resize', this.handleResize);
  }

  get downLg(): boolean {
    return this.isWidthMatchMaxByValue(BreakpointsInPxConstant.Lg);
  }

  get downMd(): boolean {
    return this.isWidthMatchMaxByValue(BreakpointsInPxConstant.Md);
  }

  get downSm(): boolean {
    return this.isWidthMatchMaxByValue(BreakpointsInPxConstant.Sm);
  }

  get downXl(): boolean {
    return this.isWidthMatchMaxByValue(BreakpointsInPxConstant.Xl);
  }

  get upLg(): boolean {
    return this.isWidthMatchMinByValue(BreakpointsInPxConstant.Lg);
  }

  get upMd(): boolean {
    return this.isWidthMatchMinByValue(BreakpointsInPxConstant.Md);
  }

  get upSm(): boolean {
    return this.isWidthMatchMinByValue(BreakpointsInPxConstant.Sm);
  }

  get upXl(): boolean {
    return this.isWidthMatchMinByValue(BreakpointsInPxConstant.Xl);
  }

  get upXs(): boolean {
    return this.isWidthMatchMinByValue(BreakpointsInPxConstant.Xs);
  }

  handleResize = (): void => {
    cancelAnimationFrame(this.resizeRaf!);
    this.resizeRaf = requestAnimationFrame(() => {
      this.currentWidth = window.innerWidth;
    });
  };

  isWidthMatchMaxByValue = (value: BreakpointsInPxType): boolean => {
    return this.currentWidth <= value;
  };

  isWidthMatchMinByValue = (value: BreakpointsInPxType): boolean => {
    return this.currentWidth >= value;
  };
}
