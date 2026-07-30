import { curry } from './index.js';
export type * from './types';

if (!Function.curry) {
  Object.defineProperty(Function, 'curry', {
    value: curry,
    writable: true,
    configurable: true,
  });
}
