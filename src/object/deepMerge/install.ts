import { deepMerge } from './index';
import './types';

if (!Object.deepMerge) {
  Object.defineProperty(Object, 'deepMerge', {
    value: deepMerge,
    writable: true,
    configurable: true,
  });
}
