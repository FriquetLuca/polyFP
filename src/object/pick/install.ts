import { pick } from './index';
import './types';

export function installPick() {
  if (!Object.pick) {
    Object.defineProperty(Object, 'pick', {
      value: pick,
      writable: true,
      configurable: true,
    });
  }
}
