import { jaroWinkler } from './index';
import './types';

export function installJaroWinkler() {
  if (!String.prototype.jaroWinkler) {
    Object.defineProperty(String.prototype, 'jaroWinkler', {
      value(this: string, b: string) {
        return jaroWinkler(this, b);
      },
      writable: true,
      configurable: true,
    });
  }
}
