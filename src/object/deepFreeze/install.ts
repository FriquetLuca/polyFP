import { deepFreeze } from './index';
import './types';

export function installDeepFreeze() {
  if (!Object.deepFreeze) {
    Object.defineProperty(Object, 'deepFreeze', {
      value: deepFreeze,
      writable: true,
      configurable: true,
    });
  }
}
