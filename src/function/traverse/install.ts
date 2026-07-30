import { traverse } from './index.js';
export type * from './types';

if (!Function.traverse) {
  Object.defineProperty(Function, 'traverse', {
    value: traverse,
    writable: true,
    configurable: true,
  });
}
