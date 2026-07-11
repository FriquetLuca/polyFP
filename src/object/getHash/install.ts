import { getHash } from './index';
import './types';

if (!Object.getHash) {
  Object.defineProperty(Object, 'getHash', {
    value: getHash,
    writable: true,
    configurable: true,
  });
}
