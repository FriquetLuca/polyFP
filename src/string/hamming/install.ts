import { hamming } from './index';
import './types';

if (!String.prototype.hamming) {
  Object.defineProperty(String.prototype, 'hamming', {
    value(this: string, b: string) {
      return hamming(this, b);
    },
    writable: true,
    configurable: true,
  });
}
