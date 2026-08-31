import { extendPrototype } from '../../utils.js';
import { isPromiseLike } from './index.js';
export type * from './types';

extendPrototype(Function, { isPromiseLike });
