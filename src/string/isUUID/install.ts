import { extendPrototype } from '../../utils.js';
import { isUUID } from './index.js';
export type * from './types';

extendPrototype(String.prototype, {
  isUUID(this, version?: number | undefined) {
    return isUUID(this as string, version);
  },
});
