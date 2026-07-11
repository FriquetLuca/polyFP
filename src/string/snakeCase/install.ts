import { snakeCase } from './index';
import './types';

if (!String.prototype.snakeCase) {
  Object.defineProperty(String.prototype, 'snakeCase', {
    value(this: string) {
      return snakeCase(this);
    },
    writable: true,
    configurable: true,
  });
}
