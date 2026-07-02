import { isClass } from './index';
import './types';

export function installIsClass() {
  if (!Object.isClass) {
    Object.defineProperty(Object, 'isClass', {
      value: isClass,
      writable: true,
      configurable: true,
    });
  }
}
