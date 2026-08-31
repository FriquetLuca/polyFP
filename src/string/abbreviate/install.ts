import { extendPrototype } from '../../utils.js';
import { abbreviate } from './index.js';
export type * from './types';

extendPrototype(String.prototype, {
  abbreviate(this, maxLength: number, exactLength?: boolean) {
    return abbreviate(this as string, maxLength, exactLength);
  },
});
