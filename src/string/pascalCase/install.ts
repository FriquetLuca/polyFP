import { pascalCase } from './index.js';
export type * from './types';

if (!String.prototype.pascalCase) {
  Object.defineProperty(String.prototype, 'pascalCase', {
    value(this: string) {
      return pascalCase(this);
    },
    writable: true,
    configurable: true,
  });
}
