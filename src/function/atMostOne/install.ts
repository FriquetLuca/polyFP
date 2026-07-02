import { atMostOne } from './index';
import './types';

export function installAtMostOne() {
  if (!Function.atMostOne) {
    Object.defineProperty(Function, 'atMostOne', {
      value: atMostOne,
      writable: true,
      configurable: true,
    });
  }
}
