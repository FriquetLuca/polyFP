import { after } from './index.js';
export type * from './types';

if (!Function.after) {
  Object.defineProperty(Function, 'after', {
    value: after,
    writable: true,
    configurable: true,
  });
}
