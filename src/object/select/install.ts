import { select } from './index.js';
export type * from './types';

if (!Object.select) {
  Object.defineProperty(Object, 'select', {
    value: select,
    writable: true,
    configurable: true,
  });
}
