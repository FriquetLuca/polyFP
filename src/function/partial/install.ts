import { partial } from './index.js';
export type * from './types';

if (!Function.partial) {
  Object.defineProperty(Function, 'partial', {
    value: partial,
    writable: true,
    configurable: true,
  });
}
