import { trainCase } from './index.js';
export type * from './types';

if (!String.prototype.trainCase) {
  Object.defineProperty(String.prototype, 'trainCase', {
    value(this: string) {
      return trainCase(this);
    },
    writable: true,
    configurable: true,
  });
}
