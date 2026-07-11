import { abbreviate } from './index';
import './types';

export function installAbbreviate() {
  if (!String.prototype.abbreviate) {
    Object.defineProperty(String.prototype, 'abbreviate', {
      value(this: string, maxLength: number, exactLength?: boolean) {
        return abbreviate(this, maxLength, exactLength);
      },
      writable: true,
      configurable: true,
    });
  }
}
