import { extendPrototype } from '../../utils.js';
import { countBy } from './index.js';
export type * from './types';

extendPrototype(Array.prototype, {
  countBy<T, K extends PropertyKey>(
    this: T[],
    selector: (item: T) => K
  ): Record<K, number> {
    return countBy(this, selector);
  },
});
