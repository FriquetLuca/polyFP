import { extendPrototype } from '../../utils.js';
import { window } from './index.js';
export type * from './types';

extendPrototype(Array.prototype, {
  window<T>(this: T[], size: number): T[][] {
    return window(this, size);
  },
});
