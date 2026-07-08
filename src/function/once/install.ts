import { once } from './index';
import './types';

export function installOnce() {
  if (!Function.once) {
    Object.defineProperty(Function, 'once', {
      value: once,
      writable: true,
      configurable: true,
    });
  }
}
