import { cn } from './index.js';
export type * from './types';

if (!Array.prototype.cn) {
  Object.defineProperty(Array.prototype, 'cn', {
    value<T extends string | null | undefined>(this: T[]): string {
      return cn(...this);
    },
    writable: true,
    configurable: true,
  });
}
