import { extendPrototype } from '../../utils.js';
import { titleCase } from './index.js';
export type * from './types';

extendPrototype(String.prototype, {
  titleCase(this) {
    return titleCase(this as string);
  },
});
