import { extendPrototype } from '../../utils.js';
import { isPlainObject } from './index.js';
export type * from './types';

extendPrototype(Object, { isPlainObject });
