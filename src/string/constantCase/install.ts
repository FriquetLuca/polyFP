import { constantCase } from './index';
import './types';

export function installConstantCase() {
  if (!String.prototype.constantCase) {
    Object.defineProperty(String.prototype, 'constantCase', {
      value(this: string) {
        return constantCase(this);
      },
      writable: true,
      configurable: true,
    });
  }
}
