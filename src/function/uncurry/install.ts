import { uncurry } from './index.js';
export type * from './types';

if (!Function.uncurry) {
  Object.defineProperty(Function, 'uncurry', {
    value: uncurry,
    writable: true,
    configurable: true,
  });
}
