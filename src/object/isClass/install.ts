import { isClass } from './index.js';
export type * from './types';

if (!Object.isClass) {
  Object.defineProperty(Object, 'isClass', {
    value: isClass,
    writable: true,
    configurable: true,
  });
}
