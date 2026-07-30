import { all } from './index.js';
export type * from './types';

if (!Function.all) {
  Object.defineProperty(Function, 'all', {
    value: all,
    writable: true,
    configurable: true,
  });
}
