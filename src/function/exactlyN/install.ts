import { exactlyN } from './index.js';
export type * from './types';

if (!Function.exactlyN) {
  Object.defineProperty(Function, 'exactlyN', {
    value: exactlyN,
    writable: true,
    configurable: true,
  });
}
