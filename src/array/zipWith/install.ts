import { extendPrototype } from '../../utils.js';
import { zipWith } from './index.js';
export type * from './types';

extendPrototype(Array.prototype, {
  zipWith<A, B, R>(a: A[], b: B[], fn: (a: A, b: B, index: number) => R): R[] {
    return zipWith(a, b, fn);
  },
});
