import { omit } from './index';
import './types';

if (!Object.omit) {
  Object.defineProperty(Object, 'omit', {
    value: omit,
    writable: true,
    configurable: true,
  });
}
