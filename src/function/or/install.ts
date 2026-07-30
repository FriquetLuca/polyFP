import { or } from './index.js';
export type * from './types';

if (!Function.or) {
  Object.defineProperty(Function, 'or', {
    value: or,
    writable: true,
    configurable: true,
  });
}
