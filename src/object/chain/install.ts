import { chain } from './index';
import './types';

if (!Object.chain) {
  Object.defineProperty(Object, 'chain', {
    value: chain,
    writable: true,
    configurable: true,
  });
}
