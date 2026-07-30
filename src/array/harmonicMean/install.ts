import { harmonicMean } from './index.js';
export type * from './types';

if (!Array.prototype.harmonicMean) {
  Object.defineProperty(Array.prototype, 'harmonicMean', {
    value<T>(this: T[], fn: (val: T) => number): number {
      return harmonicMean(this, fn);
    },
    writable: true,
    configurable: true,
  });
}
