import { pascalTriangle } from './index';
import './types';

export function installPascalTriangle() {
  if (!Math.pascalTriangle) {
    Object.defineProperty(Math, 'pascalTriangle', {
      value: pascalTriangle,
      writable: true,
      configurable: true,
    });
  }
}
