import { invert } from './index.js';
export type * from './types';

if (!Object.invert) {
  Object.defineProperty(Object, 'invert', {
    value: invert,
    writable: true,
    configurable: true,
  });
}
