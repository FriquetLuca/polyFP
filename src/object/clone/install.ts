import { clone } from './index';
import './types';

if (!Object.clone) {
  Object.defineProperty(Object, 'clone', {
    value: clone,
    writable: true,
    configurable: true,
  });
}
