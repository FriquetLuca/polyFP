import { shallowClone } from './index';
import './types';

if (!Object.shallowClone) {
  Object.defineProperty(Object, 'shallowClone', {
    value: shallowClone,
    writable: true,
    configurable: true,
  });
}
