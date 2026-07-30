import { moduleCase } from './index.js';
export type * from './types';

if (!String.prototype.moduleCase) {
  Object.defineProperty(String.prototype, 'moduleCase', {
    value(this: string) {
      return moduleCase(this);
    },
    writable: true,
    configurable: true,
  });
}
