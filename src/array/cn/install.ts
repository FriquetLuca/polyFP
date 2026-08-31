import { extendPrototype } from '../../utils.js';
import { cn } from './index.js';
export type * from './types';

extendPrototype(Array.prototype, {
  cn<T extends string | null | undefined>(this: T[]): string {
    return cn(...this);
  },
});
