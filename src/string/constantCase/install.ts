import { constantCase } from './index';
import './types';

if (!String.prototype.constantCase) {
  Object.defineProperty(String.prototype, 'constantCase', {
    value(this: string) {
      return constantCase(this);
    },
    writable: true,
    configurable: true,
  });
}
