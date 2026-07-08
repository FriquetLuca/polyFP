import { invert } from './index';
import './types';

export function installInvert() {
  if (!Object.invert) {
    Object.defineProperty(Object, 'invert', {
      value: invert,
      writable: true,
      configurable: true,
    });
  }
}
