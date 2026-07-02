import { memoize } from './index';
import './types';

export function installMemoize() {
  if (!Function.memoize) {
    Object.defineProperty(Function, 'memoize', {
      value: memoize,
      writable: true,
      configurable: true,
    });
  }
}
