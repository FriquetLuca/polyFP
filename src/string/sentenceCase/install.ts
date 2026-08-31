import { extendPrototype } from '../../utils.js';
import { sentenceCase } from './index.js';
export type * from './types';

extendPrototype(String.prototype, {
  sentenceCase(this) {
    return sentenceCase(this as string);
  },
});
