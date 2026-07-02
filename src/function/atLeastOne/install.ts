import { atLeastOne } from './index';
import './types';

export function installAtLeastOne() {
  if (!Function.atLeastOne) {
    Object.defineProperty(Function, 'atLeastOne', {
      value: atLeastOne,
      writable: true,
      configurable: true,
    });
  }
}
