import { exactlyN } from './index';
import './types';

export function installExactlyN() {
  if (!Function.exactlyN) {
    Object.defineProperty(Function, 'exactlyN', {
      value: exactlyN,
      writable: true,
      configurable: true,
    });
  }
}
