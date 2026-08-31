import { extendPrototype } from '../../utils.js';
import { quantile } from './index.js';
export type * from './types';

extendPrototype(Array.prototype, {
  quantile(this: number[], q: number) {
    return quantile(this, q);
  },
});
