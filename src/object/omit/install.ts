import { omit } from './index.js';
export type * from './types';

if (!Object.omit) {
  Object.defineProperty(Object, 'omit', {
    value: omit,
    writable: true,
    configurable: true,
  });
}
