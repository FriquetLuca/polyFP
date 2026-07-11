import { lowerFirst } from './index';
import './types';

export function installLowerFirst() {
  if (!String.prototype.lowerFirst) {
    Object.defineProperty(String.prototype, 'lowerFirst', {
      value(this: string) {
        return lowerFirst(this);
      },
      writable: true,
      configurable: true,
    });
  }
}
