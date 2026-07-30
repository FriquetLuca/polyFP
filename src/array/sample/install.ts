import type { Option } from '../../data/option';
import { sample } from './index.js';
export type * from './types';

if (!Array.prototype.sample) {
  Object.defineProperty(Array.prototype, 'sample', {
    value<T>(this: T[]): Option<T> {
      return sample(this);
    },
    writable: true,
    configurable: true,
  });
}
