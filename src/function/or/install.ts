import { or } from './index';
import './types';

export function installOr() {
  if (!Function.or) {
    Object.defineProperty(Function, 'or', {
      value: or,
      writable: true,
      configurable: true,
    });
  }
}
