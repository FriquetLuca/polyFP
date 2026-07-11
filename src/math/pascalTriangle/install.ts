import { pascalTriangle } from './index';
import './types';

if (!Math.pascalTriangle) {
  Object.defineProperty(Math, 'pascalTriangle', {
    value: pascalTriangle,
    writable: true,
    configurable: true,
  });
}
