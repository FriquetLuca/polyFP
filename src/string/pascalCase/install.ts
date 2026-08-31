import { extendPrototype } from '../../utils.js';
import { pascalCase } from './index.js';
export type * from './types';

extendPrototype(String.prototype, {
  pascalCase(this) {
    return pascalCase(this as string);
  },
});
