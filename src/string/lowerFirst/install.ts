import { lowerFirst } from './index';
import './types';

if (!String.prototype.lowerFirst) {
  Object.defineProperty(String.prototype, 'lowerFirst', {
    value(this: string) {
      return lowerFirst(this);
    },
    writable: true,
    configurable: true,
  });
}
