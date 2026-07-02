import { deepUnfreeze } from './index';
import './types';

export function installDeepUnfreeze() {
  if (!Object.deepUnfreeze) {
    Object.defineProperty(Object, 'deepUnfreeze', {
      value: deepUnfreeze,
      writable: true,
      configurable: true,
    });
  }
}
