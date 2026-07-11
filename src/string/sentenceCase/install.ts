import { sentenceCase } from './index';
import './types';

export function installSentenceCase() {
  if (!String.prototype.sentenceCase) {
    Object.defineProperty(String.prototype, 'sentenceCase', {
      value(this: string) {
        return sentenceCase(this);
      },
      writable: true,
      configurable: true,
    });
  }
}
