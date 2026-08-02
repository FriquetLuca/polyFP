import { before } from './index.js';
export type * from './types';

if (!Function.before) {
  Object.defineProperty(Function, 'before', {
    value: before,
    writable: true,
    configurable: true,
  });
}
