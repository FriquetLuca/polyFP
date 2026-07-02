import { exactlyOne } from './index';
import './types';

export function installExactlyOne() {
  if (!Function.exactlyOne) {
    Object.defineProperty(Function, 'exactlyOne', {
      value: exactlyOne,
      writable: true,
      configurable: true,
    });
  }
}
