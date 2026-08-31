import { extendPrototype } from '../../utils.js';
import { truncate } from './index.js';
export type * from './types';

extendPrototype(String.prototype, {
  truncate(this, maxLength: number, suffix: string = '…'): string {
    return truncate(this as string, maxLength, suffix);
  },
});
