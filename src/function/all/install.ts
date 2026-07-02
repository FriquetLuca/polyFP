import { all } from './index';
import './types';

export function installAll() {
  if (!Function.all) {
    Object.defineProperty(Function, 'all', {
      value: all,
      writable: true,
      configurable: true,
    });
  }
}
