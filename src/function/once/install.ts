import { once } from './index.js';
export type * from './types';

if (!Function.once) {
  Object.defineProperty(Function, 'once', {
    value: once,
    writable: true,
    configurable: true,
  });
}
