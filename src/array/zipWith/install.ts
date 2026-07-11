import { zipWith } from './index';
export * from './types';

if (!Array.prototype.zipWith) {
  Object.defineProperty(Array.prototype, 'zipWith', {
    value<A, B, R>(a: A[], b: B[], fn: (a: A, b: B, index: number) => R): R[] {
      return zipWith(a, b, fn);
    },
    writable: true,
    configurable: true,
  });
}
