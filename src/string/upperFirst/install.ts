import { upperFirst } from './index.js';
export type * from './types';

if (!String.prototype.upperFirst) {
  Object.defineProperty(String.prototype, 'upperFirst', {
    value(this: string) {
      return upperFirst(this);
    },
    writable: true,
    configurable: true,
  });
}
