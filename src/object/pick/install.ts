import { pick } from './index';
import './types';

if (!Object.pick) {
  Object.defineProperty(Object, 'pick', {
    value: pick,
    writable: true,
    configurable: true,
  });
}
