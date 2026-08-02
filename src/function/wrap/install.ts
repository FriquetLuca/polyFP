import { wrap } from './index.js';
export type * from './types';

if (!Function.unary) {
  Object.defineProperty(Function, 'wrap', {
    value: wrap,
    writable: true,
    configurable: true,
  });
}
