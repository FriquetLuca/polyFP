import { atMostOne } from './index.js';
export type * from './types';

if (!Function.atMostOne) {
  Object.defineProperty(Function, 'atMostOne', {
    value: atMostOne,
    writable: true,
    configurable: true,
  });
}
