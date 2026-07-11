import { trainCase } from './index';
import './types';

export function installTrainCase() {
  if (!String.prototype.trainCase) {
    Object.defineProperty(String.prototype, 'trainCase', {
      value(this: string) {
        return trainCase(this);
      },
      writable: true,
      configurable: true,
    });
  }
}
