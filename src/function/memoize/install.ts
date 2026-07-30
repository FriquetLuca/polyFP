import { memoize } from './index.js';
export type * from './types';

if (!Function.memoize) {
  Object.defineProperty(Function, 'memoize', {
    value: memoize,
    writable: true,
    configurable: true,
  });
}
