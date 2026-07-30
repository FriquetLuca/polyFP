import { isEqual } from './index.js';
export type * from './types';

if (!Object.isEqual) {
  Object.defineProperty(Object, 'isEqual', {
    value: isEqual,
    writable: true,
    configurable: true,
  });
}
