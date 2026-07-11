import { titleCase } from './index';
import './types';

if (!String.prototype.titleCase) {
  Object.defineProperty(String.prototype, 'titleCase', {
    value(this: string) {
      return titleCase(this);
    },
    writable: true,
    configurable: true,
  });
}
