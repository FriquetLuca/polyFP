import { extendPrototype } from '../../utils.js';
import { cartesianProduct } from './index.js';
export type * from './types';

extendPrototype(Array, { cartesianProduct });
