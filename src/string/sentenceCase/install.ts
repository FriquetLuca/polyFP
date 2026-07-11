import { sentenceCase } from './index';
import './types';

if (!String.prototype.sentenceCase) {
  Object.defineProperty(String.prototype, 'sentenceCase', {
    value(this: string) {
      return sentenceCase(this);
    },
    writable: true,
    configurable: true,
  });
}
