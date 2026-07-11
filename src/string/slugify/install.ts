import { slugify } from './index';
import './types';

if (!String.prototype.slugify) {
  Object.defineProperty(String.prototype, 'slugify', {
    value(this: string) {
      return slugify(this);
    },
    writable: true,
    configurable: true,
  });
}
