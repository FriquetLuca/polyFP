import { kebabCase } from './index.js';
export type * from './types';

if (!String.prototype.kebabCase) {
  Object.defineProperty(String.prototype, 'kebabCase', {
    value(this: string) {
      return kebabCase(this);
    },
    writable: true,
    configurable: true,
  });
}
