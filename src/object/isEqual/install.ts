import { isEqual } from './index';
import './types';

export function installIsEqual() {
  if (!Object.isEqual) {
    Object.defineProperty(Object, 'isEqual', {
      value: isEqual,
      writable: true,
      configurable: true,
    });
  }
}
