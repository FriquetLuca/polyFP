import { extendPrototype } from '../../utils.js';
import { isDuration } from './index.js';
export type * from './types';

extendPrototype(String.prototype, {
  isDuration(this, useExtended?: boolean) {
    return isDuration(this as string, useExtended);
  },
});
