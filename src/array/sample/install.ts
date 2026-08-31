import type { Option } from '../../data/option';
import { extendPrototype } from '../../utils.js';
import { sample } from './index.js';
export type * from './types';

extendPrototype(Array.prototype, {
  sample<T>(this: T[]): Option<T> {
    return sample(this);
  },
});
