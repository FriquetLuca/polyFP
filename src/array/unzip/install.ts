import { unzip } from './index';
export * from './types';

if (!Array.unzip) {
  Object.defineProperty(Array, 'unzip', {
    value: unzip,
    writable: true,
    configurable: true,
  });
}
