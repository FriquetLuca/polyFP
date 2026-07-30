import { isClass } from '../../object/isClass/index.js';

export const isFunction = <T>(obj: T) =>
  typeof obj === 'function' && !isClass(obj);
