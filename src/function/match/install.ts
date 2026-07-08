import { match } from './index';
import './types';

export function installMatch() {
  if (!Function.match) {
    Object.defineProperty(Function, 'match', {
      value: match,
      writable: true,
      configurable: true,
    });
  }
}
