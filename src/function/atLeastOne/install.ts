import { atLeastOne } from './index.js';
export type * from './types';

if (!Function.atLeastOne) {
  Object.defineProperty(Function, 'atLeastOne', {
    value: atLeastOne,
    writable: true,
    configurable: true,
  });
}
