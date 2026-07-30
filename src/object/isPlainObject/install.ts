import { isPlainObject } from './index.js';
export type * from './types';

if (!Object.isPlainObject) {
  Object.defineProperty(Object, 'isPlainObject', {
    value: isPlainObject,
    writable: true,
    configurable: true,
  });
}
