import { camelCase } from './index.js';
export type * from './types';

if (!String.prototype.camelCase) {
  Object.defineProperty(String.prototype, 'camelCase', {
    value(this: string) {
      return camelCase(this);
    },
    writable: true,
    configurable: true,
  });
}
