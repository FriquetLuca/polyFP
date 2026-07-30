import { retry } from './index.js';
export type * from './types';

if (!Function.retry) {
  Object.defineProperty(Function, 'retry', {
    value: retry,
    writable: true,
    configurable: true,
  });
}
