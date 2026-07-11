import { camelCase } from './index';
import './types';

if (!String.prototype.camelCase) {
  Object.defineProperty(String.prototype, 'camelCase', {
    value(this: string) {
      return camelCase(this);
    },
    writable: true,
    configurable: true,
  });
}
