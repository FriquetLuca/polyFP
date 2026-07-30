import { getHash } from './index.js';
export type * from './types';

if (!Object.getHash) {
  Object.defineProperty(Object, 'getHash', {
    value: getHash,
    writable: true,
    configurable: true,
  });
}
