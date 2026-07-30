import { deepUnfreeze } from './index.js';
export type * from './types';

if (!Object.deepUnfreeze) {
  Object.defineProperty(Object, 'deepUnfreeze', {
    value: deepUnfreeze,
    writable: true,
    configurable: true,
  });
}
