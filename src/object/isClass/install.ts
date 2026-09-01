import { extendPrototype } from '../../utils.js';
import { isClass } from './index.js';
export type * from './types';

extendPrototype(Object, { isClass });
