import { curry } from './index';
import './types';

export function installCurry() {
  if (!Function.curry) {
    Object.defineProperty(Function, 'curry', {
      value: curry,
      writable: true,
      configurable: true,
    });
  }
}
