import { deepMerge } from './index';
import './types';

export function installDeepMerge() {
  if (!Object.deepMerge) {
    Object.defineProperty(Object, 'deepMerge', {
      value: deepMerge,
      writable: true,
      configurable: true,
    });
  }
}
