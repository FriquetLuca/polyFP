import { swapCase } from './index';
import './types';

export function installSwapCase() {
  if (!String.prototype.swapCase) {
    Object.defineProperty(String.prototype, 'swapCase', {
      value(this: string) {
        return swapCase(this);
      },
      writable: true,
      configurable: true,
    });
  }
}
