import { isPromise } from './index.js';
export type * from './types';

if (!Function.isPromise) {
  Object.defineProperty(Function, 'isPromise', {
    value: isPromise,
    writable: true,
    configurable: true,
  });
}
