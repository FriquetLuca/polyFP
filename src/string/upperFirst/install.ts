import { upperFirst } from './index';
import './types';

if (!String.prototype.upperFirst) {
  Object.defineProperty(String.prototype, 'upperFirst', {
    value(this: string) {
      return upperFirst(this);
    },
    writable: true,
    configurable: true,
  });
}
