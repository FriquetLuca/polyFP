import { unary } from './index.js';
export type * from './types';

if (!Function.unary) {
  Object.defineProperty(Function, 'unary', {
    value: unary,
    writable: true,
    configurable: true,
  });
}
