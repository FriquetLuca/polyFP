import { dotCase } from './index';
import './types';

if (!String.prototype.dotCase) {
  Object.defineProperty(String.prototype, 'dotCase', {
    value(this: string) {
      return dotCase(this);
    },
    writable: true,
    configurable: true,
  });
}
