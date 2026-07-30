import { deepFreeze } from './index.js';
export type * from './types';

if (!Object.deepFreeze) {
  Object.defineProperty(Object, 'deepFreeze', {
    value: deepFreeze,
    writable: true,
    configurable: true,
  });
}
