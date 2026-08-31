import { aggregate } from './index.js';
import type { AggregateBuilder } from '../../types';
import { extendPrototype } from '../../utils.js';
export type * from './types';

extendPrototype(Array.prototype, {
  aggregate<T>(this: T[]): AggregateBuilder<T> {
    return aggregate(this);
  },
});
