import { isFunction } from './index.js';
export type * from './types';

if (!Function.isFunction) {
  Object.defineProperty(Function, 'isFunction', {
    value: isFunction,
    writable: true,
    configurable: true,
  });
}
