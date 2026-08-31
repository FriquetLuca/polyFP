import { extendPrototype } from '../../utils.js';
import { jaroWinkler } from './index.js';
export type * from './types';

extendPrototype(String.prototype, {
  jaroWinkler(this, b: string) {
    return jaroWinkler(this as string, b);
  },
});
