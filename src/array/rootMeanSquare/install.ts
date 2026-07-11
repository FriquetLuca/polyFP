import { rootMeanSquare } from './index';
export * from './types';

if (!Array.prototype.rootMeanSquare) {
  Object.defineProperty(Array.prototype, 'rootMeanSquare', {
    value<T>(this: T[], fn: (val: T) => number): number {
      return rootMeanSquare(this, fn);
    },
    writable: true,
    configurable: true,
  });
}
