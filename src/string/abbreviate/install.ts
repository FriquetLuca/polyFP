import { abbreviate } from './index.js';
export type * from './types';

if (!String.prototype.abbreviate) {
  Object.defineProperty(String.prototype, 'abbreviate', {
    value(this: string, maxLength: number, exactLength?: boolean) {
      return abbreviate(this, maxLength, exactLength);
    },
    writable: true,
    configurable: true,
  });
}
