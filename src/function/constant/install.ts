import { constant } from './index.js';
export type * from './types';

if (!Function.constant) {
  Object.defineProperty(Function, 'constant', {
    value: constant,
    writable: true,
    configurable: true,
  });
}
