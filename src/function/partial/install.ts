import { partial } from './index';
import './types';

export function installPartial() {
  if (!Function.partial) {
    Object.defineProperty(Function, 'partial', {
      value: partial,
      writable: true,
      configurable: true,
    });
  }
}
