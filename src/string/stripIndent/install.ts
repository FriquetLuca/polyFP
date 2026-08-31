import { extendPrototype } from '../../utils.js';
import { stripIndent } from './index.js';
export type * from './types';

extendPrototype(String.prototype, {
  stripIndent(this) {
    return stripIndent(this as string);
  },
});
