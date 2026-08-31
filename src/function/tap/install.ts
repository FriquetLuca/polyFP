import { extendPrototype } from '../../utils.js';
import { tap } from './index.js';
export type * from './types';

extendPrototype(Function, { tap });
