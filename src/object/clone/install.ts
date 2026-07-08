import { clone } from './index';
import './types';

export function installClone() {
  if (!Object.clone) {
    Object.defineProperty(Object, 'clone', {
      value: clone,
      writable: true,
      configurable: true,
    });
  }
}
