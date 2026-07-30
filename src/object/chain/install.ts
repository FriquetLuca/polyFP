import { chain } from './index.js';
export type * from './types';

if (!Object.chain) {
  Object.defineProperty(Object, 'chain', {
    value: chain,
    writable: true,
    configurable: true,
  });
}
