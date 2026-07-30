import { and } from './index.js';
export type * from './types';

if (!Function.and) {
  Object.defineProperty(Function, 'and', {
    value: and,
    writable: true,
    configurable: true,
  });
}
