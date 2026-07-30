import { pascalTriangle } from './index.js';
export type * from './types';

if (!Math.pascalTriangle) {
  Object.defineProperty(Math, 'pascalTriangle', {
    value: pascalTriangle,
    writable: true,
    configurable: true,
  });
}
