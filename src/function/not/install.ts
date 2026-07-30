import { not } from './index.js';
export type * from './types';

if (!Function.not) {
  Object.defineProperty(Function, 'not', {
    value: not,
    writable: true,
    configurable: true,
  });
}
