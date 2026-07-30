import { shallowClone } from './index.js';
export type * from './types';

if (!Object.shallowClone) {
  Object.defineProperty(Object, 'shallowClone', {
    value: shallowClone,
    writable: true,
    configurable: true,
  });
}
