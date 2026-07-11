import { shallowClone } from './index';
import './types';

export function installShallowClone() {
  if (!Object.shallowClone) {
    Object.defineProperty(Object, 'shallowClone', {
      value: shallowClone,
      writable: true,
      configurable: true,
    });
  }
}
