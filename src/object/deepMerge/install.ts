import { deepMerge } from './index.js';
export type * from './types';

if (!Object.deepMerge) {
  Object.defineProperty(Object, 'deepMerge', {
    value: deepMerge,
    writable: true,
    configurable: true,
  });
}
