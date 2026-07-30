import { isPromiseLike } from './index.js';
export type * from './types';

if (!Function.isPromiseLike) {
  Object.defineProperty(Function, 'isPromiseLike', {
    value: isPromiseLike,
    writable: true,
    configurable: true,
  });
}
