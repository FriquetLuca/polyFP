import { flip } from './index';
import './types';

export function installFlip() {
  if (!Function.flip) {
    Object.defineProperty(Function, 'flip', {
      value: flip,
      writable: true,
      configurable: true,
    });
  }
}
