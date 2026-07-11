import { dotCase } from './index';
import './types';

export function installDotCase() {
  if (!String.prototype.dotCase) {
    Object.defineProperty(String.prototype, 'dotCase', {
      value(this: string) {
        return dotCase(this);
      },
      writable: true,
      configurable: true,
    });
  }
}
