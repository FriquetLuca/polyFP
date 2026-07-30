import { pipe } from './index.js';
export type * from './types';

if (!Function.pipe) {
  Object.defineProperty(Function, 'pipe', {
    value: pipe,
    writable: true,
    configurable: true,
  });
}
