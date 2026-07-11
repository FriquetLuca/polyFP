import { camelCase } from './index';
import './types';

export function installCamelCase() {
  if (!String.prototype.camelCase) {
    Object.defineProperty(String.prototype, 'camelCase', {
      value(this: string) {
        return camelCase(this);
      },
      writable: true,
      configurable: true,
    });
  }
}
