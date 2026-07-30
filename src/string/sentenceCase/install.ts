import { sentenceCase } from './index.js';
export type * from './types';

if (!String.prototype.sentenceCase) {
  Object.defineProperty(String.prototype, 'sentenceCase', {
    value(this: string) {
      return sentenceCase(this);
    },
    writable: true,
    configurable: true,
  });
}
