import { renameKeys } from './index.js';
export type * from './types';

if (!Object.renameKeys) {
  Object.defineProperty(Object, 'renameKeys', {
    value: renameKeys,
    writable: true,
    configurable: true,
  });
}
