import { moduleCase } from './index';
import './types';

export function installModuleCase() {
  if (!String.prototype.moduleCase) {
    Object.defineProperty(String.prototype, 'moduleCase', {
      value(this: string) {
        return moduleCase(this);
      },
      writable: true,
      configurable: true,
    });
  }
}
