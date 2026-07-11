import { saturate } from './index';
import './types';

if (!Math.saturate) {
  Object.defineProperty(Math, 'saturate', {
    value: saturate,
    writable: true,
    configurable: true,
  });
}
