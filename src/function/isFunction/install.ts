import { extendPrototype } from '../../utils.js';
import { isFunction } from './index.js';
export type * from './types';

extendPrototype(Function, { isFunction });
