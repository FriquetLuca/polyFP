import { pick } from './index.js';
export type * from './types';

if (!Object.pick) {
  Object.defineProperty(Object, 'pick', {
    value: pick,
    writable: true,
    configurable: true,
  });
}
