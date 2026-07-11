import { upperFirst } from './index';
import './types';

export function installUpperFirst() {
  if (!String.prototype.upperFirst) {
    Object.defineProperty(String.prototype, 'upperFirst', {
      value(this: string) {
        return upperFirst(this);
      },
      writable: true,
      configurable: true,
    });
  }
}
