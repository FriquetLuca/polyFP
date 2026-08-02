import { escape } from './index.js';
export type * from './types';

if (!String.prototype.escape) {
  Object.defineProperty(String.prototype, 'escape', {
    value(this: string) {
      return escape(this);
    },
    writable: true,
    configurable: true,
  });
}
