import { aggregate } from './index.js';
import type { AggregateBuilder } from '../../types';

export type * from './types';

if (!Array.prototype.aggregate) {
  Object.defineProperty(Array.prototype, 'aggregate', {
    value<T>(this: T[]): AggregateBuilder<T> {
      return aggregate(this);
    },
    writable: true,
    configurable: true,
  });
}
