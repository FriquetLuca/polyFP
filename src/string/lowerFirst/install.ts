import { lowerFirst } from './index.js';
export type * from './types';

if (!String.prototype.lowerFirst) {
  Object.defineProperty(String.prototype, 'lowerFirst', {
    value(this: string) {
      return lowerFirst(this);
    },
    writable: true,
    configurable: true,
  });
}
