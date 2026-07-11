import { jaroWinkler } from './index';
import './types';

if (!String.prototype.jaroWinkler) {
  Object.defineProperty(String.prototype, 'jaroWinkler', {
    value(this: string, b: string) {
      return jaroWinkler(this, b);
    },
    writable: true,
    configurable: true,
  });
}
