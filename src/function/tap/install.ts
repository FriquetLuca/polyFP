import { tap } from './index';
import './types';

export function installTap() {
  if (!Function.tap) {
    Object.defineProperty(Function, 'tap', {
      value: tap,
      writable: true,
      configurable: true,
    });
  }
}
