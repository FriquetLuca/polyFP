import { aggregate } from './index';
import type { AggregateBuilder } from '../../types';

export * from './types';

export function installAggregate() {
  if (!Array.prototype.aggregate) {
    Object.defineProperty(Array.prototype, 'aggregate', {
      value<T>(this: T[]): AggregateBuilder<T> {
        return aggregate(this);
      },
      writable: true,
      configurable: true,
    });
  }
}
