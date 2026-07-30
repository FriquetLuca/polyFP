import { jaro } from './index.js';
export type * from './types';

if (!String.prototype.jaro) {
  Object.defineProperty(String.prototype, 'jaro', {
    value(this: string, b: string) {
      return jaro(this, b);
    },
    writable: true,
    configurable: true,
  });
}
