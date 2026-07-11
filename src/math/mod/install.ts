import { mod } from './index';
import './types';

if (!Math.mod) {
  Object.defineProperty(Math, 'mod', {
    value: mod,
    writable: true,
    configurable: true,
  });
}
