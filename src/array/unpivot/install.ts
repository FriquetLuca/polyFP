import { extendPrototype } from '../../utils.js';
import { unpivot } from './index.js';
export type * from './types';

extendPrototype(Array.prototype, {
  unpivot<T extends object, I extends keyof T, V extends keyof T>(
    this: T[],
    idFields: I[],
    valueFields: V[]
  ) {
    return unpivot(this, idFields, valueFields);
  },
});
