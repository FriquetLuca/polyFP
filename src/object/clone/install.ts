import { clone } from './index.js';
export type * from './types';

if (!Object.clone) {
  Object.defineProperty(Object, 'clone', {
    value: clone,
    writable: true,
    configurable: true,
  });
}
