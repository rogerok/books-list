import { isObject } from '@shared/utils/ts-utils/ts-utils.ts';
import { action, makeObservable, observable } from 'mobx';

type AnyObject = Record<keyof any, any>;

export class DeepObservableStruct<TData extends AnyObject> {
  data: TData;

  constructor(data: TData) {
    this.data = data;

    makeObservable(this, {
      data: observable.deep,
      set: action,
    });
  }

  set(newData: Partial<TData>): void {
    type StackItem = [key: string, currObservable: AnyObject, new: AnyObject];

    const stack: StackItem[] = Object.keys(this.data).map((key) => [
      key,
      this.data,
      newData,
    ]);

    let currentIndex = 0;
    let stackLength = stack.length;

    while (currentIndex < stackLength) {
      const [key, currObservableData, newData] = stack[currentIndex];
      const newValue = newData[key];
      const currValue = currObservableData[key];

      currentIndex++;

      if (key in newData) {
        if (isObject(newValue) && isObject(currValue)) {
          const newValueKeys = Object.keys(newValue);

          Object.keys(currValue).forEach((childKey) => {
            if (!(childKey in newValue)) {
              delete currObservableData[key][childKey];
            }
          });

          newValueKeys.forEach((childKey) => {
            const length = stack.push([
              childKey,
              currObservableData[key],
              newValue,
            ]);
            stackLength = length;
          });
        } else if (newValue !== currValue) {
          currObservableData[key] = newValue;
        }
      } else {
        delete currObservableData[key];
      }
    }

    Object.keys(newData).forEach((newDataKey) => {
      if (!this.data[newDataKey]) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        this.data[newDataKey] = newData[newDataKey];
      }
    });
  }
}
