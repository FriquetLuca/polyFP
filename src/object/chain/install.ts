import { chain } from './index';
import './types';

export function installChain() {
  if (!Object.chain) {
    Object.defineProperty(Object, 'chain', {
      value: chain,
      writable: true,
      configurable: true,
    });
  }
}
