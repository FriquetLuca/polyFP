import { pascalCase } from './index';
import './types';

export function installPascalCase() {
  if (!String.prototype.pascalCase) {
    Object.defineProperty(String.prototype, 'pascalCase', {
      value(this: string) {
        return pascalCase(this);
      },
      writable: true,
      configurable: true,
    });
  }
}
