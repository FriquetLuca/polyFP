import { titleCase } from './index.js';
export type * from './types';

if (!String.prototype.titleCase) {
  Object.defineProperty(String.prototype, 'titleCase', {
    value(this: string) {
      return titleCase(this);
    },
    writable: true,
    configurable: true,
  });
}
