import { jaro } from './index';
import './types';

if (!String.prototype.jaro) {
  Object.defineProperty(String.prototype, 'jaro', {
    value(this: string, b: string) {
      return jaro(this, b);
    },
    writable: true,
    configurable: true,
  });
}
