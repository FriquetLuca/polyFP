import { exactlyOne } from './index.js';
export type * from './types';

if (!Function.exactlyOne) {
  Object.defineProperty(Function, 'exactlyOne', {
    value: exactlyOne,
    writable: true,
    configurable: true,
  });
}
