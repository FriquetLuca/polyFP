import { extendPrototype } from '../../utils.js';
import { escape } from './index.js';
export type * from './types';

extendPrototype(String.prototype, {
  escape(this) {
    return escape(this as string);
  },
});
