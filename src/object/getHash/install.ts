import { getHash } from './index';
import './types';

export function installGetHash() {
  if (!Object.getHash) {
    Object.defineProperty(Object, 'getHash', {
      value: getHash,
      writable: true,
      configurable: true,
    });
  }
}
