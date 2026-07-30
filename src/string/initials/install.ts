import { initials } from './index.js';
export type * from './types';

if (!String.prototype.initials) {
  Object.defineProperty(String.prototype, 'initials', {
    value(this: string) {
      return initials(this);
    },
    writable: true,
    configurable: true,
  });
}
