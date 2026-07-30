import { parallel } from './index.js';
export type * from './types';

if (!Function.parallel) {
  Object.defineProperty(Function, 'parallel', {
    value: parallel,
    writable: true,
    configurable: true,
  });
}
