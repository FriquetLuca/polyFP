import { extendPrototype } from '../../utils.js';
import { textPosition } from './index.js';
export type * from './types';

extendPrototype(String.prototype, {
  textPosition(this, specifiedIndex: number | undefined = undefined) {
    return textPosition(this as string, specifiedIndex);
  },
});
