import { isClass } from '../../object/isClass';

export const isFunction = <T>(obj: T) =>
  typeof obj === 'function' && !isClass(obj);
